import multer from "multer";
import { uploadsDirPath } from "../constants/pathsConstants.js";
import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes("image")) {
    return cb(HttpError(400, "File should be an image"));
  }

  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
