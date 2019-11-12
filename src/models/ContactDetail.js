import db from "../utils/db";

require('./user');

const TABLE_NAME = "contact_details";

const ContactDetail = db.model('ContactDetail', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
});

export default ContactDetail;
