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

exports.getResume = asyncHandler(async (req, res) => {
  let resume = req.user.resume;
  if (resume == null) {
    resume = "";
  }
  res.status(200).json(resume);
});

exports.updateResume = asyncHandler(async (req, res) => {
  const resume = req.body.resume;
  const userId = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(userId, {
    resume: resume,
  });
  if (updatedUser) {
    res.status(200).json(updatedUser.resume);
  } else {
    res.status(400);
    return new Error("couldn't update the resume");
  }
});

exports.updateEducation = asyncHandler(async (req, res) => {
  const education = req.body.education;
  const userId = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      education: education,
    },
    {
      new: true,
    }
  );
  if (updatedUser) {
    res.status(200).json(updatedUser.education);
  } else {
    res.status(400);
    return new Error("couldn't update education info");
  }
});

exports.updateSocialMedia = asyncHandler(async (req, res) => {
  const socialMedia = req.body.socialMedia;
  const userId = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      socialMedia: socialMedia,
    },
    {
      new: true,
    }
  );
  if (updatedUser) {
    res.status(200).json(updatedUser.socialMedia);
  } else {
    res.status(400);
    return new Error("couldn't update social media info");
  }
});
