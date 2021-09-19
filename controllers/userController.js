const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/CustomError");
const User = require("../models/User");

const getCurrentUser = asyncErrorWrapper(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    success: true,
    user,
  });
});

const getAllUsersAsAdmin = asyncErrorWrapper(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    users,
  });
});

module.exports = {
  getCurrentUser,
  getAllUsersAsAdmin,
};
