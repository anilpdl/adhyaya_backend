import User from '../models/user';

export const create = async (data) => {
  const newUser = await User.forge(data).save();
  return newUser;
}

export const findByEmail = async (email) => {
  const user = await User.forge({ email }).fetch();
  return user;
}

export const getDetail = async (id) => {
  const user = await User.forge({ id }).fetch({ withRelated: ['user_avatar'] });
  return user;
}

export const getUserFiles = async (id) => {
  const user = await User.forge({ id }).fetch({ withRelated: ['files.user'] });
  const files = user.related('files');

  return files;
}

export const updateLogin = async (id) => {
  const user = await User.forge({ id }).fetch();
  const currentDate = new Date();
  const change = await user.save({ last_login: currentDate });

  return change;
}

export const update = async (id, data) => {
  const { first_name, last_name, middle_name, gender } = data;
  const user = await getDetail(id);
  const change = await user.save({ first_name, last_name, middle_name, gender });

  return change;
}

export const updatePassword = async (password, id) => {
  const user = await getDetail(id);
  const change = await user.save({ password });
  return change;
}

export const fetchAll = async () => {
  const users = await User.where({ role: 'student' }).fetchAll({ withRelated: ['files', 'user_avatar'] });

  return users.toJSON();
}

export const getCount = async () => {
  try {
    const count = await User.where({ role: 'student' }).count();

    return count;
  } catch (err) {
    throw err;
  }
}
