import User from '../models/User';

export const findByEmail = async (email) => {
  const user = await User.forge({ email }).fetch();
  return user;
}

export const getDetail = async (id) => {
  const user = await User.forge({ id }).fetch();
  return user;
}