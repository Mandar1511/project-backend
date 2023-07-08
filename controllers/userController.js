const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

exports.getMyJobs = asyncHandler(async (req, res) => {
  const jobs = req.user.appliedPositions;
  res.status(200).json(jobs);
});

exports.getMySkills = asyncHandler(async (req, res) => {
  let skills = req.user.skills;
  if (skills == null) {
    skills = [];
  }
  res.status(200).json(skills);
});

exports.addSkills = asyncHandler(async (req, res) => {
  const skills = req.body;
  const userId = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(userId, { skills: skills });
  if (updatedUser) {
    res.status(200).json(updatedUser.skills);
  } else {
    res.status(400);
    return new Error("couldn't update the skills");
  }
});

exports.updateProfileImg = asyncHandler(async (req, res) => {
  const profileImg = req.body.profileImg;
  const userId = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(userId, {
    profileImg: profileImg,
  });
  if (updatedUser) {
    res.status(200).json(updatedUser.profileImg);
  } else {
    res.status(400);
    return new Error("couldn't update the Profile Image");
  }
});
