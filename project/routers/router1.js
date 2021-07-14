const express = require('express');

const router = express.Router();

const db = require('../db/db');

router.post('/login', (req, resp) => {
  const query = {
    text: 'SELECT * FROM "Users" WHERE "email" = $1',
    values: req.body.email,
  };

  db
    .query(query)
    .then((res) => {
      if (req.body.email === res[0].email && req.body.password === res[0].password) {
        req.session.user = req.body.email;
        resp.render('app');
      } else { resp.render('index', { invalid: 'Invalid email or password' }); }
    })
    .catch((e) => console.error(e.stack));
});

router.post('/signup', async (req, resp) => {
  const query1 = {
    text: 'SELECT * FROM "Users" WHERE "email" = $1',
    values: req.body.email,
  };

  const rows = await db.query(query1);

  if (rows[0]) {
    resp.render('sign-up', { exist: 'User already exists' });
  } else {
    const query2 = {
      text: 'INSERT INTO "Users" VALUES($1, $2, $3)',
      values: [req.body.email, req.body.uname, req.body.pwd],
    };
    await db.query(query2);
    resp.redirect('/app');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('Error');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
