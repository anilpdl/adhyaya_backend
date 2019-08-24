import express from 'express';
import sgMail from '@sendgrid/mail';

import mailConstants from './src/constants/mailConstants';
import user from './src/routes/users';
// Initialize http server
const app = express();

app.use('/user', user)

// Launch the server on the port 3000
const server = app.listen(8000, () => {
  const { address, port } = server.address();
  console.log(address)
  console.log(`Listening at http://${address}:${port}`);
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { fromEmail } = mailConstants;

const msg = {
  to: 'poudelanil1996@gmail.com',
  from: fromEmail,
  template_id: "d-316ea339deed4619a3c5f0be9c3b703f",
  dynamic_template_data: {
    url: "https://poudelanil.com.np"
  }
};

// d-316ea339deed4619a3c5f0be9c3b703f
// sgMail.send(msg);