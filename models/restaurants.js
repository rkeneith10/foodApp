const mongoose = require("mongoose");
const schemaMenu_item = require("./menu_item");

const schemaRestaurant = new mongoose.Schema({
  restaurant_name: {
    type: String,
  },
  adress: {
    street: String,
    city: String,
    country: String,
  },
  telephone: {
    type: String,
  },
  menus: {
    type: [{}],
  },
});

const restaurants = mongoose.model("restaurants", schemaRestaurant);
module.exports = restaurants;
