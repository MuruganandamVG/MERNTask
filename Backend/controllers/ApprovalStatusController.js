const Employee = require("../models/EmployeeModel");
const Approval = require("../models/ApprovalModel");
const Bike = require("../models/BikeModel");

const ApprovalStatus = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);

    const approval = await Approval.findOne({ employeeId });
    console.log(employee);
    console.log(approval);

    if (!employee.ApprovalStatus && approval) {
      res.status(200).json({
        message: "your request is pending with Admin..Please contact",
      });
    } else if (!employee.ApprovalStatus && !approval) {
      res.status(200).json({ message: "your need Admin Approval" });
    } else if (employee.ApprovalStatus) {
      const bikedetails = await Bike.find({});
      res
        .status(200)
        .json({ message: "user has Approval", bikedetails: bikedetails });
    } else {
      res.status(200).json({ message: "Bike Details fetched successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = ApprovalStatus;
