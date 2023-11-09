const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BikeAssembly = require("../models/BikeAssemblyModel");
const AdminProtect = require("../middleware/AuthMiddleware");
const protect = require("../middleware/AuthMiddleware");
router.post("/register", async (req, res) => {
  const { name, email, Employee_no, password } = req.body;
  console.log(name, email);
  const employeeExists = await Employee.findOne({ email });
  if (employeeExists) {
    res.status(400).json({ message: "User Already Exists" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const employee = await Employee.create({
    name,
    email,
    Employee_no,
    password: hashedpassword,
  });

  if (employee) {
    res.status(201).json({
      message: "Employee Registration",
    });
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }
});

router.get("/logout", async (req, res) => {
  req.user = "";
  res.status(200).json({ message: "Logged Out Successfully" });
});

router.get("/production/:empno", protect, async (req, res) => {
  const Employee_no = Number(req.params.empno);
  const { fromdate, todate } = req.query;
  console.log(req.body);
  const EmployeeDetails = await Employee.findOne({ Employee_no: Employee_no });
  console.log(EmployeeDetails._id);
  console.log(fromdate, todate);
  const FromDate = new Date(fromdate).toISOString();
  const ToDate = new Date(todate).toISOString();
  try {
    const productionDetails = await BikeAssembly.find({
      employeeId: EmployeeDetails._id,
      dateAssembled: { $gte: FromDate, $lte: ToDate },
    });

    const EveryDayDetails = await BikeAssembly.aggregate([
      {
        $match: {
          employeeId: EmployeeDetails._id,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$dateAssembled" },
          },
          totalTimeTaken: { $sum: "$TimeTaken" },
        },
      },
    ]);
    console.log(productionDetails);

    if (productionDetails) {
      const TotalTimeSpent = productionDetails.reduce(
        (acc, curr) => curr.TimeTaken + acc,
        0
      );

      const TVSBike = productionDetails.filter(
        (bike) => bike.bikeModal == "TVS Bike"
      );
      const HeroHonda = productionDetails.filter(
        (bike) => bike.bikeModal == "Hero Honda"
      );
      const Bajaj = productionDetails.filter(
        (bike) => bike.bikeModal == "Bajaj"
      );

      const TVSCount = TVSBike.length || 0;
      const HondaCount = HeroHonda.length || 0;
      const BajajCount = Bajaj.count || 0;
      res.status(200).json({
        Details: EveryDayDetails,
        message: productionDetails,
        TotalTimeSpent: TotalTimeSpent,
        TVSBike: TVSCount,
        HeroHonda: HondaCount,
        Bajaj: BajajCount,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error Occurred" });
  }
});
router.post("/bikeassemble/:id", async (req, res) => {
  const employeeId = req.params.id;
  console.log(req.body);
  const { bikeId, bikeModal, TimeTaken } = req.body;
  const dateAssembled = new Date();
  console.log(dateAssembled);
  try {
    console.log(req.body, employeeId);
    const bikeAssemblies = await BikeAssembly.create({
      employeeId,
      bikeModal,
      bikeId,
      TimeTaken,
      dateAssembled,
    });
    if (bikeAssemblies) {
      res.status(201).json({ message: bikeAssemblies });
    }
  } catch (err) {
    res.status(401).json({ message: "Incorrect data" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email: email });
  if (employee && (await bcrypt.compare(password, employee.password))) {
    const token = jwt.sign(
      {
        employee: {
          name: employee.name,
          email: employee.email,
          status: employee.ApprovalStatus,
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
    res.status(404).json({ message: "User Not found" });
  }
});

module.exports = router;
