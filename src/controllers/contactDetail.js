import bookshelf from "../utils/db";

import * as ContactDetail from "../daos/contactDetailDao";
import * as User from "../daos/userDao";

import * as AuthController from "./authController";

export const getDetail = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  const { userId } = req.params;
  const user = await User.getDetail(userId);
  if (user) {
    if (!authData.isInvalid) {
      const contactDetail = await ContactDetail.fetchByUserId(userId);
      return res.send(contactDetail);
    }
    return res.status(403).send({ message: "Access Forbidden" });
  }

  return res.status(404).send({ message: "Not Found" });
};

export const addNew = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  const { userId } = req.params;
  const contact = req.body;
  const user = await User.getDetail(userId);
  if (user) {
    if (!authData.isInvalid) {
      const newContact = await ContactDetail.addNew(contact, userId);
      return res.send(newContact);
    }
  }

  return res.status(404).send({ message: "Not Found" });
};

export const updateDetails = async (req, res) => {
  const contact = req.body;
  if (contact) {
    const newContact = await ContactDetail.update(contact);
    return res.send(newContact);
  }

  return res.status(404).send({ message: "Not Found" });
};

export const addOrUpdate = async (req, res) => {
  const { userId } = req.params;
  const existingInfo = await ContactDetail.fetchByUserId(userId);
  if (!existingInfo) {
    addNew(req, res);
    return;
  } else {
    const { id } = existingInfo.toJSON();
    req.body.id = id;
    updateDetails(req, res);
    return;
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const status = await ContactDetail.destroy(id);
    return res.send(status);
  }

  return res.status(404).send({ message: "Not Found" });
};
