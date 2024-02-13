const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const bookingModel = require("../models/bookingModel");
const mongoose = require("mongoose");

router.post("/book", async (req, res) => {
  try {
    const departmentName = req.body.departmentName;
    const doctors = req.body.doctors;
    const date = req.body.date;
    const time = req.body.time;
    const userId = req.body.userId;
    const newBooking = new Booking(req.body);
    await newBooking.save();

    res
      .status(200)
      .send({ message: "booking created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error booking", success: false, error: error });
  }
});

router.get("/book/:doctorId", async (req, res) => {
  try {
    // const { doctorId } = req.params;
    const { doctorId } = req.query;
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
    console.log("DoctorId tipi:", typeof doctorObjectId);
    const { date, time } = req.query;
    if (!mongoose.Types.ObjectId.isValid(doctorObjectId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid doctorId format" });
    }
    const appointments = await bookingModel.find({ doctorId: doctorObjectId });
    console.log("appointments:", appointments);
    const appointmentsForDoctorAndDateTime = appointments.filter(
      (appointment) =>
        appointment.doctorObjectId === doctorObjectId &&
        appointment.date === date &&
        appointment.time === time
    );

    const busyTimes = appointmentsForDoctorAndDateTime.map(
      (appointment) => `${appointment.date} ${appointment.time}`
    );
    console.log("busyTimes", busyTimes);
    res.json({ success: true, busyTimes });
  } catch (error) {
    console.error("Error getting availability:", error);
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting availability" });
  }
});
module.exports = router;
