const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddlewares");
const Booking = require("../models/bookingModel");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .json({ message: "user already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "error creating user", success: false, error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password); //   -----
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "password incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      res
        .status(200)
        .send({ message: "login successful", success: true, data: token });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error logging in", success: false, error: error });
  }
});

///////

// router.post("get-user-by-id", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.body.userId }).populate(
//       "bookings"
//     );
//     if (!user) {
//       return res
//         .status(400)
//         .send({ message: "user does not exist", success: false });
//     } else {
//       res.status(200).send({
//         success: true,
//         data: {
//           name: user.name,
//           email: user.email,
//         },
//       });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "error getting user info", success: false, error });
//   }
// });

// userId yi alamadım
router.get("/get-user-appointments", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookings"); //{ _id: mongoose.Types.ObjectId(userId) }
    if (!user) {
      return res
        .status(404)
        .json({ message: "bookings does not exist", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          bookings: user.bookings,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user info", success: false, error });
  }
});

module.exports = router;
