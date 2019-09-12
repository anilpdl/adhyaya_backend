import db from "../utils/db";
import './File';
import './UserFile';

const TABLE_NAME = "users";

const User = db.model('User', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  hidden: ['password'],

  files: function() {
    // id of reference modal - files.id
    return this.hasMany('File').through('UserFile', 'id', 'user_id', 'file_id');
  }
});

export default User;
