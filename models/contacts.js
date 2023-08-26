const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contacts = data.find((contact) => contact.id === id);
  return contacts || null;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const [contact] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    ...body,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  data[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
