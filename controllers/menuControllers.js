const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const CategoryModel = require("../models/category_menu.js");
const MenuItemModel = require("../models/menu_item");
const restaurantModel = require("../models/restaurants");

exports.addCategorry = async (req, res) => {
  const { category_name } = req.body;

  const categoryExist = await CategoryModel.findOne({ category_name });

  if (!categoryExist) {
    const category = new CategoryModel({
      category_name: category_name,
    }).save();
    res.json({
      //Category: categoryExist,
      msg: "Category saved sucessfully",
    });
  } else {
    res.json({
      msg: "Category already exist",
    });
  }
};

exports.getMenu = async (req, res) => {
  await MenuItemModel
    .find({restaurant_name:req.body.restaurant_name}, (err, menus) => {
      if (err) {
        res.json({
          success: false,
          error: err,
        });
      }
      if (!menus) {
        res.status(400).json(
          
          {error: "No Menu item"}
        );
      }

      res.status(200).json(
      
      menus,
      );
    })
    .catch((err) => console.log(err));
};


exports.getCategory = async (req, res) => {
  const allCategories = await CategoryModel.find();
  res.json(allCategories);
};

exports.addMenu_item = async (req, res) => {
  const { item_name, restaurant_name, description, price } = req.body;

  const newMenuItem = new MenuItemModel({
    restaurant_name: restaurant_name,
    item_name: item_name,
    category: "Pizza",
    description: description,
    price: price,
  });

  await newMenuItem.save();
  const filter = { restaurant_name: restaurant_name };
  const update = { $push: { menus: newMenuItem } };
  await restaurantModel.updateOne(filter, update);

  res.json(newMenuItem);
};

exports.updateMenu = async (req, res) => {
  const { item_name, restaurant_name, description, price } = req.body;
  const menu = MenuItemModel.findOne({ _id: req.params.id });
  if (menu) {
    const filter = { _id: req.params.id };
    const update = {
      $set: {
        item_name: item_name,
        restaurant_name: restaurant_name,
        description: description,
        price: price,
      },
    };
    const updateMenu = MenuItemModel.updateOne(filter, update);
    if (updateMenu) {
      res.json({
        success: true,
        message: "Menu updated successfully",
      });
    }
  }
};

exports.deleteMenu = async (req, res) => {
  const menu = await MenuItemModel.findOne({ _id: req.params.id });
  if (menu) {
    const deleteMenu = await MenuItemModel.deleteOne({ _id: req.params.id });
    if (deleteMenu) {
      res.json({
        success: true,
        message: "Item Menu deleted",
      });
    }
  } else {
    res.json({
      success: false,
      message: "No data found",
    });
  }
};
