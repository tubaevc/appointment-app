const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const bookingModel = require("../models/bookingModel");
const mongoose = require("mongoose");

router.post("/book", async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // appointment check
    const existingAppointments = await Booking.find({ doctorId, date, time });

    if (existingAppointments.length > 0) {
      return res
        .status(400)
        .json({ message: "Appointment time is not available", success: false });
    }
    //new appointment
    const newBooking = new Booking(req.body);
    await newBooking.save();

    res
      .status(200)
      .json({ message: "Randevu başarıyla oluşturuldu.", success: true });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res
      .status(500)
      .json({ message: "Error creating appointment", success: false, error });
  }
});

module.exports = router;
