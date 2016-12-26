/*
 * Created by Administrator on 2016/12/25.
 */
/*添加API接口调用SQL语句*/
var sd = require('silly-datetime');

var UserSQL = {
    queryAll:'SELECT * FROM tb_users order by uid desc limit 0,6',
    insert:'INSERT INTO tb_users(name,createname,date,updates) VALUES(?,?,?,?)',
    delete:'DELETE FROM tb_users WHERE uid=? ',
    update:'UPDATE tb_users SET name=?,createname=?,date=?,updates=? WHERE uid=?',
    countall:'select count(*) AS total from tb_users',
    countnew:'select count(*) As newnumber from tb_users where date = ?',
    //getdate:'SELECT  STR_TO_DATE(?,'%Y-%m-%d')'
};
module.exports = UserSQL;