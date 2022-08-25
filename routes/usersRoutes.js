const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/usersControllers");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/profilInfo", userCtrl.profilInfo);
module.exports = router;
