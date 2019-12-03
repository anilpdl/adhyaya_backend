import PersonalInfo from '../models/PersonalInfo';

export const fetch = async (id) => {
  const data = await PersonalInfo.forge({ id }).fetch();

  return data;
}

export const fetchByUserId = async (user_id) => {
  const data = await PersonalInfo.forge({ user_id }).fetch();
  return data;
}

export const addNew = async (data, userId) => {
  const newData = await PersonalInfo.forge({ ...data, user_id: userId }).save();

  return newData;
}

export const update = async (data) => {
  const personalInfo = await fetch(data.id);
  if (personalInfo) {
    const updated = await personalInfo.save(data);
    return updated;
  }

  return null;
}

export const destroy = async (id) => {
  const deleteStatus = await PersonalInfo.forge({ id }).destroy();
  return deleteStatus;
}