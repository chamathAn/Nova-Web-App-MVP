// router.js
const express = require("express");
const router = express.Router();
const createNote = require("./controller");

router.post("/create-new-note", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

router.get("/get-all-notes", (req, res) => {
    setTimeout(() => {
      res.send({ res: "All G" });
    }, 4000);
  });
  
module.exports = { router };
