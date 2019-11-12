import db from "../utils/db";
import './File';
import './UserFile';
import './UserAvatar';
import './Education';
import './ContactDetail';
import './PersonalInfo';

const TABLE_NAME = "users";

const User = db.model('User', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  hidden: ['password'],

  files: function () {
    // id of reference modal - files.id
    return this.hasMany('File').through('UserFile', 'id', 'user_id', 'file_id');
  },

  user_avatar: function () {
    return this.hasOne('UserAvatar');
  },

  approved_files: function () {
    return this.hasMany('File', 'id', 'user_id');
  },

  educationDetails: function () {
    return this.hasMany('Education');
  },

  contactDetails: function () {
    return this.hasOne('ContactDetail');
  },

  personalInfo: function() {
    return this.hasOne('PersonalInfo');
  }
});

export default User;
