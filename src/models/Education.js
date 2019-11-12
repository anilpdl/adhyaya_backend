import db from "../utils/db";

require('./user');

const TABLE_NAME = "educations";

const Education = db.model('Education', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
});

export default Education;
