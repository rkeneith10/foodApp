const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const secretKey = "rkeneithshop";

const UserModel = require("../models/users");
const orderModel = require("../models/oders");

exports.addOrders = async (req, res) => {
  const { restaurant_name, price, menu_item_name, quantite } = req.body;

  const token = await req.headers["x-access-token"];
  const decoded = await jwt.verify(token, secretKey);
  const user = await UserModel.findOne({
    _id: decoded.id,
  }).select("-password");

  const newOrder = await new orderModel({
    user_id: user._id,
    restaurant_name: restaurant_name,
    menu_item_name: menu_item_name,
    quantite: quantite,
    delivery_adress: user.adress,
    price: price * quantite,
  }).save();

  res.json(newOrder);
};

exports.getOrderByUserID = async (req, res) => {
  const token = await req.headers["x-access-token"];
  const decoded = await jwt.verify(token, secretKey);
  const user = await UserModel.findOne({
    _id: decoded.id,
  });

  await orderModel
    .find({ user_id: user._id }, (err, orderUSer) => {
      if (!orderUSer) {
        res.json({
          message: "No data found",
        });
      } else {
        res.json(orderUSer);
      }
    })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};
