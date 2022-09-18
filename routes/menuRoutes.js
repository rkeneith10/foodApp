const express = require("express");
const router = express.Router();

const menuCtrl = require("../controllers/menuControllers");

router.post("/addCategory", menuCtrl.addCategorry);
router.post("/addMenu", menuCtrl.addMenu_item);
router.get("/getMenu",menuCtrl.getMenu);
router.get("/getCategories", menuCtrl.getCategory);
router.delete("/deleteMenu/:id", menuCtrl.deleteMenu);
module.exports = router;
