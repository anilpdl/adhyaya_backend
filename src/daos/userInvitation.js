import UserInvitation from '../models/userInvitation';

export const findByEmail = async (email) => {
  const userInvitation = await UserInvitation.forge({ email }).fetch();
  return userInvitation;
}

export const getDetail = async (id) => {
  const userInvitation = await UserInvitation.forge({ id }).fetch();
  return userInvitation;
}

export const getTokenDetail = async (token) => {
  const userInvitation = await UserInvitation.forge({ token }).fetch();
  return userInvitation;
}

export const deleteUserInvitation = async (id) => {
  const deleteStatus = await UserInvitation.forge({ id }).destroy();
  return deleteStatus;
}

export const createUserInvitation = async (email, token, t) => {
  const userInvitation = await UserInvitation.forge({ email, token }).save(null, { transacting: t});
  return userInvitation;
}

export const fetchAll = async () => {
  const userInvitations = await UserInvitation.fetchAll();

  return userInvitations;
}

export const getCount = async () => {
  try {
    const count = await UserInvitation.forge().count();

    return count;
  } catch (err) {
    throw err;
  }
}
