const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.listen(3000, () => console.log('Server running on port 3000'));
