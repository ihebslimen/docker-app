var mysql = require('mysql');





var con = mysql.createConnection({
    host: "localhost",
    user: "iheb",
    password: "polatmaster1",
    database: "testdb"
  });

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");

});
