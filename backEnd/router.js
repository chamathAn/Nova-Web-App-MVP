const express = require("express");
const router = express.Router();
const { createNote, getNote } = require("./controller");
const asyncHandler = require("express-async-handler");

router.post("/create-new-note", asyncHandler(createNote));
router.get("/get-all-notes", asyncHandler(getNote));

module.exports = { router };
