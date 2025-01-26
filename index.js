// index.js
const express = require('express');
const router = require('./app/routes/index');

const app = express();

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
