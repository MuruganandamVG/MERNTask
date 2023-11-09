const jwt = require("jsonwebtoken");
const ApprovalRequest = require("../models/ApprovalModel");
const Employee = require("../models/EmployeeModel");
const bcrypt = require("bcrypt");
const RequestSubmission = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const approvalRequest = await ApprovalRequest.create({
      employeeId: employeeId,
    });

    res.status(201).json({ message: "Request Submitted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "An Error Occurred" });
  }
};

const PendingRequests = async (req, res) => {
  try {
    const pendingRequests = await ApprovalRequest.find().populate({
      path: "employeeId",
      model: "Employee",
      match: { ApprovalStatus: false }, // Filter employees with ApprovalStatus true
    });
    const filteredPendingRequests = pendingRequests.filter(
      (request) => request.employeeId !== null
    );
    res.status(200).json({ pendingRequests: filteredPendingRequests });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
    console.log(err);
  }
};

const ApproveRequests = async (req, res) => {
  const { id } = req.params;
  const { ApprovalStatus } = req.body;
  console.log(id);
  try {
    const approved = await Employee.findOneAndUpdate(
      { _id: id },
      { ApprovalStatus: ApprovalStatus },
      { new: true }
    );

    if (approved) {
      res
        .status(200)
        .json({ message: "Request Approved succesfully", approved: approved });
    }
  } catch (err) {
    res.status(404).json({ message: "Error Not found" });
  }
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email: email });
  const IsAdmin = employee.isAdmin;
  console.log(IsAdmin);
  if (
    employee &&
    (await bcrypt.compare(password, employee.password)) &&
    IsAdmin
  ) {
    const token = jwt.sign(
      {
        employee: {
          name: employee.name,
          email: employee.email,
        },
      },
      "secretkey",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      currentuser: employee,
    });
  } else {
    res.status(401).json({ message: "UnAuthorized Not found" });
  }
};
module.exports = {
  RequestSubmission,
  PendingRequests,
  ApproveRequests,
  AdminLogin,
};
