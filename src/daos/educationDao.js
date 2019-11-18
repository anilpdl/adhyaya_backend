import Education from '../models/Education';

export const fetch = async (id) => {
  const data = await Education.forge({ id }).fetch();

  return data;
}

export const destroy = async (id) => {
  try {
    const deleteStatus = await Education.forge({ id }).destroy();
    return deleteStatus;
  } catch(err) {
    console.log(err)
  }
}

export const addNew = async (data, userId) => {
  const newData = await Education.forge({ ...data, user_id: userId }).save();

  return newData;
}

export const update = async (data) => {
  const education = await fetch(data.id);
  if (education) {
    const updated = await education.save(data);
    return updated;
  }

  return null;
}