const mongoose = require("mongoose");

const schemaCategory = new mongoose.Schema({
  category_name: {
    type: String,
  },
});

const category_menu = mongoose.model("category_menu", schemaCategory);
module.exports = category_menu;
