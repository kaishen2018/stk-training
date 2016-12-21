/**
 * Created by beck.zhang on 12/21/2016.
 */
var express = require("express");
var routergo = express.Router();
var fs = require("fs");

routergo.get('/',function (req, res) {

  fs.readFile("./test/src/public/users.json",function (err, data) {
    if(err){
      console.log(err.stack);
      res.send(error);
    }
    console.log("success");
    res.json(data);
  });
  console.log("get /");
});

module.exports = routergo;