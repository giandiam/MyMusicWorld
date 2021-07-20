const express = require('express');

const router = express.Router();

const db = require('../db/db');

router.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0');
  next();
});

/* MyAlbums */

router.get('/app', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/');
  }
  const query1 = {
    text: 'SELECT DISTINCT name FROM "albums" WHERE "user" = $1',
    values: req.session.user,
  };
  try {
    const rows1 = await db.query(query1);
    res.render('app', {
      items1: rows1, myalbums: true, myartists: false, mysongs: false,
    });
  } catch (err) { console.log(err.stack); }
});

router.post('/app', async (req, res) => {
  const query1 = {
    text: 'SELECT DISTINCT name FROM "albums" WHERE "user" = $1',
    values: req.session.user,
  };
  const query2 = {
    text: 'SELECT * FROM "albums" WHERE "user" = $1 and name = $2',
    values: [req.session.user, req.body.selectpicker],
  };
  try {
    const rows1 = await db.query(query1);
    const rows2 = await db.query(query2);
    res.render('app', {
      items1: rows1, items2: rows2, myalbums: true, myartists: false, mysongs: false,
    });
  } catch (err) { console.log(err.stack); }
});

/* MyArtists */

router.get('/app/myartists', async (req, res) => {
  const query1 = {
    text: 'SELECT DISTINCT artist FROM "artists" WHERE "user" = $1',
    values: req.session.user,
  };
  try {
    const rows1 = await db.query(query1);
    res.render('app', {
      items1: rows1, myartists: true, myalbums: false, mysongs: false,
    });
  } catch (err) { console.log(err.stack); }
});

router.post('/app/myartists', async (req, res) => {
  const query1 = {
    text: 'SELECT DISTINCT artist FROM "artists" WHERE "user" = $1',
    values: req.session.user,
  };
  const query2 = {
    text: 'SELECT * FROM "artists" WHERE "user" = $1 and artist = $2',
    values: [req.session.user, req.body.selectpicker],
  };
  try {
    const rows1 = await db.query(query1);
    const rows2 = await db.query(query2);
    res.render('app', {
      items1: rows1, items2: rows2, myalbums: false, myartists: true, mysongs: false,
    });
  } catch (err) { console.log(err.stack); }
});

/* MySongs */

router.get('/app/mysongs', async (req, res) => {
  const query1 = {
    text: 'SELECT DISTINCT title FROM "mysongs" WHERE "user" = $1',
    values: req.session.user,
  };
  try {
    const rows1 = await db.query(query1);
    res.render('app', {
      items1: rows1, myartists: false, myalbums: false, mysongs: true,
    });
  } catch (err) { console.log(err.stack); }
});

router.post('/app/mysongs', async (req, res) => {
  const query1 = {
    text: 'SELECT DISTINCT title FROM "mysongs" WHERE "user" = $1',
    values: req.session.user,
  };
  const query2 = {
    text: 'SELECT * FROM "mysongs" WHERE "user" = $1 and title = $2',
    values: [req.session.user, req.body.selectpicker],
  };
  try {
    const rows1 = await db.query(query1);
    const rows2 = await db.query(query2);
    res.render('app', {
      items1: rows1, items2: rows2, myalbums: false, myartists: false, mysongs: true,
    });
  } catch (err) { console.log(err.stack); }
});

module.exports = router;
