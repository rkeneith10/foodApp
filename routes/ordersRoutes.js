const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/ordersControllers");

router.post("/addOrder", orderCtrl.addOrders);
router.get("/orderUser", orderCtrl.getOrderByUserID);
module.exports = router;
