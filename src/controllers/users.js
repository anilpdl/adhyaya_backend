import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as AuthController from './authController';
import * as User from '../daos/userDao';
import * as UserInvitation from '../daos/userInvitation';

import config from '../config/jsonconfig';

const responseMessage = {
  SIGNIN_SUCCESS: 'Signed in successfully',
  SIGNIN_EMPTY: 'Invalid Credentials Provided',
  SIGNIN_ERROR: 'Incorrect Email or Password '
}

export const getAll = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    const users = await User.fetchAll();
    return res.send({
      users
    })
  }
  return res.status(403).send({ message: 'Access Forbidden' });
}

export const sign_up = async (req, res) => {
  const { last_name, middle_name, first_name, password, gender, role, invitation_id } = req.body;
  if (!invitation_id || !password || !first_name || !last_name) {
    return res.status(400).send({
      message: 'Missing some informations'
    });
  }
  const userInvitation = await UserInvitation.getDetail(invitation_id);
  if (!userInvitation) {
    return res.status(404).send({
      message: 'The invitation is expired or already accepted'
    });
  }
  const { email } = userInvitation.toJSON();
  const foundUser = await User.findByEmail(email);
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already taken' });
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err)
      return res.status(500).send({
        message: err
      });
    }
    try {
      const user = await User.create({
        first_name,
        middle_name,
        last_name,
        email,
        password: hash,
        gender,
        role
      });
      if (user) {
        UserInvitation.deleteUserInvitation(invitation_id);
        res.status(200).json({
          success: 'Signed up successfully',
          user
        });
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err,
        message: 'Internal Server Error'
      });
    }
  });
};

export const sign_in = function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send(JSON.stringify({
      message: responseMessage.SIGNIN_EMPTY
    }));

    return;
  }
  User.findByEmail(email)
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
              expiresIn: 7200
            }
          );
          const bearerToken = `${'Bearer' + ' '}${JWTToken}`;
          User.updateLogin(user.get('id'));
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
  const authData = await AuthController.checkAccess(req, res);
  if (!authData.isInvalid) {
    const user = await User.getDetail(userId);
    return res.status(200).json({
      user
    });
  }
}
