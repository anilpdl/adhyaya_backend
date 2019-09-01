import db from "../utils/db";

const TABLE_NAME = "user_invitations";

const UserInvitation = db.model('UserInvitation', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
});

export default UserInvitation;
