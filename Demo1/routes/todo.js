var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var sd = require('silly-datetime');
var db = require('../dataconnect.js');
db.connect();

/* GET home page. */
<<<<<<< HEAD

/**
 * get all user
 */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    db.query('select * from users', function (err, rows) {
=======
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    db.query('select * from users', function (err, rows, fields) {
>>>>>>> 8a01663a083a25b2f3cbcc3f9a7ad4788338b06e
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

<<<<<<< HEAD
/**
 * add a new user
 */
router.post('/', function (req, res) {
    var name = req.body.name;
=======
router.post('/', function (req, res) {
    var name = req.body.text;
>>>>>>> 8a01663a083a25b2f3cbcc3f9a7ad4788338b06e
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
<<<<<<< HEAD

/**
 * get user data by uid
 */
router.get('/:uid', function (req, res) {
    var id = req.params.uid;
    db.query('select * from users where uid=?', [id], function (err, rows, fields) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

/**
 * update a user data by uid
 */
router.put('/', function (req, res) {
    var id = req.body.uid;
    console.log(id);
    var fName = req.body.fName;
    var lName = req.body.lName;
    var fDate = req.body.fDate;
    console.log("req.body: ", req.body.uid);
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    console.log(time);
    var sql = 'update users set fname=?,lName=?,fDate=?,lDate=? where uid=?';
    var sql_value = [fName, lName, fDate, time, id];

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

/**
 * delete a user by uid
 */
router.delete('/:uid', function (req, res) {
    var id = req.params.uid;
    console.log("uid:", id);
    db.query('delete from users where uid=?', [id], function (err, rows, fields) {
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

=======
>>>>>>> 8a01663a083a25b2f3cbcc3f9a7ad4788338b06e
module.exports = router;
