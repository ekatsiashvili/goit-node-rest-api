import express from "express";
import * as c from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import auth from "../middlewares/auth.js";

const contactsRouter = express.Router();

contactsRouter.use(auth);

contactsRouter.get("/", ctrlWrapper(c.getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(c.getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(c.deleteContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrapper(c.createContact)
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  ctrlWrapper(c.updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusContactSchema),
  ctrlWrapper(c.updateStatusContact)
);

export default contactsRouter;
