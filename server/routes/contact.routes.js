// express server specific imports
const router = require("express").Router({ mergeParams: true });

// import validation middleware
const validate = require("../middlewares/validate.js");

// import for contact form routes controller
const { ContactController } = require("../controllers/contact.controller.js");

// add validator to the route callback
router.post("/", validate, (req, res) => {
  const controller = new ContactController(req, res);
  controller.sendContactForm();
});

module.exports = router;