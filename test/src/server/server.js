/**
 * Created by beck.zhang on 12/21/2016.
 */

var express = require("express");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var fs = require("fs");
var router = require("./router");

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static( "../" + __dirname + "/public"));

app.use("/api/index",router);

var server = app.listen(8083,function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(" app listening at http://%s:%s", host, port);
});