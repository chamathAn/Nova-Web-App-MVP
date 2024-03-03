const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const { router } = require('./router');
  
  // middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
