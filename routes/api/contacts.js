const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.postContact);

router.put("/:id", ctrl.updateContactById);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
