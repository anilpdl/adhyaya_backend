import express from 'express';

import user from './src/routes/users';
import userInvitation from './src/routes/userInvitations';
import file from './src/routes/files';
import dashboard from './src/routes/dashboard';
import education from './src/routes/education';
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
// Launch the server on the port 8000
const server = app.listen(8000, () => {
  const { address, port } = server.address();
  console.log(address)
  console.log(`Listening at http://${address}:${port}`);
});

