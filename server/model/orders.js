// {
//   " order_id": "1234a",
//  "name": "aayu",
//  "mobile":7016,
//  "email": "abc",
//  "order_list":[{"order1":"pasta"},{"ORDER2":"pizza"}],
//  "payment_id": "4567f",
//  "payment_status": true
// }
const { Schema, model } = require("mongoose");
const ordersschema = new Schema({
  order_id: { type: String },
  name: { type: String },
  mobile: { type: Number },
  email: { type: String },
  order_list: { type: Array },
  payment_id: { type: String },
  payment_status: { type: Boolean },
  totalamount: { type: Number },
});
const ordermodel = model("orders", ordersschema, "orders");
module.exports = ordermodel;
