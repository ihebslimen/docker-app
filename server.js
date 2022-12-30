const express = require('express')
var pjson = require('./package.json');
const app = express()
const path = require('path')
const port = 3000
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', './views');
app.set('view engine', 'ejs ');



var data = {}
var con = mysql.createConnection({
  host: "localhost",
  user: "iheb",
  password: "polatmaster1",
  database: "testdb"
});
/*
* Default route for the web app
*/

app.get("/renderHTML",(req,res) => {
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    data[0] = result;
    data[1] = pjson.version;
    res.render('index.ejs',{data : data})
  })
});

app.post('/add', function(req, res) {
  var name = req.body.full_name;
  var email = req.body.email_address;
  var city = req.body.city;
  var country = req.body.country;
  var sql =`INSERT INTO users (full_name, email_address,city,country) VALUES ("${name}", "${email}", "${city}", "${country}")`;
 
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  res.redirect('/renderHTML');
  });

  });

app.use("/update",(req,res) => {
  console.log(req.body.full_name_update)

  var id = req.body.id;
  var name = req.body.full_name_update;
  var email = req.body.email_address_update;
  var city = req.body.city_update;
  var country = req.body.country_update;
sql = `UPDATE users SET full_name = "${name}" , email_address = "${email}",city = "${city}",country = "${country}" WHERE id = "${id}"`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.redirect('/renderHTML');
  });
});



/*
* Route to render HTML Page
*/
app.get('/renderHTML', (req, res) => {
 
    res.render('index.ejs',{data : data[0]})
    
})

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
