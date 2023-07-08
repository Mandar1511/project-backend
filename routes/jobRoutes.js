const express = require("express");
const jobController = require("./../controllers/jobController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/", authController.authenticate, jobController.getJobs);
router.post("/", authController.authenticate, jobController.createJob);
module.exports = router;
