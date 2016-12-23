/**
 * Created by beck.zhang on 12/21/2016.
 */
var express = require("express");
var router = express.Router();
var conn = require('./connectData');

var uid, uName, uAdmin, uDate, uLastDate;
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

router.post('/', function (req, res) {
  console.log('req.body: ', req.body);

  var date = new Date();

  uName = req.body.nName;
  uAdmin = "Beck";
  uDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
  uLastDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

  conn.query('insert into users(uName,uAdmin,uDate,uLastDate) values (?,?,?,?)', [uName, uAdmin, uDate, uLastDate], function (err, result) {
    if (err) {
      console.log(err.stack);
    }
    console.log(result);
    conn.query('select * from users', function (err, rows) {
      if (err) {
        console.log(err.stack);
      }
      //console.log(rows);
      res.send(rows);
    });
  })
});

router.delete("/:user", function (req, res) {
  conn.query("delete from users where uid=?",[req.params.user],function (err, result) {
    console.log("--------> delete result"+ result);
    if (err){
      console.log(err.stack);
    }
    conn.query("select * from users",function (err, rows) {
      if (err) console.log(err.stack);
      res.send(rows);
    })
  })
});

// click edit button to display data in the input
router.get('/:uid',function (req, res) {
  console.log("click edit to show the id: ",req.params.uid);
  conn.query("select * from users where uid=?",[req.params.uid],function (err, rows) {
    if (err) console.log("select sql error: "+err.stack);
    res.send(rows);
  });

});


router.put("/",function (req, res) {
  var date = new Date();
  uid= req.body.uid;
  uName = req.body.uName;
  uLastDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
  console.log("--------------->click save to sql:");
  conn.query("update users set uName=?,uLastDate=? where uid=?",[uName,uLastDate,uid],function (err, result) {
    if(err) console.log(err.stack);
    conn.query("select * from users", function (err, rows) {
      if(err) console.log(err.stack);
      res.send(rows);
    })
  });
});


module.exports = router;