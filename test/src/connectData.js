/**
 * Created by beck.zhang on 12/22/2016.
 */

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'

});

module.exports = pool;