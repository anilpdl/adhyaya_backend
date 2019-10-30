import ForgotPassword from '../models/ForgotPassword';

export const findByEmail = async (email) => {
  const forgotPassword = await ForgotPassword.forge({ email }).fetch();
  return forgotPassword;
}

export const getDetail = async (id) => {
  const forgotPassword = await ForgotPassword.forge({ id }).fetch();
  return forgotPassword;
}

export const getTokenDetail = async (token) => {
  const forgotPassword = await ForgotPassword.forge({ token }).fetch();
  return forgotPassword;
}

export const deletePasswordToken = async (id) => {
  const deleteStatus = await ForgotPassword.forge({ id }).destroy();
  return deleteStatus;
}

export const createPasswordResetToken = async (email, token, t) => {
  const forgotPassword = await ForgotPassword.forge({ email, token }).save(null, { transacting: t});
  return forgotPassword;
}
