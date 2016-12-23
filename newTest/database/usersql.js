/**
 * Created by banana.cao on 12/21/2016.
 */
var UserSQL = {
    insert:'INSERT INTO tb_users(name,createname,date,updates) VALUES(?,?,?,?)',
    queryAll:'SELECT * FROM tb_users',
    getUserById:'SELECT * FROM tb_users WHERE uid = ? ',
};
module.exports = UserSQL;