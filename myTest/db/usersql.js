/*
 * Created by Administrator on 2016/12/25.
 */
/*添加API接口调用SQL语句*/
var sd = require('silly-datetime');

var UserSQL = {
    insert:'INSERT INTO tb_users(name,createname,date,updates) VALUES(?,?,?,?)',
    delete:'DELETE FROM tb_users WHERE uid=? ',
    update:'UPDATE tb_users SET name=?,createname=?,date=?,updates=? WHERE uid=?',
    countall:'select count(*) from tb_users',
    countnew:'select count(*) from tb_users where date = ?',
    queryAll:'SELECT * FROM tb_users order by uid desc',
    getUserById:'SELECT * FROM tb_users WHERE uid = ? ',
};
module.exports = UserSQL;