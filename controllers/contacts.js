const Contact = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  updateSchema,
  postSchema,
  updateFavoriteSchema,
} = require("../Schemas/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-creatAt -updatAt", {
    skip,
    limit,
  }).populate("owner", "subscription email");
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const postContact = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContactById = async (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (Object.keys(req.body).length === 0 || error) {
    throw HttpError(400, "missing fields");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (Object.keys(req.body).length === 0 || error) {
    throw HttpError(400, "missing fields");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Contact not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContact: ctrlWrapper(deleteContact),
};
