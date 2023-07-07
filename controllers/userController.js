const asyncHandler = require("express-async-handler");

exports.getMyJobs = asyncHandler(async (req, res) => {
  const jobs = req.user.appliedPositions;
  res.status(200).json(jobs);
});
