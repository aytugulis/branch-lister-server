const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAccessToRoute = async (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  const { authorization } = req.headers;

  const isTokenExists = authorization && authorization.startsWith("Bearer");

  if (!isTokenExists) {
    return next(
      new CustomError(401, "You are not authorized to access this route")
    );
  }

  const accessToken = authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(accessToken, JWT_SECRET_KEY);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return next(
      new CustomError(401, "You are not authorized to access this route")
    );
  }
};

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin")
    return next(new CustomError(403, "Only admins can access this route"));

  next();
});

module.exports = {
  getAccessToRoute,
  getAdminAccess,
};
