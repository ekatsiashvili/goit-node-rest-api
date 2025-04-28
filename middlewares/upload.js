import multer from "multer";
import { uploadsDirPath } from "../constants/pathsConstants.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

export const upload = multer({ storage });
