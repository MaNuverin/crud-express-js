const mysql = require('mysql');

const database = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "nuverin"
})
database.connect(() => {
    console.log('Database Telah Terhubung')
});
module.exports = database;

