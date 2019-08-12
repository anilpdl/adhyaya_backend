import db from "../utils/db";

const TABLE_NAME = "users";

var User = db.Model.extend({
  tableName: TABLE_NAME,
  hasTimeStamp: true,
  hidden: ['password'],
});

export default db.model('User',User);
