import Contact from "../db/models/Contact.js";

/**
 * Gets all contacts
 * @returns {Promise<object[]>}
 */
async function listContacts() {
  return await Contact.findAll();
}

/**
 * Gets contact by id
 * @param {string} contactId
 * @returns {Promise<object>} - Contact or null
 */
async function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

/**
 * Removes a contact by its id
 * @param {number} contactId
 * @returns removed contact or null if wasn't found
 */
async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
}

/**
 * Creates a new contact
 * @param {data} - new user fields
 * @returns newly created contact
 */
async function addContact(data) {
  return Contact.create(data);
}

/**
 * Updates a contact
 * @param {string} contactId
 * @param {object} data - contact fields to update
 * @returns updated contact
 */
async function updateContact(contactId, data) {
  const [count, updatedRows] = await Contact.update(data, {
    where: { id: contactId },
    returning: true,
  });
  if (!count) {
    return null;
  }
  const [updatedContact] = updatedRows;
  return updatedContact;
}

/**
 * Updates a contact
 * @param {string} contactId
 * @param {object} data - favorite field to update
 * @returns updated contact
 */
async function updateStatusContact(contactId, data) {
  const [count, updatedRows] = await Contact.update(data, {
    where: { id: contactId },
    returning: true,
  });
  if (!count) {
    return null;
  }
  const [updatedContact] = updatedRows;
  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
