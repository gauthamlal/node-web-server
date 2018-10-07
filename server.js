const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

/*hbs.registerHelper('repeat5Times', (text) => {
  var retText = '';
  for (var i = 0; i < 5; i++) {
    retText += text;
  }
  return retText;
});

hbs.registerHelper('repeat', (n, text) => {
  var retText = '';
  for (var i = 0; i < n; i++) {
    retText += text.fn();
  }
  return retText;
});*/

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    name: 'Gautham',
    likes: [
      'Comics',
      'Pro Wrestling'
    ],
    pageTitle: 'Home Page',
    message: 'Welcome to the website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad server request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
