const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const departmentRoute = require("./routes/departmentRoute");
app.use("/api/user", userRoute);
app.use("/api/booking", bookRoute);
app.use("/api/departments", departmentRoute);
const port = process.env.PORT || 5000;
// console.log(process.env.MONGO_URL);
app.listen(port, () => console.log(`node server started at port ${port}`));
//
const router = express.Router();
const Department = require("./models/departmentsModel");
const Doctor = require("./models/doctorModel");
router.post("/departments", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newDepartment = new Department({ name, description });
    await newDepartment.save();
    res.json({
      success: true,
      message: "Department saved",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Department save error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/doctors", async (req, res) => {
  try {
    const { name, departmentId } = req.body;
    const newDoctor = new Doctor({ name, department: departmentId });
    await newDoctor.save();
    res.json({ success: true, message: "Doctor saved", doctor: newDoctor });
  } catch (error) {
    console.error("Doctor save error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
