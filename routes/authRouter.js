import { Router } from "express";

import validateBody from "../decorators/validateBody.js";
import {
  emailUserSchema,
  registerLoginUserSchema,
  updateSubscriptionUserSchema,
} from "../schemas/authSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as c from "../controllers/authControllers.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerLoginUserSchema),
  ctrlWrapper(c.registerUser)
);

authRouter.get("/verify/:verificationToken", ctrlWrapper(c.verifyUser));

authRouter.post(
  "/verify",
  validateBody(emailUserSchema),
  ctrlWrapper(c.resendVerificationMail)
);

authRouter.post(
  "/login",
  validateBody(registerLoginUserSchema),
  ctrlWrapper(c.loginUser)
);

authRouter.post("/logout", auth, ctrlWrapper(c.logoutUser));

authRouter.get("/current", auth, ctrlWrapper(c.getCurrentUser));

authRouter.patch(
  "/subscription",
  auth,
  validateBody(updateSubscriptionUserSchema),
  ctrlWrapper(c.updateSubscriptionUser)
);

authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(c.updateAvatar)
);

export default authRouter;
