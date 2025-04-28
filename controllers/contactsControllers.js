import HttpError from "../helpers/HttpError.js";
import * as s from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const {
    user: { id: userId },
    query,
  } = req;

  const contacts = await s.listContacts({ userId, query });

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const {
    params: { id: contactId },
    user: { id: userId },
  } = req;

  const contact = await s.getContactById({ contactId, userId });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const {
    params: { id: contactId },
    user: { id: userId },
  } = req;

  const contact = await s.deleteContact({ contactId, userId });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const {
    body,
    user: { id: userId },
  } = req;

  const contact = await s.createContact({ body, userId });

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const {
    params: { id: contactId },
    body,
    user: { id: userId },
  } = req;

  const contact = await s.updateContact({ contactId, body, userId });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const updateStatusContact = async (req, res) => {
  const {
    params: { id: contactId },
    body,
    user: { id: userId },
  } = req;

  const contact = await s.updateStatusContact({ contactId, body, userId });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};
