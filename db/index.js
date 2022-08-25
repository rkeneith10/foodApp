const mongoose = require("mongoose");
const dburl = process.env.MONGODB_URL || "mongodb://localhost/foodapp";

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
