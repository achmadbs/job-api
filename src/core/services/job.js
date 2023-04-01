"use strict";
const fetch = require("node-fetch");

const URL = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json?";

async function getJobList({ description, location, full_time, page }) {
  const queryParams = {
    description,
    location,
    full_time,
    page,
  };
  const esc = encodeURIComponent;
  const query = Object.keys(queryParams)
    .map((k) => `${esc(k)}=${esc(queryParams[k])}`)
    .join("&");

  try {
    const jobsList = await fetch(URL + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return jobsList.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getJobDetails(id) {
  try {
    const jobDetail = await fetch(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return jobDetail.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

const jobService = {
  getJobList,
  getJobDetails,
};

module.exports = jobService;
