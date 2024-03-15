const express = require("express");
const router = express.Router();
const { createNote, getNote, createSummary } = require("./controller");
const asyncHandler = require("express-async-handler");

router.post("/create-new-note", asyncHandler(createNote));
router.get("/get-all-notes", asyncHandler(getNote));
router.post("/create-summary", asyncHandler(createSummary));

module.exports = { router };
