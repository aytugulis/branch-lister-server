const CustomError = require("../helpers/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  if (err.name === "MongoError" && err.code === 11000) {
    customError = new CustomError(400, "email must be unique");
  }

  if (err.name === "ValidationError") {
    customError = new CustomError(400, err.message);
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
  });
};

module.exports = customErrorHandler;
