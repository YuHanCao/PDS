const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var http = require('http');
const app = express();
const db = require('./db');
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.use(cors());
app.use(bodyParser.json());

app.get('/arvores', async (req, res) => {
    console.log('get /arvores');
    const arvores = await db.getTrees();
    res.send(arvores);
});

app.get('/pins',async (req, res) => {
    console.log('get /pins');
    const arvores = await db.getPins();
    res.send(arvores);
});

http.createServer(app).listen(3030, function () {
    console.log('Listening on port 3030!');
})

