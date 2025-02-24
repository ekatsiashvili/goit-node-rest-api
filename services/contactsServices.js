import path from "node:path";
import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";
import HttpError from "../helpers/HttpError.js";

const contactsPath = path.resolve("db", "contacts.json");

/**
 * Gets all contacts
 * @returns {Promise<object[]>}
 */
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw HttpError(500, "Error reading contacts file");
  }
}

/**
 * Gets contact by id
 * @param {string} contactId
 * @returns {Promise<object>} - Contact or null
 */
async function getContactById(contactId) {
  const allContacts = await listContacts();
  return allContacts.find((contact) => contact.id === contactId) || null;
}

/**
 * Removes a contact by its id
 * @param {string} contactId
 * @returns removed contact or null if wasn't found
 */
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const [removedContact] = allContacts.splice(contactIndex, 1);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return removedContact;
  } catch (error) {
    throw HttpError(500, "Error writing contacts file");
  }
}

/**
 * Creates a new contact
 * @param {data} - new user fields (name, email, phone)
 * @returns newly created contact
 */
async function addContact(data) {
  const allContacts = await listContacts();
  const newContact = { id: uuid(), ...data };
  allContacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    throw HttpError(500, "Error writing contacts file");
  }
}

/**
 * Updates a contact
 * @param {string} contactId
 * @param {object} data - contact fields to update (name, email, phone)
 * @returns updated contact
 */
async function updateContact(contactId, data) {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const updatedContact = { ...allContacts[contactIndex], ...data };
  allContacts[contactIndex] = updatedContact;

  try {
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return updatedContact;
  } catch (error) {
    throw HttpError(500, "Error writing contacts file");
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
