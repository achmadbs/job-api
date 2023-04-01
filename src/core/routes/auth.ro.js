"use strict";

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.co");

router.post("/", authController.login);
router.post("/create", authController.createUser);

module.exports = router;
