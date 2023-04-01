"use strict";

const { jobService } = require("../services");

const fetchJobs = async (req, res, next) => {
  const {
    description = "",
    location = "",
    full_time = false,
    page = 1,
  } = req.query;
  try {
    const responseData = await jobService.getJobList({
      description,
      location,
      full_time,
      page,
    });
    return res.send({
      data: responseData,
      message: "Successfully fetch job list",
    });
  } catch (error) {
    next(error);
  }
};

const fetchDetailsJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const responseData = await jobService.getJobDetails(jobId);
    return res.send({
      data: responseData,
      message: "Successfully fetch job details",
    });
  } catch (error) {
    next(error);
  }
};

const jobController = {
  fetchJobs,
  fetchDetailsJob,
};

module.exports = jobController;
