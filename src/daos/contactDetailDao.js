import ContactDetail from '../models/ContactDetail';

export const fetch = async id => {
  const data = await ContactDetail.forge({ id }).fetch();
  return data;
};

export const fetchByUserId = async user_id => {
  const data = await ContactDetail.forge({ user_id }).fetch();
  return data;
};

export const addNew = async (data, userId) => {
  const newData = await ContactDetail.forge({
    ...data,
    user_id: userId
  }).save();

  return newData;
};

export const update = async data => {
  const contact = await fetch(data.id);
  if (contact) {
    const updated = await contact.save(data);
    return updated;
  }

  return null;
};

export const destroy = async id => {
  const deleteStatus = await ContactDetail.forge({ id }).destroy();
  return deleteStatus;
};
