const express = require('express');
const app = express();
const session = require('express-session');
const bodyparser = require('body-parser');
const router1 = require('./routers/router1');
const router2 = require('./routers/router2');
const router3 = require('./routers/router3');
const router4 = require('./routers/router4');
const router5 = require('./routers/router5');

app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use('/', router1);
app.use('/', router2);
app.use('/', router3);
app.use('/', router4);
app.use('/', router5);

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0');
  next();
});

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/app');
  }
  res.render('index');
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/app');
  }
  res.render('index');
});

app.get('/signup', (req, res) => {
  if (req.session.user) {
    res.redirect('/app');
  }
  res.render('sign-up');
});

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000);
