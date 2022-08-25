const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const secretKey = "rkeneithshop";

const UserModel = require("../models/users");

exports.register = async (req, res) => {
  const { firstName, lastName, email, adress, telephone, password } = req.body;
  const existEmail = await UserModel.findOne({ email });
  const existPhone = await UserModel.findOne({ telephone });

  if (!existEmail && !existPhone) {
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      adress: adress,
      telephone: telephone,
      password: await bcrypt.hash(password, 10),
    }).save();
    const token = jwt.sign({ id: newUser._id }, secretKey, {
      expiresIn: "1d",
    });
    res.header("x-access-token", token).status(201).json({
      success: true,
      msg: "User saved",
      token: token,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: "Email or phone number already taken",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    res.status(400).json({
      auth: false,
      msg: "User does not exist",
    });
  } else {
    const equalPassword = bcrypt.compareSync(password, user.password);
    if (!equalPassword) {
      res.status(401).json({
        auth: false,
        msg: "Wrong Password",
      });
    } else {
      const token = jwt.sign({ id: user._id }, secretKey, {
        expiresIn: "1d",
      });
      res.header("x-access-token", token).status(201).json({
        auth: true,
        token: token,
        result: user,
        msg: "OKe",
      });
    }
  }
};

exports.profilInfo = async (req, res) => {
  const token = await req.headers["x-access-token"];

  if (!token) {
    return res.status(400).json({
      auth: false,
      msg: "NO token providen",
    });
  } else {
    const decoded = await jwt.verify(token, secretKey);
    const user = await UserModel.findOne({
      _id: decoded.id,
    }).select("firstName lastName email adress telephone");

    res.status(200).json({
      //auth: true,
      profileInfo: user,
    });
  }
};
