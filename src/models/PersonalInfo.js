import db from "../utils/db";

require('./user');

const TABLE_NAME = "personal_details";

const PersonalInfo = db.model('PersonalInfo', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
});

export default PersonalInfo;
