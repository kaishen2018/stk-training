var express = require('express');
// var app = express();
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

/*var server = app.listen(8088, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});*/

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    connection.query(userSQL.queryAll, function (err, rows, fields) {
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
// 添加用户
/*router.get('/user', function (req, res, next) {
    console.log(">>user");

    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息
    connection.insert(userSQL.insert, [param.name], function (err,connection) {
        if (err) throw err;

        /!*!// 以json形式，把操作结果返回给前台页面
         responseJSON(res, result);
         // 释放连接
         connection.release();*!/

    });
    //查询
    connection.query(userSQL.queryAll, [param.name], function (err, connection) {
        if (err) throw err;
        for (var i=0;i<connection.length;i++){
            arr[i]=connection[i].name;
        }
        var arr=userSQL.queryAll;
        res.send(arr);
    });
    //删除
    connection.delete(userSQL.delete, [param.name], function (err, connection) {

    });
    //修改
    connection.update(userSQL.update, [param.name], function (err, connection) {

    });


});*/
// connection.end();//关闭连接
module.exports = router;
