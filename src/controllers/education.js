import bookshelf from '../utils/db';

import * as Education from '../daos/educationDao';
import * as User from '../daos/userDao';

import * as AuthController from './authController';

export const getAll = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  const { userId } = req.params;
  const user = await User.getDetail(userId);
  if (user) {
    if (!authData.isInvalid) {
      const educations = await User.getEducation(userId);
      return res.send(educations);
    }
    return res.status(403).send({ message: 'Access Forbidden' });
  }

  return res.status(404).send({ message: 'Not Found' });
}

export const addNew = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  const { userId } = req.params;
  const education = req.body;
  const user = await User.getDetail(userId);
  if (user) {
    if (!authData.isInvalid) {
      const newEducation = await Education.addNew(education, userId);
      return res.send(newEducation);
    }
  }

  return res.status(404).send({ message: 'Not Found' });
}

export const updateDetails = async (req, res) => {
  // const authData = await AuthController.checkAccess(req, res);
  const education = req.body;
  if (education) {
    const newEducation = await Education.update(education);
    return res.send(newEducation);
  }

  return res.status(404).send({ message: 'Not Found' });
}

export const deleteEducation = async (req, res) => {
  const {id} = req.params;
  if (id) {
    const status = await Education.destroy(id);
    return res.send(status);
  }

  return res.status(404).send({ message: 'Not Found' });
}