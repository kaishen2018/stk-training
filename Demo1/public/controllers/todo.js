function myCtrl($scope, $http, $state, $stateParams) {

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