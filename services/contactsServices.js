import Contact from "../db/models/Contact.js";

/**
 * Gets contacts list for a particular user
 * @param userId  - id of the user that makes the API call
 * @param query   - (optional) query object parameters (e.g. { limit, page, favorite })
 * @returns       - list of contacts
 */
export async function listContacts({ userId, query }) {
  const { favorite, limit = 100, page = 1 } = query;
  const contactsLimit = Number(limit) > 0 ? Number(limit) : 100;
  const contactsPage = Number(page) > 1 ? Number(page) : 1;
  const offset = (contactsPage - 1) * contactsLimit;

  const whereClause = { owner: userId };

  if (favorite !== undefined) {
    whereClause.favorite = favorite;
  }

  return await Contact.findAll({
    where: whereClause,
    limit: contactsLimit,
    offset,
    order: [["id", "ASC"]],
  });
}

/**
 * Gets a particular contact by id for a particular user
 * @param userId    - id of the user that makes the API call
 * @param contactId - id of the contact needs to be returned
 * @returns         - contact
 */
export async function getContactById({ contactId, userId }) {
  return Contact.findOne({ where: { id: contactId, owner: userId } });
}

/**
 * Deletes a particular contact by id for a particular user
 * @param contactId - id of the contact that needs to be deleted
 * @returns         - deleted contact
 */
export async function deleteContact({ contactId, userId }) {
  const contact = await getContactById({ contactId, userId });

  if (!contact) {
    return null;
  }

  await contact.destroy();

  return contact;
}

/**
 * Creates a new contact for a particular user
 * @param userId - id of the user that makes the API call
 * @param body   - body of the request to create a new contact (e.g. { name, email, phone })
 * @returns      - created contact
 */
export async function createContact({ body, userId }) {
  return Contact.create({ ...body, owner: userId });
}

/**
 * Updates a particular contact by id for a particular user
 * @param userId    - id of the user that makes the API call
 * @param contactId - id of the contact that needs to be updated
 * @param body      - body of the request to update the contact fields
 * @returns         - updated contact
 */
export async function updateContact({ contactId, body, userId }) {
  const [count, updatedRows] = await Contact.update(body, {
    where: { id: contactId, owner: userId },
    returning: true,
  });
  if (!count) {
    return null;
  }

  const [updatedContact] = updatedRows;

  return updatedContact;
}

/**
 * Sets "favorite" status' mark for a particular contact by id for a particular user
 * @param userId    - id of the user that makes the API call
 * @param contactId - id of the contact that needs to be updated
 * @param body      - body of the request to update the contact fields
 * @returns         - updated contact
 */
export async function updateStatusContact({ contactId, body, userId }) {
  const [count, updatedRows] = await Contact.update(body, {
    where: { id: contactId, owner: userId },
    returning: true,
  });

  if (!count) {
    return null;
  }

  const [updatedContact] = updatedRows;

  return updatedContact;
}
