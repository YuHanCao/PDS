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

app.get('/arvores', async (_, res) => {
    console.log('get /arvores');
    const arvores = await db.getTrees();
    res.send(arvores);
});

app.get('/pins',async (_, res) => {
    console.log('get /pins');
    const arvores = await db.getPins();
    res.send(arvores);
});

app.patch('/solicitarPoda/:idArvore', async (req, res) => {
    const {idArvore} = req.params;
    console.log(`patch /solicitarPoda/${idArvore}`);
    const solicitacao = await db.solicitarPoda(idArvore);
    res.send(solicitacao);
})

http.createServer(app).listen(3030, function () {
    console.log('Listening on port 3030!');
})

