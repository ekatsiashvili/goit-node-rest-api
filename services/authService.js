import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import checkUser from "../helpers/checkUser.js";

export const registerUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(body.password);

  return User.create({ ...body, password: hashPassword });
};

export const loginUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });

  const isValidUser = checkUser(user, body.password);

  if (!isValidUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return await user.update({ token }, { returning: true });
};

export const logoutUser = async (userId) => {
  await User.update({ token: null }, { where: { id: userId } });
};

export const updateSubscriptionUser = async ({ userId, body }) => {
  const [_, [userData]] = await User.update(body, {
    where: { id: userId },
    returning: true,
  });
  return userData;
};
