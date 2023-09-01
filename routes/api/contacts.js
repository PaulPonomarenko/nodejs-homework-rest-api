const express = require("express");
const isValidId = require("../../middlewares/isValidId");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", ctrl.postContact);

router.put("/:id", isValidId, ctrl.updateContactById);

router.patch("/:id/favorite", isValidId, ctrl.updateStatusContact);

router.delete("/:id", isValidId, ctrl.deleteContact);

module.exports = router;
