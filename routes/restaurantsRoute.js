const express = require("express");
const router = express.Router();

const restaurantCtrl = require("../controllers/restaurantControllers");

router.post("/addRestaurant", restaurantCtrl.addRestaurant);
router.get("/getAllRestaurants", restaurantCtrl.listRestaurants);
router.get("/restaurant/:id", restaurantCtrl.getOneRestaurant);
router.put("/updateRestaurant/:id", restaurantCtrl.updateRestaurant);
router.delete("/deleteRestaurant/:id", restaurantCtrl.deleteRestaurant);

module.exports = router;
