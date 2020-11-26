const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const filePath = './subscribers.json';
const subscribersData = require(filePath);
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;

  const newMember = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  subscribersData.push(newMember);
  const pathToFile = path.join(__dirname, filePath);
  const jsonData = JSON.stringify(subscribersData, null, 4);
  console.log(jsonData);

  fs.writeFile(pathToFile, jsonData, (err) => {
    if (err) {
      res.sendFile(__dirname + '/failure.html');
    }

    res.sendFile(__dirname + '/success.html');
  });
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
