const { Schema, model } = require("mongoose"); //destructuring of schema

const mealtypeschema = new Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type: { type: Number },
});

const Mealtypemodel = model("meals", mealtypeschema, "meals");
module.exports = Mealtypemodel;
