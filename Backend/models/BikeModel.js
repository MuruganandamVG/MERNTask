const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  modal: {
    type: String,
    required: true,
    unique: true,
  },
  assemblyTime: {
    type: Number,
    required: true,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
