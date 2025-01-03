const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc Get all contacts
// @route GET /contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.json(contacts);
});

// @desc Get a contact
// @route GET /contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.json(contact);
});

// @desc Create new contact
// @route POST /contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(401);
    throw new Error("All fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Check permissions of user
  if (contact.user_id.toString() === req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

// @desc Delete contact
// @route DELETE /contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Check permissions of user
  if (contact.user_id.toString() === req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete this contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};
