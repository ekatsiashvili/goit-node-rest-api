import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const contact = await contactsService.updateContact(req.params.id, req.body);
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};
