const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});