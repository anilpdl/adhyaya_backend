import express from 'express';

import user from './src/routes/users';
import userInvitation from './src/routes/userInvitations';
import { USER_ROUTES } from './src/constants/routes';
// Initialize http server
const app = express();

app.use('/user', user);
app.use(USER_ROUTES.USER_INVITATION, userInvitation);

// Launch the server on the port 3000
const server = app.listen(8000, () => {
  const { address, port } = server.address();
  console.log(address)
  console.log(`Listening at http://${address}:${port}`);
});

