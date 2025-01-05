const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const contactUsController = require("../controllers/contactUs");

const router = express.Router();

router.get("/contact-us", contactUsController.getContactUs);

router.get("/contacts", contactUsController.getContacts);

router.get("/contacts/:contactId", contactUsController.getContact);

router.post("/contact-us", contactUsController.postContactUs);

router.get("/edit-contact/:contactId", contactUsController.getEditContact);
router.post("/edit-contact", contactUsController.postEditContact);

router.post("/delete-contact", contactUsController.postDeleteContact);

module.exports = router;
