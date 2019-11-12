import PersonalInfo from '../models/PersonalInfo';

export const destroy = (id) => {
  const deleteStatus = await PersonalInfo.forge({ id }).destroy();
  return deleteStatus;
}