const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    degree: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    project: { type: String, default: "" },
    hobbies: { type: [String], default: [] },
    certificate: { type: String, default: "" },
    internship: { type: String, default: "" },
    aboutAim: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
