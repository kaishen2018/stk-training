var express = require('express');
var router = express.Router();
var sd = require('silly-datetime');
var time = sd.format(new Date(), 'YYYY-MM-DD');//获取当前日期
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/dbConfig');//配置模块
var userSQL = require('../db/UserSQL');
//连接数据库
var connection = mysql.createConnection(dbConfig.mysql);
connection.connect();
/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
/* Get data in the database */
router.get('/', function (req, res, next) {
    //使用render方法，将message变量传入index模板，渲染成HTML网页。
    //res.render('index', {title: 'Express'});
    connection.query(userSQL.queryAll, function (err, rows, fields) {
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });
});

/*get  user number*/
router.get('/',function(req,res){

    connection.query(userSQL.countall,function(err,rows,fields){
        if (err) {
            console.log(err.stack);
        }
        res.send(rows);
    });

});

/*insert users*/
router.post('/', function (req, res) {
    var name = req.body.text;
    console.log("req.body: ", name);
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    console.log(time);
    connection.query(userSQL.insert, [name,name,time,time], function (err, result) {
        if (err) {
            console.log(err.stack);
        }
        connection.query(userSQL.queryAll, function (err, rows, fields) {
            if (err) {
                console.log(err.stack);
            }
            res.send(rows);
        });
    });
});

/*delete users*/
router.delete('/:uid', function (req, res) {
    var uid = req.params.uid;//获取控制器传过来的对象
    console.log("req.params: ", uid);
    connection.query(userSQL.delete, [uid], function (err, result) {
        if (err) {
            console.log(err.stack);
        }
        connection.query(userSQL.queryAll, function (err, rows, fields) {
            if (err) {
                console.log(err.stack);
            }
            res.send(rows);

        });
    });
});

/*edit users*/
router.put('/:uid', function (req, res) {
    var uid = req.params.uid;
    var name=req.body.name;
    var createname=req.body.createname;
    var date=req.body.date;
    var updates=sd.format(new Date(), 'YYYY-MM-DD');
    console.log("req.body: ", uid,name,createname,date,updates);
    connection.query(userSQL.update, [name,createname,date,updates,uid], function (err, result) {
        if (err) {
            console.log(err.stack);
        }
        connection.query(userSQL.queryAll, function (err, rows, fields) {
            if (err) {
                console.log(err.stack);
            }
            res.send(rows);
        });
    });
});



module.exports = router;
