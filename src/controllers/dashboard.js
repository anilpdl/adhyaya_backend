
import * as User from '../daos/userDao';
import * as UserInvitation from '../daos/userInvitation';
import * as Files from '../daos/fileDao';
import * as AuthController from './authController';

export const getAll = async (req, res) => {
  try {
    const { userId } = req.params;
    const authData = await AuthController.checkAccess(req, res);
    if (authData.isAdmin) {
      const userCount = await User.getCount();
      const fileCount = await Files.getCount();
      const userInvitationCount = await UserInvitation.getCount();
      return res.status(200).json({
        user_count: userCount,
        file_count: fileCount,
        user_invitation_count: userInvitationCount
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'Error fetching data'
    })
  }
}