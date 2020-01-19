import express from 'express';
import bcrypt from 'bcrypt';
import user from './src/routes/users';
import userInvitation from './src/routes/userInvitations';
import file from './src/routes/files';
import dashboard from './src/routes/dashboard';
import education from './src/routes/education';
import personalInfo from './src/routes/personalInfo';
import contact from './src/routes/contactDetail';

import { USER_ROUTES } from './src/constants/routes';
import { cloudinaryConfig } from './src/config/cloudinary';

// Initialize http server
const app = express();

app.use('*', cloudinaryConfig);
app.use('/dashboard', dashboard);
app.use('/user', user);
app.use(USER_ROUTES.USER_INVITATION, userInvitation);
app.use('/file', file);
app.use('/education', education);
app.use('/personal_info', personalInfo);
app.use('/contact', contact);

// Launch the server on the port 8000
const server = app.listen(process.env.PORT || 8000, () => {
  const { address, port } = server.address();
  console.log(address)
  console.log(`Listening at http://${address}:${port}`);
});

