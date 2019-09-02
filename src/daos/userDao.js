import User from '../models/User';

export const create = async (data) => {
  const newUser = await User.forge(data).save();
  return newUser;
}
export const findByEmail = async (email) => {
  const user = await User.forge({ email }).fetch();
  return user;
}

export const getDetail = async (id) => {
  const user = await User.forge({ id }).fetch();
  return user;
}

export const updateLogin = async (id) => {
  const user = await User.forge({ id }).fetch();
  const currentDate = new Date();
  const change = await user.save({ last_login: currentDate});

  return change;
}