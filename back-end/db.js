async function connect(){
    if(global.connection && global.connection.state != 'disconnected')
      return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/controle_arborizacao");
    console.log("Conexão com SQL realizada com sucesso!");
    global.connection = connection;
    return connection;
}

async function getByEmail(email){
  const conn = await connect();
  const [result] = await conn.query(`select * from usuario where email = '${email}'`);
  return result;
}

async function getTrees(){
  const conn = await connect();
  const [result] = await conn.query('select * from arvore;');
  return result;
}

async function getPins(){
  const conn = await connect();
  const [result] = await conn.query('select id, latitude, longitude from arvore;');
  return result;
}

async function solicitarPoda(idArvore){
  const conn = await connect();
  const [result] = await conn.query(`update arvore set podaSolicitada = 1 where id = ${idArvore}`);
  return result;
}

module.exports = {getTrees,getPins, solicitarPoda, getByEmail}