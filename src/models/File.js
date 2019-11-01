import db from "../utils/db";
import './user';
import './UserFile';

const TABLE_NAME = "files";

const File = db.model('File', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
  user: function() {
    //id of this modal
    return this.belongsTo('User').through('UserFile', 'id', 'user_id', 'file_id');
  },

  approved_by: function() {
    return this.belongsTo('User', 'approver_id', 'id')
  }
});

export const FileCollection = db.Collection.extend({
  model: File
});

export default File;
