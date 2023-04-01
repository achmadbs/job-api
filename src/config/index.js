"use strict";

const dotenv = require("dotenv");
const envFile = dotenv.config();

if (!envFile) {
  throw new Error(".env file not found");
}

module.exports = {
  server: {
    port: process.env.APP_SERVER_PORT,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_KEY_EXPIRATION,
};
