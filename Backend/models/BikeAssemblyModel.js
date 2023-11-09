const mongoose = require("mongoose");

const bikeAssemblySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  bikeModal: {
    type: String,
    required: true,
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
  },
  TimeTaken: {
    type: Number,
    required: true,
  },
  dateAssembled: {
    type: Date,
  },
});

const BikeAssembly = mongoose.model("BikeAssembly", bikeAssemblySchema);

module.exports = BikeAssembly;
