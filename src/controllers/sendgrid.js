import sgMail from '@sendgrid/mail';

import mailConstants from '../constants/mailConstants';
const { fromEmail, templateId } = mailConstants;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createUrl = (id) => {
  return `http://localhost:3000/user_invitation/token/${id}`;
}

export const sendEmail = (toEmail, id) =>{
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

  sgMail.send(msg);
}