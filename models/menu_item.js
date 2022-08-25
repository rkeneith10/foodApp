const mongoose = require("mongoose");

const schemaMenu_item = new mongoose.Schema({
  restaurant_name: String,
  item_name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
  },
  imageURL: {
    type: String,
  },
});

const menu_item = mongoose.model("menu_item", schemaMenu_item);
module.exports = menu_item;
