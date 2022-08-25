const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");

const schemaOrders = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant_name: {
      type: String,
    },
    menu_item_name: {
      type: String,
    },
    quantite: {
      type: Number,
    },
    delivery_adress: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Orders", schemaOrders);
