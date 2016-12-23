/**
 * Created by geekeryoung.gao on 12/22/2016.
 */
var Fs = require("fs");
var Url = require("url");
var Http = require("http");
var Qs = require("querystring");
var Connect = require("../node_modules/mysql").createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

const TABLE = "User_tbl";
const ID = "id";
const USER_NAME = "user_name";
const PASSWORD = "password";
const C_TIME = "create_time";
const C_USER = "create_user";
const U_TIME = "update_time";

// 创建服务器
var App = Http.createServer(function (req, resp) {
    route(req, resp);
});

App.on("close", function () {
    console.log("服务器准备关闭");
    // 关闭数据库
    Connect.end(function () {
        console.log("数据库已关闭");
    });
});

App.listen(8080, function () {
    SqlIni();
    console.log("start Server");
});

// 数据库连接初始化
function SqlIni() {
    Connect.connect(function (err) {
        if (err)
            console.error("数据库连接失败")
        else
            console.log("数据库连接成功");
    });
}

// 路由
function route(req, resp) {
    var name = Url.parse(req.url).pathname;
    console.log("pathname:" + name);
    name = ctrlName(name);
    switch (name) {
        case "/":
            getHtml(req, resp);
            break;
        case "/JS":
        case "/Image":
        case "/CSS":
            getFile(req, resp);
            break;
        default:
            notFound(req, resp);
            break;
    }
}

// 修改 请求 pathname 将 第二个 ”/“ 之后的内容抛弃
function ctrlName(pathname) {
    var array = pathname.split("/");
    pathname = "/" + array[1];
    console.log("new pathname:" + pathname);
    return pathname;
}

// 判断 get post
function getHtml(req, resp) {
    if (req.method.toUpperCase() == "POST")
        post(req, resp);
    else
        get(req, resp);
}

// 资源文件
function getFile(req, resp) {
    var path = Url.parse(req.url).pathname;
    Fs.exists("../" + path, function (exists) {
        if (exists)
            Fs.createReadStream("../" + path).pipe(resp);
        else
            console.error("not found " + req.url);
    })
}

// 没找到
function notFound(req, resp) {
    resp.writeHead(404, {"Content-Type": "text/plain"});
    resp.write("Not found!!!");
    resp.end();
}

// 请求格式 新旧值通过 $$ 区分
// {
//     action:[insert,delete,update,validate,select]
//     id:[oldid$$newid]
//     name:[oldname$$newname],
//     pass:[oldpass$$newpass],
//     c_time:[oldtime$$newtime],
//     u_time:[oldtime$$newtime],
//     c_user:[oldid$$newid],
// }

// 返回格式
// {
//     result:[ok,error],
//     id:[id],
//     name:[name],
//     pass:[pass],
//     c_time:[long],
//     c_user:[long],
//     u_time:[long]
// }

// 处理 post
function post(req, resp) {
    var post = "";
    req.on("data", function (data) {
        post += data;
    })
    req.on("end", function () {
        post = Qs.parse(post);
        postAction(post, resp);
    })
}

// 处理 请求
function postAction(post, resp) {
    resp.writeHead(200, {"Content-Type": "text/plain"});
    switch (post.action) {
        case "insert":
            console.log("insert:", post);
            Insert(post, function (result) {
                resp.end(JSON.stringify(result));
            });
            break;
        case "delete":
            console.log("delete:", post);
            Delete(post, function (result) {
                var resultData = getResultModel();
                resultData.result = result ? "ok" : "error";
                resp.end(JSON.stringify(resultData));
            });
            break;
        case "update":
            // 新旧分离
            var names = post.name.split("$$");
            // var passs = post.pass.split("$$");
            var c_times = post.c_time.split("$$");
            var u_times = post.u_time.split("$$");
            var c_users = post.c_user.split("$$");
            // 新旧赋值
            var oldUser = {
                // "id": ids[0],
                "name": names[0],
                // "pass": passs[0],
                "c_user": c_users[0],
                "c_time": c_times[0],
                "u_time": u_times[0]
            };
            var newUser = {
                // "id": ids[1],
                "name": names[1],
                // "pass": passs[1],
                "c_user": c_users[1],
                "c_time": c_times[1],
                "u_time": u_times[1]
            };
            console.log("oldUser:", oldUser, "newUser:", newUser);
            Update(oldUser, newUser, function (result) {
                var resultData = getResultModel();
                resultData.result = result ? "ok" : "error";
                resp.end(JSON.stringify(resultData));
            });
            break;
        case "validate":
            console.log("validate:", post);
            SelectID(post, function (result) {
                if (result != null)
                    SelectUser(result, function (rs) {
                        resp.end(JSON.stringify(rs));
                    });
                else { // 没找到
                    var resultData = getResultModel();
                    resultData.result = "error";
                    resp.end(JSON.stringify(resultData));
                }
            });
            break;
        case "select":
            SelectAll(function (result) {
                console.log("select result:", JSON.stringify(result));
                resp.end(JSON.stringify(result));
            });
            break;
        default:
            resp.end("Error");
            break;
    }
}

// 返回 单一用户
function Insert(post, next) {
    var date = new Date();
    // console.log("insert now date" + date.toDateString());
    // console.log(date.getTime());
    // date.setTime(date.getTime());
    // console.log("insert now time" + date.getTime());
    var SQL = "INSERT INTO " + TABLE + "(" + USER_NAME + "," + PASSWORD + "," + C_TIME + "," + C_USER + "," + U_TIME + ") VALUES( '" +
        post.name + "','" + post.pass + "','" + date.getTime() + "','" + post.c_user + "','" + date.getTime() + "');";
    var resultData = getResultModel();
    console.log(SQL);
    Connect.query(SQL, function (err, result) {
        if (err)
            resultData.result = "error";
        else {
            resultData.result = "ok";
            resultData.pass = post.pass;
            resultData.name = post.name;
            resultData.id = result.insertId;
            resultData.c_user = result.insertId;
        }
        console.log(JSON.stringify(resultData));
        next(resultData);
    });
}

// 返回 boolean
function Delete(post, next) {
    SelectID(post, function (result) {
        if (result != null) {
            var SQL = "DELETE FROM " + TABLE + " WHERE " + ID + " ='" + result + "';";
            console.log(SQL);
            Connect.query(SQL, function (err, result) {
                if (err || result.affectedRows == 0)
                    next(false);
                else
                    next(true);
            })
        }
        else
            next(false);
    });
}

// 返回 boolean
function Update(oldUser, newUser, next) {
    SelectID(oldUser, function (result) {
        // 查到 修改
        if (result != null) {
            var SQL = "UPDATE " + TABLE + " SET ";
            if (newUser.name)
                SQL += USER_NAME + " ='" + newUser.name + "', ";
            if (newUser.pass)
                SQL += C_USER + " ='" + newUser.c_user + "', ";
            if (newUser.c_time)
                SQL += C_TIME + " ='" + newUser.c_time + "', ";
            if (newUser.u_time)
                SQL += U_TIME + " ='" + newUser.u_time + "', ";
            if (newUser.c_user)
                SQL += C_USER + " ='" + newUser.c_user + "', ";
            SQL = SQL.substr(0, SQL.lastIndexOf(","));
            SQL += " WHERE " + ID + " ='" + result + "';";
            console.log(SQL);
            Connect.query(SQL, function (err, result) {
                if (err || result.affectedRows == 0)
                    next(false);
                else
                    next(true);
            });
        } else // 没查到
            next(false);
    });
}

// 返回 单一用户
function SelectUser(id, next) {
    var SQL = "SELECT * FROM " + TABLE + " WHERE " + ID + " ='" + id + "';";
    console.log(SQL);
    Connect.query(SQL, function (err, result) {
        var resultData = getResultModel();
        if (err || result.length == 0)
            resultData.result = "error";
        else {
            resultData.result = "ok";
            resultData.id = result[0].id;
            resultData.pass = result[0].password;
            resultData.name = result[0].user_name;
            resultData.c_user = result[0].create_user;
            resultData.c_time = result[0].create_time;
            resultData.u_time = result[0].update_time;
        }
        next(resultData);
    });
}

// 返回 用户数组
function SelectAll(next) {
    var SQL = "SELECT * FROM " + TABLE + ";";
    console.log(SQL);
    Connect.query(SQL, function (err, result) {
        var resultData = getResultModel();
        if (err)
            resultData.result = "error";
        else {
            var array = new Array(result.length);
            for (var i = 0; i < result.length; i++) {
                array[i] = getResultModel();
                array[i].result = "ok";
                array[i].id = result[i].id;
                array[i].pass = result[i].password;
                array[i].name = result[i].user_name;
                array[i].c_user = result[i].create_user;
                array[i].c_time = result[i].create_time;
                array[i].u_time = result[i].update_time;
            }
            next(array);
        }
    });
}

// user 一个 对象
// 返回 一个ID
function SelectID(user, next) {
    var SQL = "SELECT " + ID + " FROM " + TABLE + " WHERE ";
    if (user.id)
        SQL += ID + "='" + user.id + "' AND ";
    if (user.name)
        SQL += USER_NAME + "='" + user.name + "' AND ";
    if (user.pass)
        SQL += PASSWORD + "='" + user.pass + "' AND ";
    if (user.c_time)
        SQL += C_TIME + "='" + user.c_time + "' AND ";
    if (user.u_time)
        SQL += U_TIME + "='" + user.u_time + "' AND ";
    if (user.c_user)
        SQL += C_USER + "='" + user.c_user + "' AND ";
    SQL = SQL.substr(0, SQL.lastIndexOf("AND"));
    SQL += ";";
    console.log(SQL);
    Connect.query(SQL, function (err, result) {
        console.log("selectID:", result);
        // 没查到
        if (err || result.length == 0)
            next(null);
        else // 查到返回
            next(result[0].id);
    });
}

// 处理 get
function get(req, resp) {
    var result = "";
    var get = Url.parse(req.url, true).query;
    console.log(get);
    Fs.readFile("../index.html", function (err, data) {
        if (err)
            result = err;
        else
            result = data;
        resp.writeHead(200, {"Content-Type": "text/html"});
        resp.write(result);
        resp.end();
    });
}

function getResultModel() {
    var result = {
        id: "0",
        c_user: "0",
        result: "ok",
        name: "",
        pass: "",
        c_time: new Date().getTime(),
        u_time: new Date().getTime()
    }
    return result;
}