"use strict";
const config = require("./config");
const expressLoader = require("./core/loader/express");
const { sequelize } = require("./models");

function startServer() {
  const app = expressLoader();
  sequelize
    .sync()
    .then(() => {
      app.listen(config.server.port, () => {
        console.log(
          `Server listening on port : ${process.env.APP_SERVER_PORT}`
        );
      });
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
      process.exit();
    });
}

startServer();
