const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restroschema = new Schema({
  name: { type: String },
  city: { type: String },
  location_id: { type: Number },
  city_id: { type: Number },

  locality: { type: String },

  thumb: { type: Array },

  aggregate_rating: { type: Number },
  rating_text: { type: String },
  min_price: { type: Number },
  contact_number: { type: String },
  cuisine_id: { type: Array },

  cuisine: { type: Array },
  image: { type: String },
  mealtypeid: { type: Number },
});
const restaurantmodel = mongoose.model(
  "restaurantlist",
  restroschema,
  "restaurantlist"
);
module.exports = restaurantmodel;
