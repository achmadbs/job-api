"use strict";

const { authService } = require("../services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");

const login = async (req, res, next) => {
  const response = {};
  try {
    const user = await authService.login(req.body);

    if (!user) {
      throw new CustomError(404, "Email tidak ditemukan");
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      throw new CustomError(400, "Password salah");
    } else {
      (response.id = user.id),
        (response.accessToken = jwt.sign(
          {
            id: user.id,
          },
          config.jwtSecretKey,
          {
            expiresIn: "2d",
          }
        ));
      response.profile = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
    }

    return res.json({
      data: response,
      message: "Successfully logged in",
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  const isUserExist = await authService.findUserByParams("email", email);
  if (isUserExist) {
    return res
      .status(400)
      .json({ status: 400, message: "User already exists" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    const createdUser = await authService.createUser({
      email,
      username,
      password: hashedPwd,
    });
    return res.json({
      data: createdUser,
      message: "Successfully created user",
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  login,
  createUser,
};

module.exports = authController;
