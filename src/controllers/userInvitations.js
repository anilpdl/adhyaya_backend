import * as UserInvitation from '../daos/userInvitation';
import * as User from '../daos/userDao';
import { sendEmail } from './sendgrid';

export const create = async (req, res) => {
  const { email } = req.body;

  const user = await User.findByEmail(email);
  const userInvitation = await UserInvitation.findByEmail(email);
  if (user || userInvitation) {
    return res.status(403).json({ error: 'User with email already exists' });
  }

  const newUserInvitation = await UserInvitation.createUserInvitation(email);
  const { id } = newUserInvitation.toJSON();
  if (id) sendEmail(email, id);
  res.send({
    user_invitation: newUserInvitation
  });
}

export const resendInvitation = async (req, res) => {
  const { userInvitationId } = req.params;
  
  const userInvitation = await UserInvitation.getDetail(userInvitationId);
  if(userInvitation) {
    userInvitation.save({ updated_at: new Date(Date.now())});
    const { email, id } = userInvitation.toJSON();
    sendEmail( email, id);
    res.send({
      userInvitation
    });
    return;
  }

  res.status(500).json({
    message: "Invitation not found"
  });
}

export const getDetail = async (req, res) => {
  const { userInvitationId } = req.params;

  try {
    const userInvitation = await UserInvitation.getDetail(userInvitationId);
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
