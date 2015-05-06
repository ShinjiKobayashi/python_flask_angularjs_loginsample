/**
 * Created by skobayashi1 on 15/05/06.
 */

angular.module("myApp")
    .controller('RegisterCtrl',
    ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
        var showErrorMsg = function (msg) {
            $scope.error = true;
            $scope.errorMsg = msg;
        };

        var register_init = function () {
            $scope.error = false;
            $scope.disabled = true;
            $scope.dataLoading = true;
        };

        var register_exit = function () {
            $scope.disabled = false;
            $scope.dataLoading = false;
        };

        $scope._cancel = function () {
            $location.path('/login');
        };

        $scope.register = function () {
            register_init();
            console.log("[Register]username", $scope.username);
            if ($scope.firstname == null || $scope.lastname == null || $scope.username == null
                || $scope.password == null) {
                showErrorMsg("Invalid data.");
                register_exit();
            } else {
                AuthService.register($scope.firstname, $scope.lastname, $scope.username,
                    $scope.password, $scope.nfckey)
                    .then(function () {
                        $location.path('/login');
                    })
                    .catch(function () {
                        showErrorMsg("Register failed");
                    })
                    .finally(function () {
                        register_exit();
                    });
            }
        };

    }]);
