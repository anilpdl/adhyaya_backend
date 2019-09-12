import db from "../utils/db";

require ('./user');
require('./File');

const TABLE_NAME = "file_users";

const UserFile = db.model('UserFile', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  user: function() {
    return this.hasMany('User');
  },
  file: function() {
    return this.hasMany('File');
  }
});

export const UserFileCollection = db.Collection.extend({
  model: UserFile
});

export default UserFile;
