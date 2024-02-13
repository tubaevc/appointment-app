const express = require("express");
const router = express.Router();
const Department = require("../models/departmentsModel");
const Doctor = require("../models/doctorModel");
// Tüm departmanları getir
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({ departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// router.get("/department", async (req, res) => {
//   try {
//     const department = await Department.find();
//     res.json(department);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/:departmentId/doctors", async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const doctors = await Doctor.find({ department: departmentId });
    res.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
