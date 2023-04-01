"use strict";

const { users: usersModel } = require("../../models");

async function login({ email }) {
  try {
    const user = await usersModel.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUser(payload) {
  try {
    const createdUser = await usersModel.create(payload);
    return createdUser;
  } catch (error) {
    throw new Error(500, error.message);
  }
}

async function findUserByParams(key, params) {
  try {
    const existedUser = usersModel.findOne({ where: { [key]: params } });
    return existedUser;
  } catch (error) {
    throw new Error(500, error.message);
  }
}

const authService = {
  login,
  findUserByParams,
  createUser,
};

module.exports = authService;
