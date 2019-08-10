import db from "../utils/db";
import "./deal";
import "./user";

const TABLE_NAME = "booked_deals";

var BookedDeal = db.model('BookedDeal',{
  tableName: TABLE_NAME,
  deal: function(){
    return this.belongsTo('Deal');
  },
  user: function(){
    return this.belongsTo('User');
  }
});

export default BookedDeal;
