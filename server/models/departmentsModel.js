const mongoose = require("mongoose");

const departmentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const departmentsModel = mongoose.model("departments", departmentsSchema);
module.exports = departmentsModel;
