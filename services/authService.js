import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "node:path";
import fs from "node:fs/promises";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import checkUser from "../helpers/checkUser.js";
import { avatarsDirName, avatarsDirPath } from "../constants/pathsConstants.js";

export const registerUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  const avatarURL = gravatar.url(
    body.email,
    { s: "100", r: "x", d: "retro" },
    true
  );

  return User.create({ ...body, password: hashPassword, avatarURL });
};

export const loginUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });

  const isValidUser = await checkUser(user, body.password);

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

export const updateAvatar = async ({ file, userId }) => {
  if (!file) {
    throw HttpError(400, "No attached file");
  }

  if (!file.mimetype.includes("image") || file.size >= 1048576) {
    await fs.unlink(file.path);
    throw HttpError(400, "File should be an image file less than 1 MB");
  }

  const { path: temporaryName, originalname } = file;
  const uniqueOriginalFileName = `${userId}-${originalname}`;
  const fileName = path.join(avatarsDirPath, uniqueOriginalFileName);

  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return HttpError(500, "Avatar upload error");
  }

  const staticAvatarPath = `/${avatarsDirName}/${uniqueOriginalFileName}`;

  await User.update({ avatarURL: staticAvatarPath }, { where: { id: userId } });

  return staticAvatarPath;
};
