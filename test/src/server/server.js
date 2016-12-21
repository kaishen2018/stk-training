/**
 * Created by beck.zhang on 12/21/2016.
 */

var express = require("express");
var app = express();
var fs = require("fs");

var router = require("./router");
app.use(express.static("../../public"));

app.use("/",router);

var server = app.listen(8083,function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(" app listening at http://%s:%s", host, port);
});