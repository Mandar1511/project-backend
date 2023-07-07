const asyncHandler = require("express-async-handler");
const Job = require("./../models/jobModel");
const { Error } = require("mongoose");

exports.createJob = asyncHandler(async (req, res) => {
  const newJob = await Job.create(req.body);
  if (newJob) {
    res.status(201).send(newJob);
  } else {
    res.status(400);
    throw new Error("Failed to create job");
  }
});

exports.getJobs = asyncHandler(async (req, res) => {
  let query = {};
  // /api/v1/jobs/
  if (req.query.search) {
    query = {
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
        { skills: { $elemMatch: { $regex: req.query.search, $options: "i" } } },
      ],
    };
  }
  const jobs = await Job.find(query)
    .sort({ createdAt: -1, salary: -1 })
    .limit(100);
  res.status(200).send(jobs);
});
