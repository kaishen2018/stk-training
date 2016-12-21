/**
 * Created by banana.cao on 12/21/2016.
 */
var UserSQL = {
    insert:'INSERT INTO tb_users(uid,name,createname,date,update) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM tb_users',
    getUserById:'SELECT * FROM tb_users WHERE uid = ? ',
};
module.exports = UserSQL;