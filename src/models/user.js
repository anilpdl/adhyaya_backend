import db from "../utils/db";

const TABLE_NAME = "users";

const User = db.model('User', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  hidden: ['password'],
});

export default User;
