import express from "express";

import validateBody from "../decorators/validateBody.js";
import {
  registerLoginUserSchema,
  updateSubscriptionUserSchema,
} from "../schemas/authSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as c from "../controllers/authControllers.js";
import auth from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerLoginUserSchema),
  ctrlWrapper(c.registerUser)
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

export default authRouter;
