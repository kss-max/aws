const express = require("express");
const router = express.Router();
const { registerForEvent } = require("../Controllers/registrationController");

router.post("/", registerForEvent);

module.exports = router;
