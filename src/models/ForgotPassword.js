import db from "../utils/db";

const TABLE_NAME = "forgot_password";

const ForgotPassword = db.model('ForgotPassword', {
  tableName: TABLE_NAME,
  hasTimestamps: true,
});

export default ForgotPassword;
