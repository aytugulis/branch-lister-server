const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  latitude: {
    type: Number,
    required: [true, "Please provide a latitude"],
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: [true, "Please provide a longitude"],
    min: -180,
    max: 180,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  full_address: {
    type: String,
    required: [true, "Please provide a full_address"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone"],
  },
});

module.exports = mongoose.model("Branch", BranchSchema);
