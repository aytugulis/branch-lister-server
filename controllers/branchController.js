const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/CustomError");
const Branch = require("../models/Branch");

const createBranch = asyncErrorWrapper(async (req, res, next) => {
  const { latitude, longitude, name, full_address, phone } = req.body;

  const branch = await Branch.create({
    latitude,
    longitude,
    name,
    full_address,
    phone,
  });

  return res.status(201).json({
    success: true,
    branch,
  });
});

const updateBranch = asyncErrorWrapper(async (req, res, next) => {
  const { latitude, longitude, name, full_address, phone } = req.body;
  const { branchId } = req.params;

  const branch = await Branch.findByIdAndUpdate(
    branchId,
    { latitude, longitude, name, full_address, phone },
    { new: true, runValidators: true }
  );

  if (!branch) return next(new CustomError(404, "Branch is not found"));

  return res.status(200).json({
    success: true,
  });
});

const deleteBranch = asyncErrorWrapper(async (req, res, next) => {
  const { branchId } = req.params;

  const branch = await Branch.findByIdAndDelete(branchId);

  if (!branch) return next(new CustomError(404, "Branch is not found"));

  return res.status(200).json({
    success: true,
    branch,
  });
});

const getSingleBranch = asyncErrorWrapper(async (req, res, next) => {
  const { branchId } = req.params;

  const branch = await Branch.findById(branchId);

  if (!branch) return next(new CustomError(404, "Branch is not found"));

  return res.status(200).json({
    success: true,
    branch,
  });
});

const getBranches = asyncErrorWrapper(async (req, res, next) => {
  let { page = 1, limit = 8 } = req.query;
  page = +page;
  limit = +limit;

  const skip = Number(limit * (page - 1));

  const totalCount = await Branch.countDocuments();

  let totalPage = totalCount / limit;
  totalPage = Math.ceil(totalPage);

  const branches = await Branch.find().limit(limit).skip(skip);

  return res.status(200).json({
    success: true,
    totalCount,
    currentPage: page,
    totalPage,
    branches,
  });
});

module.exports = {
  createBranch,
  updateBranch,
  deleteBranch,
  getSingleBranch,
  getBranches,
};
