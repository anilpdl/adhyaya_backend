import db from "../utils/db";

const TABLE_NAME = "users";

var User = db.model('User',{
  tableName: TABLE_NAME,
});

export default User;
