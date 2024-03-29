import sgMail, { send } from '@sendgrid/mail';

import mailConstants from '../constants/mailConstants';
const { fromEmail, templateId, passwordResetTemplateId } = mailConstants;

console.log(process.env.SENDGRID_API_KEY);

//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

sgMail.setApiKey(
  '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'
);

const URLS = {
  INVITE: 'https://adhyaya.poudelanil.com.np/user_invitation/token/:token',
  PASSWORD_RESET: 'https://adhyaya.poudelanil.com.np/password/reset/:token',
};

const createUrl = (url, token) => {
  return url.replace(':token', token);
};


export const sendEmail = async (toEmail, token) => {
  try {
    const url = createUrl(URLS.INVITE, token);
    const msg = {
      to: toEmail,
      from: fromEmail,
      template_id: templateId,
      dynamic_template_data: {
        url,
      },
    };

    return sgMail.send(msg, false, (error, result) => {
      if (error) {
        const e = {...error};
        console.log(':::ERROR::', e.response.body);
        return error;
      }
      return result;
    });
  } catch (err) {
    console.log(':::ERROR__CAPTURED::', error);
    throw err;
  }
};

export const sendPasswordResetMail = async (toEmail, name, token) => {
  try {
    const url = createUrl(URLS.PASSWORD_RESET, token);
    const msg = {
      to: toEmail,
      from: fromEmail,
      template_id: passwordResetTemplateId,
      dynamic_template_data: {
        url,
        name,
      },
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
};

export const sendSubscriptionEmail = async (email) => {
  try {
    const msg = {
      to: 'poudelanil1996@gmail.com',
      from: 'info@adhyaya.com.np',
      subject: 'Reach out',
      text: `${email} wants to know more about Adhyaya Educational Services`,
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
};
