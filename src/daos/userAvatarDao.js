import UserAvatar from '../models/UserAvatar';

export const create = async (data) => {
  try {
    const userAvatar = await UserAvatar.forge(data).save();
    return userAvatar;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export const getDetail = async (userId) => {
  try {
    const userAvatar = await UserAvatar.forge({ user_id: userId }).fetch();
    return userAvatar
  } catch (err) {
    throw err;
  }
}

export const update = async (userId, url) => {
  try {
    const userAvatar = await getDetail(userId);
    if (userAvatar) {
      const updatedAvatar = userAvatar.save({ url });
      return updatedAvatar;
    }

    throw "User does not exist";
  } catch (err) {
    throw err;
  }
}
