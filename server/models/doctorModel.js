const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
    },
  },
  {
    timestamps: true,
  }
);
const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
