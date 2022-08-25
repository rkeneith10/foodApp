const mongoose = require("mongoose");

const schemaUsers = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },

  telephone: {
    type: String,
  },
  password: {
    type: String,
  },
});
const users = mongoose.model("users", schemaUsers);
module.exports = users;
