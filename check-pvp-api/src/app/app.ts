import express = require('express');
import BlizzardApi from '../blizzard-api/BlizzardApi';

require('dotenv').config();

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;

if (!BNET_ID || !BNET_SECRET) {
  throw new Error('Environment variables not set');
}

const api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });

const app: express.Application = express();

app.get(`/character/:id`, (req, res) => {
  const nameRealm = getNameAndRealm(req.params.id);
  if (!nameRealm) {
    res.status(400).send();
    return;
  }
  const { name, realm } = nameRealm;

  api.getCharacter(name, realm).then(response => {
    res.send(response.data);
  });
});

app.get(`/character/:charId/pvp-summary`, (req, res, next) => {
  const nameRealm = getNameAndRealm(req.params.charId);
  if (!nameRealm) {
    res.status(400).send();
    return;
  }
  const { name, realm } = nameRealm;

  api.getPvpSummary(name, realm).then(response => {
    res.send(response.data);
  }).catch(next);
});

app.get(`/character/:charId/statistics`, (req, res, next) => {
  const nameRealm = getNameAndRealm(req.params.charId);
  if (!nameRealm) {
    res.status(400).send();
    return;
  }
  const { name, realm } = nameRealm;

  api.getStatistics(name, realm).then(response => {
    res.send(response.data);
  }).catch(next);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// ================= Utilities =================
function getNameAndRealm(raw: string): { name: string, realm: string } | null {
  const split = raw.split('-');
  if (split.length !== 2) {
    return null;
  }
  const name = split[0];
  const realm = split[1];

  return {
    name,
    realm
  };
}
