const mongoose = require("mongoose");
function generateRandomRequestNumber() {
  const min = 100000; // Smallest 6-digit number
  const max = 999999;
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random number between 0 and 9999
  const requestNumber = `${randomValue}`; // Combine timestamp and random value
  return requestNumber;
}

const ApprovalRequestSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  requestNo: {
    type: String,
    default: generateRandomRequestNumber,
  },
  requestedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ApprovalRequest = mongoose.model(
  "ApprovalRequest",
  ApprovalRequestSchema
);

module.exports = ApprovalRequest;
