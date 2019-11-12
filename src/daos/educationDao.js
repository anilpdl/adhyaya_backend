import Education from '../models/Education';

export const fetch = async (id) => {
  const data = await Education.forge({ id }).fetch();

  return data;
}

export const destroy = async (id) => {
  const deleteStatus = await Education.forge({ id }).destroy();
  return deleteStatus;
}

export const addNew = async (data, userId) => {
  const { passed_year } = data;
  const date = new Date(passed_year);
  const newData = await Education.forge({ ...data, user_id: userId, passed_year: date }).save();

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