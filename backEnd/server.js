// imports for server setup

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})