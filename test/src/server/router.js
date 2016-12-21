/**
 * Created by beck.zhang on 12/21/2016.
 */
var express = require("express");
var routergo = express.Router();
var fs = require("fs");

routergo.get('/',function (req, res) {
  fs.readFile("../../public/users.json",function (err, data) {
    console.log(data);
    res.end(data);
  });
  console.log("get /");
});

module.exports = routergo;
