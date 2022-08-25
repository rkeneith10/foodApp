const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const db = require("./db");

const userRoute = require("./routes/usersRoutes");
const menuRoute = require("./routes/menuRoutes");
const restaurantRoute = require("./routes/restaurantsRoute");
const ordersRoute = require("./routes/ordersRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extented: true }));
app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World test!"));

app.use("/api", userRoute);
app.use("/api", menuRoute);
app.use("/api", restaurantRoute);
app.use("/api", ordersRoute);

app.listen(PORT, () => {
  console.log(`Server start on Port:${PORT}...`);
});
