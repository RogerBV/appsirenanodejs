var mysql = require("mysql");

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234567',
    database:'dbpractice'
});

con.connect();

module.exports = con;


