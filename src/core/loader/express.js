"use strict";

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allRoutes = require("../routes");

module.exports = () => {
  const app = express();

  app.use(cors({ credentials: true }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use("/api/v1", allRoutes);

  app.all("*", (req, _res, next) => {
    const err = new Error(`Requested ${req.url} not found`);
    err.statusCode = 404;
    next(err);
  });

  app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      status: statusCode,
      message: err.message,
    });
  });

  return app;
};
