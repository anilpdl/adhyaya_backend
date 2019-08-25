import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import config from '../config/jsonconfig';

const responseMessage = {
  SIGNIN_SUCCESS: 'Signed in successfully',
  SIGNIN_EMPTY: 'Invalid Credentials Provided',
  SIGNIN_ERROR: 'Incorrect Email or Password '
}

export const sign_up = async (req, res) => {
  const { email, last_name, first_name, password, gender } = req.body;
  console.log(req.body)
  if(!email || !password || !first_name || !last_name) {
    res.status(400).send({
      message: 'Missing some informations'
    });

    return;
  }
  const foundUser = await User.forge({ email }).fetch();
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already taken' });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err)
      return res.status(500).send({
        message: err
      });
    }
    const user = new User({
      first_name,
      last_name,
      email,
      password: hash,
      gender,
      role: 'student'
    });
    user
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: 'Signed up successfully',
          user
        });
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({
          error: err,
          message: 'Internal Server Error'
        });
      });
  });
};

export const sign_in = function (req, res) {
  const { email, password } = req.body;
  if(!email || !password) {
    res.status(400).send(JSON.stringify({
      message: responseMessage.SIGNIN_EMPTY
    }));

    return;
  }
  User.forge({ email }).fetch()
    .then((user) => {
      bcrypt.compare(password, user.get('password'), (err, result) => {
        if (err) {
          return res.status(401).send({
            message: responseMessage.SIGNIN_ERROR
          });
        }
        if (result) {
          const JWTToken = jwt.sign(
            {
              id: user.get('id'),
              email: user.get('email')
            },
            config.secret,
            {
              expiresIn: 60
            }
          );
          const bearerToken = `${'Bearer' + ' '}${JWTToken}`;
          return res.status(200).json({
            auth: true,
            message: responseMessage.SIGNIN_SUCCESS,
            token: bearerToken,
            user
          });
        }
        return res.status(401).send({
          message: responseMessage.SIGNIN_ERROR
        });
      });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({
        error,
        message: responseMessage.SIGNIN_ERROR
      });
    });
};

export const getDetail = async (req, res) => {
  const { userId } = req.params;
  const authToken = req.headers.authorization;
  const token = authToken.replace('Bearer ','');
  console.log(token)
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    const { id } = decoded;
    const user = await User.forge({ id }).fetch();
    const role = user.get('role');
    if(role == 'student') {
      if(id != userId) {
        return res.status(403).send({ message: 'Access Forbidden'})
      }
    }
    if(userId) {
      const user = await User.forge({ id: userId }).fetch();
      return res.status(200).json({
        user
      });
    }
  });
}
