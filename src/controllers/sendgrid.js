import sgMail from '@sendgrid/mail';

import mailConstants from '../constants/mailConstants';
const { fromEmail, templateId, passwordResetTemplateId } = mailConstants;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const URLS = {
  INVITE: 'http://localhost:3000/user_invitation/token/:token',
  PASSWORD_RESET: 'http://localhost:3000/password/reset/:token',
};

const createUrl = (url, token) => {
  return url.replace(':token', token);
}

export const sendEmail = async (toEmail, token) => {
  try {
    const url = createUrl(URLS.INVITE, token);
    const msg = {
      to: toEmail,
      from: fromEmail,
      template_id: templateId,
      dynamic_template_data: {
        url
      }
    };

    return sgMail.send(msg, false, (error, result) => {
      if (error) {
        return error;
      }
      return result;
    });
  } catch (err) {
    throw err;
  }
}

export const sendPasswordResetMail = async (toEmail, name, token) => {
  try {
    const url = createUrl(URLS.PASSWORD_RESET, token);
    const msg = {
      to: toEmail,
      from: fromEmail,
      template_id: passwordResetTemplateId,
      dynamic_template_data: {
        url,
        name
      }
    };

    return sgMail.send(msg, false, (error, result) => {
      if (error) {
        return error;
      }
      return result;
    });
  } catch (err) {
    throw err;
  }
}