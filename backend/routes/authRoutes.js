const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");

const {
  signupSchema,
  loginSchema,
} = require("../validations/authValidation");

router.post(
  "/signup",
  validate(signupSchema),
  authController.signup
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/logout",
  authMiddleware,
  authController.logout
);

router.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser
);

module.exports = router;