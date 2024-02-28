const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  updateUser,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(updateUser);

module.exports = router;
