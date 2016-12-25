/**
 * Created by beck.zhang on 12/21/2016.
 */
var express = require("express");
var router = express.Router();
var sd = require("silly-datetime");
var pool = require('./connectData');


var uid, uName, uAdmin, uDate, uLastDate;

router.get('/', function (req, res) {
  // res.render('index',{title: "Express"});
  pool.getConnection(function (err, connection) {
    connection.query('select * from users', function (err, rows, fields) {
      if (err) {
        console.log(err.stack);
      }
      //console.log(rows);
      res.send(rows);
      connection.release();
    });
  });

});

router.post('/', function (req, res) {
  console.log('req.body: ', req.body);


  uName = req.body.nName;
  uAdmin = "Beck";
  uDate = sd.format(new Date(), "YYYY-MM-DD");
  uLastDate = sd.format(new Date(), "YYYY-MM-DD");

  pool.getConnection(function (err, connection) {
    connection.query('insert into users(uName,uAdmin,uDate,uLastDate) values (?,?,?,?)', [uName, uAdmin, uDate, uLastDate], function (err, result) {
      if (err) {
        console.log(err.stack);
      }
      console.log(result);
      connection.query('select * from users', function (err, rows) {
        if (err) {
          console.log(err.stack);
        }
        //console.log(rows);
        res.send(rows);
        connection.release();
      });
    });
  });
});

router.post("/login", function (req, res) {
  pool.getConnection(function (err, connection) {
    console.log(req.body.loginName);
    connection.query("select count(*) as adminCount from users where uAdmin=?", [req.body.loginName], function (err, results) {
      if (err) {
        alert("username or password error");
      }
      res.send(results);
      connection.release();
    });
  });
});
router.post("/register", function (req, res) {
  pool.getConnection(function (err, connection) {
    connection.query("insert into users (uAdmin, uAdminPwd) values (?,?)", [req.body.registerName, req.body.registerPwd], function (err, result) {
      if (err) console.log(err.statck);
      res.send(result);
      connection.release();
    });
  });
});

router.delete("/:user", function (req, res) {
  pool.getConnection(function (err, connection) {
    connection.query("delete from users where uid=?", [req.params.user], function (err, result) {
      console.log("--------> delete result" + result);
      if (err) {
        console.log(err.stack);
      }
      connection.query("select * from users", function (err, rows) {
        if (err) console.log(err.stack);
        res.send(rows);
        connection.release();
      });
    });
  });

});

// click edit button to display data in the input
router.get('/:uid', function (req, res) {
  if (req.params.uid == "showDashboard") {
    pool.getConnection(function (err, connection) {
      connection.query("select uDate from users", function (err, rows) {
        if (err)  console.log(err.stack);
        res.send(rows);
        connection.release();
      });
    });
  } else {
    pool.getConnection(function (err, connection) {
      console.log("click edit to show the id: ", req.params.uid);
      connection.query("select * from users where uid=?", [req.params.uid], function (err, rows) {
        if (err) console.log("select sql error: " + err.stack);
        res.send(rows);
        connection.release();
      });
    });
  }
});

router.put("/", function (req, res) {
  uid = req.body.uid;
  uName = req.body.uName;
  uLastDate = sd.format(new Date(), "YYYY-MM-DD");
  console.log("--------------->click save to sql:");
  pool.getConnection(function (err, connection) {
    connection.query("update users set uName=?,uLastDate=? where uid=?", [uName, uLastDate, uid], function (err, result) {
      if (err) console.log(err.stack);
      connection.query("select * from users", function (err, rows) {
        if (err) console.log(err.stack);
        res.send(rows);
        connection.release();
      });
    });
  });
});


module.exports = router;