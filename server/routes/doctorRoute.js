const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
router.get("/doctor", async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const doctors = await Doctor.find({ departmentId });
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
