async function connect(){
    if(global.connection && global.connection.state != 'disconnected')
      return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/controle_arborizacao");
    console.log("Conexão com SQL realizada com sucesso!");
    global.connection = connection;
    return connection;
}

async function getTrees(){
  const conn = await connect();
    const [result] = await conn.query('select * from arvore;');
    return result;
}

async function getPins(){
  const conn = await connect();
    const [result] = await conn.query('select latitude,longitude from arvore;');
    return result;
}

module.exports = {getTrees,getPins}