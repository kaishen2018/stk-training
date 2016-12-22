/**
 * Created by beck.zhang on 12/21/2016.
 */
var express = require("express");
var router = express.Router();
var conn = require('./connectData');

conn.connect();
router.get('/', function (req, res) {
  // res.render('index',{title: "Express"});
  conn.query('select * from users', function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    }
    //console.log(rows);
    res.send(rows);
  })
});
var uName, uAdmin, uDate, uLastDate;
router.post('/', function (req, res) {
  console.log('req.body: ', req.body);

  uName = req.body.nName;
  uAdmin = "Beck";
  uDate = new Date();
  uLastDate = new Date();

  conn.query('insert into users(uName,uAdmin,uDate,uLastDate) values (?,?,?,?)', [uName, uAdmin, uDate, uLastDate], function (err, result) {
    if (err) {
      console.log(err.stack);
    }
    conn.query('select * from users', function (err, rows) {
      if (err) {
        console.log(err.stack);
      }
      //console.log(rows);
      res.send(rows);
    });
  })
});


module.exports = router;