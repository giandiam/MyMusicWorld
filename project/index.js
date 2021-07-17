const express = require('express'); /** assign 'express'
module into express */
const app = express(); /** assign into app the express() function that exported
by express module above */
const session = require('express-session');
const bodyparser = require('body-parser');
const router1 = require('./routers/router1');
const router2 = require('./routers/router2');
const router3 = require('./routers/router3');

app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); /**  */

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

/* route for serving frontend files */

app.use('/', router1);
app.use('/', router2);
app.use('/', router3);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('sign-up');
});

app.get('/app', (req, res) => {
  res.render('app');
});

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000);
