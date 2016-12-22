var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var sd = require('silly-datetime');
var db = require('../dataconnect.js');
db.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    db.query('select * from users', function (err, rows, fields) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

router.post('/', function (req, res) {
    var name = req.body.text;
    console.log("req.body: ", name);
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    console.log(time);
    var sql = 'insert into users(fname,lName,fDate,lDate) values(?,?,?,?)';
    var sql_value = [name, name, time, time];

    /*var sql = "insert into users(fname,lName,fDate,lDate) value(?,?,?,?)";
     var inserts = [name,name,time,time];
     sql = mysql.format(sql, inserts);
     console.log("sql: ",sql);*/

    db.query(sql, sql_value, function (err, result) {
        if (err) {
            console.log(err.stack);
        }
        db.query('select * from users', function (err, rows, fields) {
            if (err) {
                console.log(err.stack);
            }
            res.send(rows);
        });
    });
});
module.exports = router;
