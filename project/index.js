const express = require('express'); /* assign 'express' module into express */

const app = express(); /** assign into app the express() function that exported
* by express module above */

app.set('view engine', 'ejs'); /**  */

app.get('/', (req, res) => {
  res.render('index', { text: 'Hi' });
});

app.listen(3000);
