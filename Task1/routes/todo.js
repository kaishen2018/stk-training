var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var sd = require('silly-datetime');
var db = require('../dataconnect.js');
db.connect();

/*GET home page. */
/**
 * get all user
 */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    db.query('select * from users', function (err, rows) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

/**
 * User Login
 */
router.post('/login', function (req, res) {
    var name = req.body.loginName;
    console.log("req.body.loginName: ", name);
    var pwd = req.body.loginPwd;
    console.log("req.body.loginPwd: ", pwd);

    var sql = 'select count(*) as num from users where fName=? and pwd=?';
    var sql_value = [name, pwd];
    db.query(sql, sql_value, function (err, rows) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

/**
 * Register a new user
 */
router.post('/register', function (req, res) {
    var name = req.body.registerName;
    var pwd = req.body.registerPwd;
    var pwd2 = req.body.registerPwd2;
    console.log("req.body: ", req.body);
    if (pwd == pwd2) {
        var time = sd.format(new Date(), 'YYYY-MM-DD');
        var sql = 'insert into users(fName,lName,fDate,lDate,pwd) values(?,?,?,?,?)';
        var sql_value = [name, name, time, time, pwd];
        db.query(sql, sql_value, function (err, rows) {
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
    } else {
        res.send('err');
    }


});

/**
 * Get user data
 */
router.get('/total', function (req, res, next) {
    db.query('select count(*) as total from users', function (err, rows) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

router.get('/nUser', function (req, res, next) {
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    db.query('select count(*) as nUser from users where fDate=?', [time], function (err, rows) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

router.get('/pUser', function (req, res, next) {
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    db.query('select count(*) as pUser from users where fDate<?', [time], function (err, rows) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

/**
 * add a new user
 */
router.post('/', function (req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    console.log("req.body: ", name);
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    console.log(time);
    var sql = 'insert into users(fName,lName,fDate,lDate,pwd) values(?,?,?,?,?)';
    var sql_value = [name, name, time, time, pwd];

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

module.exports = router;
