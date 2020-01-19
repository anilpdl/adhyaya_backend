require('dotenv').config();

const {
  DB_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_CLIENT
} = process.env;

const config = {
  db: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    }
  }
};

module.exports = config;
