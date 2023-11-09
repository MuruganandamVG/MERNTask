const express = require("express");
const router = express.Router();
const protect = require("../middleware/AuthMiddleware");
const ApprovalStatus = require("../controllers/ApprovalStatusController");
const Bike = require("../models/BikeModel");
router.post("/", async (req, res) => {
  const { modal, assemblyTime } = req.body;
  try {
    const bike = await Bike.create({ modal, assemblyTime });

    if (bike) {
      res.status(201).json({ bike: bike });
    }
  } catch (err) {
    res.status(500).json({ message: "Error occurred" });
  }
});
router.get("/:id", ApprovalStatus);

module.exports = router;
