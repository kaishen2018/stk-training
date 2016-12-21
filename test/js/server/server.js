/**
 * Created by beck.zhang on 12/21/2016.
 */

var express = require("express");
var app = express();
var fs = require("fs");

app.get()


app.use("/home",app);

var server = app.listen(8081,function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});