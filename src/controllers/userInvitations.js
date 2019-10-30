import cryptoRandomString from 'crypto-random-string';
import bookshelf from '../utils/db';

import * as UserInvitation from '../daos/userInvitation';
import * as User from '../daos/userDao';
import * as AuthController from './authController';
import { sendEmail } from './sendgrid';

export const create = async (req, res) => {
  const { email } = req.body;

  try {
    const user_invitation = await bookshelf.transaction(async (t) => {
      const user = await User.findByEmail(email);
      const userInvitation = await UserInvitation.findByEmail(email);
      if (user || userInvitation) {
        return res.status(403).json({ message: 'User with email already exists' });
      }
      const invitation_token = cryptoRandomString(8);
      const newUserInvitation = await UserInvitation.createUserInvitation(email, invitation_token, t);
      const { token } = newUserInvitation.toJSON();
      if (token) {
        await sendEmail(email, token);
      };
      return newUserInvitation;
    })
    res.send({
      user_invitation
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Error sending user invitation'
    });
  }
}

export const resendInvitation = async (req, res) => {
  const { userInvitationId } = req.params;

  try {
    const userInvitation = await UserInvitation.getDetail(userInvitationId);
    if (userInvitation) {
      userInvitation.save({ updated_at: new Date(Date.now()) });
      const { email, id } = userInvitation.toJSON();
      await sendEmail(email, id);
      res.send({
        userInvitation
      });
      return;
    }

    res.status(404).json({
      message: "Invitation not found"
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Error sending invitation link",
      error: err
    });
  }
}

export const getDetail = async (req, res) => {
  const { userInvitationId } = req.params;

  try {
    const userInvitation = await UserInvitation.getTokenDetail(userInvitationId);
    if (userInvitation) {
      const updated_at = userInvitation.get('updated_at');
      const updatedDate = new Date(updated_at);
      let expired = false;
      if ((Date.now() - updatedDate) > (24 * 60 * 60 * 1000)) {
        expired = true;
      }

      if (expired) {
        res.json({
          expired,
          message: 'Link is expired'
        });
        return;
      }

      res.status(200).json({
        userInvitation
      });

      return;
    }
    res.json({
      expired: true,
      message: 'Link does not exist'
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const getAll = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    const userInvitations = await UserInvitation.fetchAll();
    res.send({
      userInvitations
    });
  }
}

export const deleteInvitation = async (req, res) => {
  const { userInvitationId } = req.params;
  const userInvitation = await UserInvitation.getDetail(userInvitationId);

  try {
    if (userInvitation) {
      const status = UserInvitation.deleteUserInvitation(userInvitationId);
      return res.send({
        status
      })
    }

    return res.status(404).send({
      message: 'Invitation link does not exist'
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error deleting invitation link"
    })
  }
}
