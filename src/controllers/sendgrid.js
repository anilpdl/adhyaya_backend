import sgMail from '@sendgrid/mail';

import mailConstants from '../constants/mailConstants';
const { fromEmail, templateId } = mailConstants;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createUrl = (id) => {
  return `http://localhost:3000/user_invitation/token/${id}`;
}

export const sendEmail = async (toEmail, id) => {
  try {
    const url = createUrl(id);
    console.log(url)
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