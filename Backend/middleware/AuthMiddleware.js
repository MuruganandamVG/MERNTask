const jwt = require("jsonwebtoken");
const Employee = require("../models/EmployeeModel");
const protect = async (req, res, next) => {
  let token;
  console.log(req.headers);
  token = req.headers["authorization"];
  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, "secretkey");
      req.user = await Employee.findOne({ email: decoded.email });
      next();
    } catch (err) {
      console.log(err);

      res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};

const AdminProtect = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = AdminProtect;
module.exports = protect;
