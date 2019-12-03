import bookshelf from '../utils/db';

import * as PersonalInfo from '../daos/personalInfoDao';
import * as User from '../daos/userDao';

import * as AuthController from './authController';

export const addNew = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  const { userId } = req.params;
  const personalInfo = req.body;
  const user = await User.getDetail(userId);
  if (user) {
    if (!authData.isInvalid) {
      const newPersonalInfo = await PersonalInfo.addNew(personalInfo, userId);
      return res.send(newPersonalInfo);
    }
  }

  return res.status(404).send({ message: 'Not Found' });
}

export const updateDetails = async (req, res) => {
  // const authData = await AuthController.checkAccess(req, res);
  const personalInfo = req.body;
  if (personalInfo) {
    const newPersonalInfo = await PersonalInfo.update(personalInfo);
    return res.send(newPersonalInfo);
  }

  return res.status(404).send({ message: 'Not Found' });
}

export const addOrUpdate = async (req, res) => {
  const { userId } = req.params;
  const existingInfo = await PersonalInfo.fetchByUserId(userId);
  if (!existingInfo) {
    addNew(req, res);
    return;
  } else {
    const { id } = existingInfo.toJSON();
    req.body.id = id;
    updateDetails(req, res);
    return;
  }
}

export const deleteInfo = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const status = await PersonalInfo.destroy(id);
    return res.send(status);
  }

  return res.status(404).send({ message: 'Not Found' });
}