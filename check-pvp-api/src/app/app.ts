import express = require('express');
import BlizzardApi from '../blizzard-api/BlizzardApi';

require('dotenv').config();

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;

if (!BNET_ID || !BNET_SECRET) {
  throw new Error('Environment variables not set');
}

const api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET, region: 'eu' });

const app: express.Application = express();

app.get(`/character/:id`, (req, res) => {
  const split = req.params.id.split('-');
  if (split.length !== 2) {
    res.status(400).send();
    return;
  }
  const name = split[0];
  const realm = split[1];
  api.getCharacter(name, realm).then(response => {
    res.send(response.data);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
