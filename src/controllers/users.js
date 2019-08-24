import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import config from '../config/jsonconfig';

export const sign_up = async (req, res) => {
  const { email, last_name, first_name, password, gender } = req.body;
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
    res.status(400).send({
      message: 'Invalid Credentials Provided'
    });

    return;
  }
  User.forge({ email }).fetch()
    .then((user) => {
      bcrypt.compare(password, user.get('password'), (err, result) => {
        if (err) {
          return res.status(401).send({
            message: 'Incorrect Email or Password'
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
              expiresIn: '2h'
            }
          );
          const bearerToken = `${'Bearer' + ' '}${JWTToken}`;
          return res.status(200).json({
            auth: true,
            message: 'Signed in successfully!',
            token: bearerToken,
            user
          });
        }
        return res.status(401).send({
          message: 'Incorrect Email or Password'
        });
      });
    })
    .catch((error) => {
      res.status(500).send({
        error,
        message: 'Internal server error'
      });
    });
};
