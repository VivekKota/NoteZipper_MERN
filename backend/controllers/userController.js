const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateTokens");

const authUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      const error = new Error("Invalid Email or Password");
      next(error);
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        pic: user.pic,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log("There is error in creating a employee", error);
    res.status(500).json(`Error: ${error}`);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (pic) user.pic = pic;

    // Save the updated user
    const updatedUser = await user.save();

    // Respond with the updated user details
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json(`Error: ${error}`);
  }
});

module.exports = { registerUser, updateUser, authUser };
