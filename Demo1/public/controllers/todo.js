function myCtrl($scope, $http, $state, $stateParams) {

    // $scope.formData = {};
    // when the page loads, all API calls TODOs
    $http.get('/api/todos')
        .success(function (rows) {
            $scope.users = rows;
            console.log(rows);
        })
        .error(function (err) {
            console.log('Error: ', err);
        });

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
}
