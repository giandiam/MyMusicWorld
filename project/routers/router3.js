const express = require('express');

const router = express.Router();

const db = require('../db/db');

/* Update MyAlbums */

router.post('/app/update/:row', async (req, res) => {
  let title = req.body.title[req.params.row - 1];
  let name = req.body.name[req.params.row - 1];
  let singer = req.body.singer[req.params.row - 1];
  let url = req.body.url[req.params.row - 1];

  if (title.length === 1 && name.length === 1) {
    title = req.body.title;
    name = req.body.name;
    singer = req.body.singer;
    url = req.body.url;
  }

  if (name === '') {
    res.redirect('/app');
  } else {
    const query1 = {
      text: 'UPDATE "albums" SET singer=$1, url=$2, name=$3 WHERE "song" = $4',
      values: [singer, url, name, title],
    };
    try {
      await db.query(query1);
      const query2 = {
        text: 'SELECT DISTINCT name FROM "albums" WHERE "user" = $1',
        values: req.session.user,
      };
      const query3 = {
        text: 'SELECT * FROM "albums" WHERE "user" = $1 and name = $2',
        values: [req.session.user, name],
      };
      const rows1 = await db.query(query2);
      const rows2 = await db.query(query3);
      res.render('app', {
        items1: rows1,
        items2: rows2,
        myalbums: true,
        myartists: false,
        mysongs: false,
        albumupdates: true,
      });
    } catch (err) { console.log(err.stack); }
  }
});

/* Update MyArtists */

router.post('/app/myartists/update/:row', async (req, res) => {
  let title = req.body.title[req.params.row - 1];
  let artist = req.body.artist[req.params.row - 1];
  let url = req.body.url[req.params.row - 1];
  if (title.length === 1 && artist.length === 1) {
    title = req.body.title;
    artist = req.body.artist;
    url = req.body.url;
  }
  if (artist === '') {
    res.redirect('/app/myartists');
  } else {
    const query1 = {
      text: 'UPDATE "artists" SET artist=$1, url=$2 WHERE "song" = $3',
      values: [artist, url, title],
    };
    try {
      await db.query(query1);
      const query2 = {
        text: 'SELECT DISTINCT artist FROM "artists" WHERE "user" = $1',
        values: req.session.user,
      };
      const query3 = {
        text: 'SELECT * FROM "artists" WHERE "user" = $1 and artist = $2',
        values: [req.session.user, artist],
      };
      const rows1 = await db.query(query2);
      const rows2 = await db.query(query3);
      res.render('app', {
        items1: rows1,
        items2: rows2,
        myalbums: false,
        myartists: true,
        mysongs: false,
        artistupdates: true,
      });
    } catch (err) { console.log(err.stack); }
  }
});

/* Update MySongs */

router.post('/app/mysongs/update/:row', async (req, res) => {
  const query1 = {
    text: 'UPDATE "mysongs" SET lyrics=$1 WHERE "title" = $2',
    values: [req.body.lyrics, req.body.title],
  };
  try {
    await db.query(query1);
    const query2 = {
      text: 'SELECT title FROM "mysongs" WHERE "user" = $1',
      values: req.session.user,
    };
    const query3 = {
      text: 'SELECT * FROM "mysongs" WHERE "user" = $1 and title = $2',
      values: [req.session.user, req.body.title],
    };
    const rows1 = await db.query(query2);
    const rows2 = await db.query(query3);
    res.render('app', {
      items1: rows1,
      items2: rows2,
      myalbums: false,
      myartists: false,
      mysongs: true,
      songsupdates: true,
    });
  } catch (err) { console.log(err.stack); }
});

module.exports = router;
