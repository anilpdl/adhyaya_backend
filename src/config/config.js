require('dotenv').config();

// const {
//   DB_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_CLIENT
// } = process.env;

const DB_USER = 'sharma'
const DB_PASSWORD = ''
const DB_NAME = 'adhyaya_dev'
const DB_HOST = 'localhost'
const DB_CLIENT = 'pg'

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
