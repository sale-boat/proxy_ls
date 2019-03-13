require('newrelic')
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon')
const proxy = require('http-proxy-middleware')

const app = express();

app.use(cors());

app.use(compression());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/files', express.static(`${__dirname}/public`));


app.get('/:productid/:userid', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/:productid/:userid', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.use('/api/:productid/:userid', proxy({ target: 'http://localhost:3002' }));

app.get('*', (req, res) => {
  res.redirect('/51/2019');
})

app.listen(3000);