function myCtrl($scope, $http, $state, $stateParams) {
    /**
     * Login
     */
    $scope.loginData = {};
    $scope.login = function () {
        $http.post('/api/todos/login', $scope.loginData)
            .success(function (data) {
                if (data[0].num == 0) {
                    $state.go('login');
                    alert('用户名或密码错误，请重新输入')
                } else {
                    $state.go('main');
                }
            });
    };

    /**
     * Register
     */
    $scope.registerData = {};
    $scope.register = function () {
        $http.post('/api/todos/register', $scope.registerData)
            .success(function (data) {
                $scope.users = data;
                if (data.toString() == 'err') {
                    $state.go('login');
                    alert('两次输入密码不一致，请重新注册')
                } else {
                    $state.go('login');
                    alert('注册成功，请登录')
                }
            });
    };

    /**
     * Dashboard
     */
    //get date count
    $scope.total = function () {
        $http.get('/api/todos/' + 'total')
            .success(function (data) {
                $scope.total = data[0];
                console.log(data);
            })
            .error(function (err) {
                console.log('Error: ', err);
            });
    };

    $scope.nUser = function () {
        $http.get('/api/todos/' + 'nUser')
            .success(function (data) {
                $scope.nUser = data[0];
                console.log(data);
            })
            .error(function (err) {
                console.log('Error: ', err);
            });
    };

    $scope.pUser = function () {
        $http.get('/api/todos/' + 'pUser')
            .success(function (data) {
                $scope.pUser = data[0];
                console.log(data);
            })
            .error(function (err) {
                console.log('Error: ', err);
            });
    };

    /**
     *User Management
     */
    // when the page loads, all API calls TODOs
    $http.get('/api/todos')
        .success(function (data) {
            $scope.users = data;
            console.log(data);
        })
        .error(function (err) {
            console.log('Error: ', err);
        });

    //when a new user added, send the text to API
    $scope.formData = {};
    $scope.user_add = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.users = data;
                console.log(data)
                console.log($scope.users)
            })
            .error(function (err) {
                console.log('Error :', err);
            });
    };

    // get data of one user
    $scope.userData = {};
    $scope.getData = function (uid) {
        $http.get('/api/todos/' + uid)
            .success(function (data) {
                $scope.userData = data[0];
                console.log(data);
            })
            .error(function (err) {
                console.log('Error :', err);
            });
    };

    // when a user update, send the text to API
    $scope.user_update = function () {
        $http.put('/api/todos', $scope.userData)
            .success(function (data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function (err) {
                console.log('Error: ', err);
            });
    }

    //delete a user by userData.uid
    $scope.user_delete = function (uid) {
        $http.delete('/api/todos/' + uid)
            .success(function (data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function (err) {
                console.log('Error : ', err);
            })
    };
}