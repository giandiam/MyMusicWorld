const express = require('express');

const router = express.Router();

const db = require('../db/db');

/* Delete MyAlbums */

router.post('/app/delete', async (req, res) => {
  const query = {
    text: 'DELETE FROM "albums" WHERE "song" = $1',
    values: req.query.title,
  };
  await db.query(query);
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
    success: 'Successfully deleted',
  });
});

/* Delete MyArtists */

router.post('/app/myartists/delete', async (req, res) => {
  const query = {
    text: 'DELETE FROM "artists" WHERE "song" = $1',
    values: req.query.title,
  };
  await db.query(query);
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
    success: 'Successfully deleted',
  });
});

/* Delete MySongs */

router.post('/app/mysongs/delete', async (req, res) => {
  const query = {
    text: 'DELETE FROM "mysongs" WHERE "title" = $1',
    values: req.query.title,
  };
  await db.query(query);
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
    success: 'Successfully deleted',
  });
});

module.exports = router;
