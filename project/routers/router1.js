const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const db = require('../db/db');

/* Sign in */

router.post('/login', async (req, res) => {
  const query = {
    text: 'SELECT * FROM "users" WHERE "email" = $1',
    values: req.body.email,
  };
  const result = await db.query(query);
  const validPass = await bcrypt.compare(req.body.password, result[0].password);
  if (req.body.email === result[0].email && validPass) {
    req.session.user = req.body.email;
    res.redirect('/app');
  } else {
    res.render('index', { invalid: 'Invalid email or password' });
  }
});

/* Sign up */

router.post('/signup', async (req, res) => {
  const query1 = {
    text: 'SELECT * FROM "users" WHERE "email" = $1',
    values: req.body.email,
  };

  const rows = await db.query(query1);

  if (rows[0]) {
    res.render('sign-up', { exist: 'User already exists' });
  } else {
    const hash = await bcrypt.hash(req.body.pwd, 10);
    const query2 = {
      text: 'INSERT INTO "users" VALUES($1, $2, $3)',
      values: [req.body.email, req.body.uname, hash],
    };
    await db.query(query2);
    req.session.user = req.body.email;
    res.redirect('/app');
  }
});

/* Sign out */

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
