const mysql = require ("mysql2");

function conectar(){
    const conectar = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "ErikaFerreira",
        database: "planning"
    })
    return conectar
}
module.exports = {conectar};

