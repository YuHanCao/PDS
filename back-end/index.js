const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var http = require('http');
const app = express();
const db = require('./db');
const { OAuth2Client } = require("google-auth-library")

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

app.patch('/confirmarPoda/:idArvore', async (req, res) => {
    const {idArvore} = req.params;
    console.log(`patch /confirmarPoda/${idArvore}`);
    const solicitacao = await db.confirmarPoda(idArvore);
    res.send(solicitacao);
})   
app.post('/googleLogin', async (req, res) => {
    const client = new OAuth2Client(process.env.CLIENT_ID)

    console.log(client);

    const {token} = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload();

    const auth = await db.getByEmail(payload.email);
    console.log(auth)
    if(auth.length > 0){
       return res.status(200).json({
            message: "Login Realizado com Sucesso",
            user: auth,
            autenticado: true
        });  
    } else {
        return res.status(200).json({
            message: "Usuario náo cadastrado",
            user: false,
            autenticado: false
        });
    }
    
})

http.createServer(app).listen(3030, function () {
    console.log('Listening on port 3030!');
})

