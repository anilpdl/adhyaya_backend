import UserInvitation from '../models/userInvitation';

export const findByEmail = async (email) => {
  const userInvitation = await UserInvitation.forge({ email }).fetch();
  return userInvitation;
}

export const getDetail = async (id) => {
  const userInvitation = await UserInvitation.forge({ id }).fetch();
  return userInvitation;
}

export const deleteUserInvitation = async (id) => {
  const deleteStatus = await UserInvitation.forge({ id }).destroy();
  return deleteStatus;
}

export const createUserInvitation = async (email) => {
  const userInvitation = await UserInvitation.forge({ email }).save();
  return userInvitation;
}
