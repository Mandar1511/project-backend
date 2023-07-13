const mongoose = require("mongoose");

const jobDescriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
      required: true,
    },
  ],
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  industry: {
    type: String,
  },
  workPlaceType: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appliedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobDescriptionSchema);

module.exports = Job;
