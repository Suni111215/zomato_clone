const { Schema, model } = require("mongoose");

// ObjectId = Schema.Types.ObjectId;
//const ObjectId = Schema.ObjectId;
const MenuItemsSchema = new Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: String },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

const MenuItemsModel = model("menuitems", MenuItemsSchema, "menuitems");

module.exports = MenuItemsModel;
