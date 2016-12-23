/**
 * Created by geekeryoung.gao on 12/16/2016.
 */

var UserID = 0;

// 启动INI界面
function StartIniApp() {
    console.log("一切由此开始");
    var app = angular.module("iniApp", []);
    app.controller("iniCtrl", function ($scope) {
        var div = $("#ini");
        var img = $("#img_ini");
        var text = $("#text_ini");
        var progress = $("#progress_ini");
        // 初始化 背景：#d8d1e5
        div.height(window.innerHeight);
        div.css("backgroundColor", "#d8d1e5");
        img.height(div.height() / 3);
        img.width(div.height() / 3);
        img.css({
            "position": "relative",
            "marginTop": img.height() + "px"
        });
        progress.height(img.height());
        progress.width(img.width());
        progress.css({
            "opacity": 0.1,
            "position": "absolute",
            "borderRadius": 1000 + "px",
            "marginTop": img.height() + "px",
            "marginLeft": -img.width() + "px"
        });
        // console.log("img.h:" + img.height() + " img.w:" + img.width());
        // console.log("pro.h:" + progress.height() + " pro.w:" + progress.width());
        var cav = progress.get(0).getContext("2d");
        cav.fillStyle = "#000000";
        cav.fillRect(0, 0, 1000, 1000);
        cav.fill();
        // 动画显示元素
        div.fadeIn("slow");
        progress.animate({"paddingTop": progress.height()}, 1500, function () {
            // 收尾
            div.fadeOut("slow", StartTurn);
        });
    });
    angular.bootstrap($("#ini"), ["iniApp"]);
}
function StartTurn() {
    console.log("turn page");
    var app = angular.module("turnApp", []);
    app.controller("turnCtrl", function ($scope) {
        var div = $("#turn");
        var img = $("#turn img");
        // 初始化
        div.height(window.innerHeight);
        img.height(div.height() / 4);
        img.width(div.height() / 4);
        img.css({"marginTop": (div.height() / 2 - img.height() / 2)});
        div.fadeIn("slow");
        img.css({"transform": "rotate(960deg)", "transition": "transform 3s ease 0s"});
        setTimeout(function () {
            div.fadeOut("slow", StartLogin);
        }, 3000);
    });
    angular.bootstrap($("#turn"), ["turnApp"]);
}
function StartLogin() {
    console.log("login page");
    var app = angular.module("loginApp", []);
    app.controller("loginCtrl", function ($scope) {
        var div = $("#login");
        div.fadeIn("slow");
        $scope.L_Name = "";
        $scope.L_Pass = "";
        $scope.R_Name = "";
        $scope.R_Pass = "";
        // click login to next
        $scope.login = function () {
            $.post(location.href, {
                "action": "validate",
                "name": $scope.L_Name,
                "pass": $scope.L_Pass
            }, function (result) {
                result = JSON.parse(result);
                console.log("login result:", result);
                if (result.result == "ok") {
                    end();
                    UserID = result;
                }
                else
                    alert("登录失败");
            })
        };
        $scope.register = function () {
            $.post(location.href, {
                "action": "insert",
                "name": $scope.R_Name,
                "pass": $scope.R_Pass
            }, function (result) {
                result = JSON.parse(result);
                console.log(result);
                if (result.result == "ok")
                    alert("注册成功");
                else
                    alert("注册失败");
            })
        }
        // click other show hint
        $scope.hint = function () {
            $("#login_login").css({"backgroundColor": "#ffff00"});
            $("#register_login").css({"backgroundColor": "#ffff00"});
            setTimeout(function () {
                $("#login_login").css({"backgroundColor": "#ffffff"});
                $("#register_login").css({"backgroundColor": "#005e89"});
            }, 1000);
        }
        function end() {
            div.fadeOut("slow", StartMain);
        }
    });
    angular.bootstrap($("#login"), ["loginApp"]);
}
function StartMain() {
    console.log("main page");
    var app = angular.module("mainApp", []);
    app.controller("mainCtrl", function ($scope) {
        var div = $("#main");
        var menu = $("#menu_main");
        var selectMenu = $("#select_menu");
        var item = $("#item_main");
        var content = $("#content_main");
        var UserArray;
        var deleteUser;
        menu.height(window.innerHeight);
        selectMenu.height(window.innerHeight - 65);
        item.height(window.innerHeight - 65);
        $("#home_item_main").css({"color": "#ffffff"});
        $("#user_item_main").css({"color": "#b8c7ce"});
        // // 对应的图片 ID
        // $scope.SHAR = 1;
        // $scope.MENU = 2;
        // $scope.FONT = 3;
        // $scope.BACK = 4;
        // $scope.ZOOM_IN = 5;
        // $scope.ZOOM_OUT = 6;
        // // 鼠标进入
        // $scope.min = function (imgID) {
        //     console.log("鼠标在" + imgID + "上");
        //     switch (imgID) {
        //         case $scope.SHAR:
        //             $("#shar_menu_main")
        //                 .children().attr("src", "./Image/sharing.png");
        //             break;
        //         case $scope.MENU:
        //             $("#menu_menu_main")
        //                 .children().attr("src", "./Image/menuing.png");
        //             break;
        //         case $scope.FONT:
        //             $("#font_menu_main")
        //                 .children().attr("src", "./Image/fonting.png");
        //             break;
        //         case $scope.BACK:
        //             $("#back_menu_main")
        //                 .children().attr("src", "./Image/backing.png");
        //             break;
        //         case $scope.ZOOM_IN:
        //             $("#zoomIn_menu_main")
        //                 .children().attr("src", "./Image/zoom_in_ing.png");
        //             break;
        //         case $scope.ZOOM_OUT:
        //             $("#zoomOut_menu_main")
        //                 .children().attr("src", "./Image/zoom_out_ing.png");
        //             break;
        //     }
        // }
        // // 鼠标离开
        // $scope.mout = function (imgID) {
        //     switch (imgID) {
        //         case $scope.SHAR:
        //             $("#shar_menu_main")
        //                 .children().attr("src", "./Image/shar.png");
        //             break;
        //         case $scope.MENU:
        //             $("#menu_menu_main")
        //                 .children().attr("src", "./Image/menu.png");
        //             break;
        //         case $scope.FONT:
        //             $("#font_menu_main")
        //                 .children().attr("src", "./Image/font.png");
        //             break;
        //         case $scope.BACK:
        //             $("#back_menu_main")
        //                 .children().attr("src", "./Image/back.png");
        //             break;
        //         case $scope.ZOOM_IN:
        //             $("#zoomIn_menu_main")
        //                 .children().attr("src", "./Image/zoom_in.png");
        //             break;
        //         case $scope.ZOOM_OUT:
        //             $("#zoomOut_menu_main")
        //                 .children().attr("src", "./Image/zoom_out.png");
        //             break;
        //     }
        // }
        $scope.Users;
        $scope.UserName = "";
        $scope.Total = 0;
        $scope.New = 0;
        $scope.T_N = 0;
        $scope.hint = function () {

        };
        // 显示 主机界面
        $scope.showOut = function () {
            $("#username_main p").fadeToggle("slow");
        }
        // 退出
        $scope.out = function () {
            UserID = 0;
            div.fadeOut("slow", location.reload());
        }
        // 已废弃
        $scope.toggleMenu = function () {
            selectMenu.toggle("slow");
        }
        $scope.showHome = function () {
            SetHomeInfo();
            $("#content_users").fadeOut("slow");
            $("#content_main").fadeIn("slow");
            $("#home_item_main p").css({"color": "#ffffff"});
            $("#home_item_main span").css({"color": "#ffffff"});
            $("#user_item_main p").css({"color": "#b8c7ce"});
            $("#user_item_main span").css({"color": "#b8c7ce"});
        }
        $scope.showUser = function () {
            GetUserInfo();
            $("#content_main").fadeOut("slow");
            $("#content_users").fadeIn("slow");
            $("#user_item_main p").css({"color": "#ffffff"});
            $("#user_item_main span").css({"color": "#ffffff"});
            $("#home_item_main p").css({"color": "#b8c7ce"});
            $("#home_item_main span").css({"color": "#b8c7ce"});
        }
        $scope.showAddUser = function () {
            var dialog = $("#addUserDialog");
            dialog.height(window.innerHeight);
            dialog.children().css({
                "top": "200px",
                "left": ((window.innerWidth / 2) - (dialog.children().width() / 2))
            });
            dialog.fadeIn("slow");
        }
        $scope.closeUserDialog = function () {
            $("#addUserDialog").fadeOut("slow");
        }
        $scope.addUser = function () {
            $.post(location.href, {
                action: "insert",
                name: $scope.UserName,
                pass: $scope.UserName,
                c_user: UserID
            }, function (result) {
                result = JSON.parse(result);
                if (result.result == "ok")
                    $scope.closeUserDialog();
                else
                    alert("创建出错");
            });
        }
        $scope.showDeleteUser = function () {
            var dialog = $("#DeleteUserDialog");
            dialog.height(window.innerHeight);
            dialog.children().css({
                "top": "200px",
                "left": ((window.innerWidth / 2) - (dialog.children().width() / 2))
            });
            dialog.fadeIn("slow");
        }
        $scope.closeDeleteUserDialog = function () {
            $("#DeleteUserDialog").fadeOut("slow");
        }
        $scope.deleteUser = function () {
            console.log("deleteUser:", deleteUser)
            $.post(location.href, {
                action: "delete",
                name: deleteUser.name,
                c_time: deleteUser.c_time,
                u_time: deleteUser.u_time,
                c_user: deleteUser.c_user
            }, function (result) {
                result = JSON.parse(result);
                if (result.result == "ok")
                    alert("删除成功");
                else
                    alert("删除失败");
                $scope.closeDeleteUserDialog();
            });
        }
        $scope.EditSave = function (x) {
            var index = $scope.Users.indexOf(x);
            console.log("click NO." + index);
            var trs = $("#content_content_users tr");
            trs.eq(index + 1).find("p").fadeToggle(0);
            trs.eq(index + 1).find("input").fadeToggle(0);
            var as = trs.eq(index + 1).find("a");
            if (as.eq(0).text() == "Edit") {
                as.eq(0).text("Save");
                as.eq(1).text("Cancel");
            } else {
                as.eq(0).text("Edit");
                as.eq(1).text("Delete");
                $.post(location.href, {
                    action: "update",
                    name: UserArray[index].name + "$$" + x.name,
                    c_time: UserArray[index].c_time + "$$" + new Date(x.c_time).getTime(),
                    u_time: UserArray[index].u_time + "$$" + new Date(x.u_time).getTime(),
                    c_user: UserArray[index].c_user + "$$" + x.c_user
                }, function (result) {
                    result = JSON.parse(result);
                    if (result.result == "ok")
                        alert("修改成功");
                    else
                        alert("修改失败");
                });
            }
        }
        $scope.DeleteCancel = function (x) {
            var index = $scope.Users.indexOf(x);
            console.log("click NO." + index);
            var trs = $("#content_content_users tr");
            // trs.eq(index + 1).find("p").fadeToggle(0);
            // trs.eq(index + 1).find("input").fadeToggle(0);
            var as = trs.eq(index + 1).find("a");
            if (as.eq(1).text() == "Cancel") {
                as.eq(0).text("Edit");
                as.eq(1).text("Delete");
                trs.eq(index + 1).find("p").fadeToggle(0);
                trs.eq(index + 1).find("input").fadeToggle(0);
            } else if (index >= 0) {
                console.log("显示 delete dialog");
                deleteUser = UserArray[index];
                $scope.showDeleteUser();
            }
        }
        // 请求 用户数据
        function GetUserInfo(callback) {
            $.post(location.href, {action: "select"}, function (result) {
                UserArray = JSON.parse(result);
                $scope.Users = JSON.parse(result);
                for (var i = 0; i < UserArray.length; i++) {
                    var date = new Date();
                    date.setTime(UserArray[i].c_time);
                    $scope.Users[i].c_time = date.toDateString();
                    date.setTime(UserArray[i].u_time);
                    $scope.Users[i].u_time = date.toDateString();
                }
                console.log("GetUserInfo:", $scope.Users);
                callback();
            });
        }

        function SetHomeInfo() {
            var date = new Date();
            $scope.New = 0;
            $scope.T_N = 0;
            $scope.Total = $scope.Users.length;
            for (var i = 0; i < $scope.Users.length; i++) {
                if (date.toDateString() == $scope.Users[i].c_time)
                    $scope.New++;
            }
            $scope.T_N = $scope.Total - $scope.New;
        }

        div.fadeIn("slow", function () {
            GetUserInfo($scope.showHome);
        });
    });
    angular.bootstrap($("#main"), ["mainApp"]);
}
// 一切由此开始
StartIniApp();