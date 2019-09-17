import db from "../utils/db";

require ('./user');

const TABLE_NAME = "avatar_users";

const UserAvatar = db.model('UserAvatar', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  hidden: ['user_id'],
  user: function() {
    return this.belongsTo('User');
  }
});

export default UserAvatar;
