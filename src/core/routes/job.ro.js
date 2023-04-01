"use strict";

const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.co");

router.get("/", jobController.fetchJobs);
router.get("/details/:jobId", jobController.fetchDetailsJob);

module.exports = router;
