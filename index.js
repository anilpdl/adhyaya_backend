import express from 'express';
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
