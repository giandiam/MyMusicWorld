const express = require('express'); /* assign 'express' module into express */

const app = express(); /** assign into app the express() function that exported
* by express module above */

const bodyparser = require('body-parser');

const router = require('./routers/router1');

app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); /**  */

/* route for serving frontend files */

app.use('/', router);

app.get('/', (req, res) => {
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
