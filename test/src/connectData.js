/**
 * Created by beck.zhang on 12/22/2016.
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database: 'test'
});

module.exports = connection;