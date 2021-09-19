const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/CustomError");
const User = require("../models/User");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.create({
    email,
    password,
  });

  const token = user.generateJwtFromUser();

  return res.status(201).json({
    success: true,
    user,
    token,
  });
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  console.log(user)

  if (!user) return next(new CustomError(404, "User not found."));

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword)
    return next(new CustomError(400, "Please check your credentials."));

  const token = user.generateJwtFromUser();

  return res.status(200).json({
    success: true,
    user,
    token,
  });
});

module.exports = {
  register,
  login,
};
