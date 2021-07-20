const express = require('express');

const router = express.Router();

const db = require('../db/db');

/* Insert MyAlbums */

router.post('/app/insert', async (req, res) => {
  const query = {
    text: 'SELECT * FROM "albums" WHERE "song" = $1',
    values: req.query.title,
  };
  let error = '';
  let successs = '';
  try {
    const title = await db.query(query);
    if (title.length === 0 || req.query.title === '') {
      if (req.query.album !== '' && req.query.title !== '') {
        const query1 = {
          text: 'INSERT INTO "albums" VALUES ($1, $2, $3, $4, $5)',
          values: [req.query.title, req.query.singer,
            req.session.user, req.query.url, req.query.album],
        };
        await db.query(query1);
        successs = 'Successfully inserted';
      } else { error = 'Title and Album fields cannot be empty'; }
    } else { error = 'Title already exists'; }
  } catch (err) { console.log(err.stack); }
  const query2 = {
    text: 'SELECT DISTINCT name FROM "albums" WHERE "user" = $1',
    values: req.session.user,
  };
  const rows1 = await db.query(query2);
  res.render('app', {
    items1: rows1,
    myalbums: true,
    myartists: false,
    mysongs: false,
    albumupdates: true,
    invalid: error,
    success: successs,
  });
});

/* Insert MyArtists */

router.post('/app/myartists/insert', async (req, res) => {
  const query = {
    text: 'SELECT * FROM "artists" WHERE "song" = $1',
    values: req.query.title,
  };
  let error = '';
  let successs = '';
  try {
    const title = await db.query(query);
    if (title.length === 0 || req.query.title === '') {
      if (req.query.artist !== '' && req.query.title !== '') {
        const query1 = {
          text: 'INSERT INTO "artists" VALUES ($1, $2, $3, $4)',
          values: [req.query.artist, req.query.title,
            req.query.url, req.session.user],
        };
        await db.query(query1);
        successs = 'Successfully inserted';
      } else { error = 'Title and Artist fields cannot be empty'; }
    } else { error = 'Title already exists'; }
  } catch (err) { console.log(err.stack); }
  const query2 = {
    text: 'SELECT DISTINCT artist FROM "artists" WHERE "user" = $1',
    values: req.session.user,
  };
  const rows1 = await db.query(query2);
  res.render('app', {
    items1: rows1,
    myalbums: false,
    myartists: true,
    mysongs: false,
    artistupdates: true,
    invalid: error,
    success: successs,
  });
});

/* Insert MySongs */

router.post('/app/mysongs/insert', async (req, res) => {
  const query = {
    text: 'SELECT * FROM "mysongs" WHERE "title" = $1',
    values: req.query.title,
  };
  let error = '';
  let successs = '';
  try {
    const title = await db.query(query);
    if (title.length === 0 || req.query.title === '') {
      if (req.query.title !== '') {
        const query1 = {
          text: 'INSERT INTO "mysongs" VALUES ($1, $2, $3)',
          values: [req.query.title, req.query.lyrics, req.session.user],
        };
        await db.query(query1);
        successs = 'Successfully inserted';
      } else { error = 'Title field cannot be empty'; }
    } else { error = 'Title already exists'; }
  } catch (err) { console.log(err.stack); }
  const query2 = {
    text: 'SELECT title FROM "mysongs" WHERE "user" = $1',
    values: req.session.user,
  };
  const rows1 = await db.query(query2);
  res.render('app', {
    items1: rows1,
    myalbums: false,
    myartists: false,
    mysongs: true,
    songsupdates: true,
    invalid: error,
    success: successs,
  });
});

module.exports = router;
