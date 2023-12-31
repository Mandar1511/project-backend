const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.authenticate);

router.get("/myjobs", userController.getMyJobs);
router.get("/me", userController.getUser);
router.get("/myskills", userController.getMySkills);
router.patch("/myskills", userController.addSkills);
router.patch("/profileImg", userController.updateProfileImg);
router.patch("/education", userController.updateEducation);
router.patch("/socialmedia", userController.updateSocialMedia);
router
  .route("/resume")
  .get(userController.getResume)
  .patch(userController.updateResume);
module.exports = router;
