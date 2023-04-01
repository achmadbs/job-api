"use strict";

const express = require("express");
const router = express.Router();
const { parseAuth } = require("../middleware");

const auth = require("./auth.ro");
const job = require("./job.ro");

router.use("/auth", auth);
router.use("/job", parseAuth, job);

module.exports = router;
