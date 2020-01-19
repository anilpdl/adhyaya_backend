import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';

import bookshelf from '../utils/db';

import * as AuthController from './authController';
import * as User from '../daos/userDao';
import * as UserInvitation from '../daos/userInvitation';
import * as ForgotPassword from '../daos/forgotPassword';
import { sendPasswordResetMail, sendSubscriptionEmail } from './sendgrid';

import config from '../config/jsonconfig';

const responseMessage = {
  SIGNIN_SUCCESS: 'Signed in successfully',
  SIGNIN_EMPTY: 'Invalid Credentials Provided',
  SIGNIN_ERROR: 'Incorrect Email or Password ',
  PASSWORD_ERROR: 'Old password is incorrect'
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
  const userInvitation = await UserInvitation.getTokenDetail(invitation_id);
  if (!userInvitation) {
    return res.status(404).send({
      message: 'The invitation is expired or already accepted'
    });
  }
  const { id, email } = userInvitation.toJSON();
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
        UserInvitation.deleteUserInvitation(id);
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
  try {
    const { userId } = req.params;
    const authData = await AuthController.checkAccess(req, res);
    if (!authData.isInvalid) {
      const user = await User.getDetail(userId);
      return res.status(200).json({
        user
      });
    }
  } catch (err) {

  }
}

export const updateDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const authData = await AuthController.checkAccess(req, res);
    if (!authData.isInvalid) {
      const user = await User.update(userId, data);
      return res.status(200).json({
        user
      });
    }
  } catch (err) {
    console.log(err)
  }
}

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { old_password, new_password } = req.body;
    const authData = await AuthController.checkAccess(req, res);
    if (!authData.isInvalid) {
      const user = await User.getDetail(userId);
      const password = user.get('password');
      bcrypt.compare(old_password, password, async (err, result) => {
        if (err) {
          return res.status(403).send({
            message: responseMessage.PASSWORD_ERROR
          });
        }
        if (result) {
          return bcrypt.hash(new_password, 10, async (err, hash) => {
            if (err) {
              return res.status(500).send({
                message: 'Internal Server Error'
              });
            }
            const updatedPassword = await User.updatePassword(hash, userId);
            return res.status(200).send({ message: 'Password changed successfully' });
          });

        }
        return res.status(403).send({
          message: responseMessage.PASSWORD_ERROR
        });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).send({
      message: responseMessage.PASSWORD_ERROR
    });
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user) {
      const { first_name } = user.toJSON();
      const name = first_name;
      const passwordReset = await bookshelf.transaction(async (t) => {
        const passwordResetToken = cryptoRandomString({ length: 10 });
        const newPasswordReset = await ForgotPassword.createPasswordResetToken(email, passwordResetToken, t);
        const { token } = newPasswordReset.toJSON();
        if (token) {
          await sendPasswordResetMail(email, name, token);
        };
        return newPasswordReset;
      })
      return res.send({
        passwordReset
      });
    }
    return res.status(404).json({
      message: "User not found"
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error resetting password'
    });
  }
}

export const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const forgotPassword = await ForgotPassword.getTokenDetail(token);
    if (forgotPassword) {
      const { id, email } = forgotPassword.toJSON();
      const userByEmail = await User.findByEmail(email);
      const { id: user_id } = userByEmail.toJSON();
      return bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).send({
            message: 'Internal Server Error'
          });
        }
        const updatedPassword = await User.updatePassword(hash, user_id);
        if (updatedPassword)
          await ForgotPassword.deletePasswordToken(id);
        return res.status(200).send({ message: 'Password changed successfully' });
      });
    }
    return res.status(404).send({
      message: 'Reset link is invalid'
    });
  }
  catch (err) {
    console.log(err);
    return res.status(403).send({
      message: responseMessage.PASSWORD_ERROR
    });
  }
}


export const getUserFiles = async (req, res) => {
  const { userId } = req.params;
  const authData = await AuthController.checkAccess(req, res);
  if (!authData.isInvalid) {
    const files = await User.getUserFiles(userId);
    return res.send(
      files
    )
  }
  return res.status(403).send({ message: 'Access Forbidden' });
}

export const subscribe = async (req, res) => {
  const { email } = req.body;
  sendSubscriptionEmail(email);
  res.send();
}
