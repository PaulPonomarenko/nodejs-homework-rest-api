const express = require("express");
const isValidId = require("../../middlewares/isValidId");
const ctrl = require("../../controllers/contacts");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.postContact);

router.put("/:id", authenticate, isValidId, ctrl.updateContactById);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  ctrl.updateStatusContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
