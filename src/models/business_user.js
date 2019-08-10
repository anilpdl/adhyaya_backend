import db from "../utils/db";
import "./user";
import "./business";

const TABLE_NAME = "business_users";

var BusinessUser = db.model('BusinessUser',{
  tableName: TABLE_NAME,
  user: function(){
    return this.belongsTo('User');
  },
  business: function(){
    return this.belongsTo('Business')
  }
});

export default BusinessUser;
