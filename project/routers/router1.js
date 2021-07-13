const express = require('express');

const router = express.Router();

const db = require('../db/db');

const query = {
  text: 'SELECT * FROM "Users" WHERE "email" = $1',
  values: ['johndiam@hotmail.gr'],
};

db
  .query(query)
  .then((res) => {
    router.post('/login', (req, resp) => {
      if (req.body.email === res[0].email && req.body.password === res[0].password) {
        resp.redirect('/app');
      } else { resp.end('Invalid Username'); }
    });
  })
  .catch((e) => console.error(e.stack));

module.exports = router;
