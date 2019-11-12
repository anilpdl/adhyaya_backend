import ContactDetail from '../models/ContactDetail';

export const destroy = (id) => {
  const deleteStatus = await ContactDetail.forge({ id }).destroy();
  return deleteStatus;
}