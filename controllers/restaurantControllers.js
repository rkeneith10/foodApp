const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const restaurantModel = require("../models/restaurants");

exports.addRestaurant = async (req, res) => {
  const { restaurant_name, adress, telephone } = req.body;
 
  const restaurantExist = await restaurantModel.findOne({ restaurant_name });

  if (!restaurantExist) {
    const restaurants = new restaurantModel({
      restaurant_name: restaurant_name,
      adress: adress,
      telephone:telephone
    });

    await restaurants.save();

    res.json(restaurants);
  } else {
    res.json({
      success: false,
      msg: "Restaurant already exist",
    });
  }
};

exports.listRestaurants = async (req, res) => {
  await restaurantModel
    .find({}, (err, restaurants) => {
      if (err) {
        res.json({
          success: false,
          error: err,
        });
      }
      if (!restaurants) {
        res.status(400).json({
          success: false,
          error: "No Restaurant",
        });
      }

      res.status(200).json(
      
      restaurants,
      );
    })
    .catch((err) => console.log(err));
};

exports.getOneRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const oneRestaurant = await restaurantModel.findById({ _id: restaurantId });
  if (!oneRestaurant) {
    res.json({
      success: false,
      message: "No data found",
    });
  }
  res.status(200).json(
   
     oneRestaurant,
  );
};

exports.updateRestaurant = async (req, res) => {
  const { restaurant_name, adress, telephone } = req.body;
  const { street, city, country } = adress;

  const restaurant = await restaurantModel.findOne({ _id: req.params.id });
  if (restaurant) {
    const filter = { _id: req.params.id };
    const update = {
      $set: {
        restaurant_name: restaurant_name,
        adress: {
          street: street,
          city: city,
          country: country,
        },
        telephone: telephone,
      },
    };
    const updateResto = await restaurantModel.updateOne(filter, update);
    if (updateResto) {
      res.json({
        success: true,
        messsage: "Restaurant Updated successfully",
      });
    }
  }
};

exports.deleteRestaurant = async (req, res) => {
  const restautant = await restaurantModel.findOne({ _id: req.params.id });
  if (restautant) {
    const deleteRestaurant = await restaurantModel.deleteOne({
      _id: req.params.id,
    });
    if (deleteRestaurant) {
      res.json({
        success: true,
        message: "Restaurant deleted",
      });
    }
  } else {
    res.json({
      success: false,
      message: "No data found",
    });
  }
};
