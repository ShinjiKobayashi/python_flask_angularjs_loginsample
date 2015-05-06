/**
 * Created by skobayashi1 on 15/05/06.
 */

angular.module("myApp")
    .controller('LoginCtrl',
    ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

        var showErrorMsg = function (msg) {
            $scope.error = true;
            $scope.errorMsg = msg;
        };

        var login_init = function () {
            $scope.error = false;
            $scope.disabled = true;
            $scope.dataLoading = true;
        };

        var login_exit = function () {
            $scope.disabled = false;
            $scope.dataLoading = false;
        };

        $scope.register = function () {
            console.log("register button");
            $location.path('/register');
        };

        $scope.login = function () {
            login_init();
            console.log("username", $scope.username);
            if ($scope.username == null || $scope.password == null) {
                showErrorMsg("Invalid data.");
                login_exit();
            } else {
                AuthService.login($scope.username, $scope.password)
                    // .then(successCallback, errorCallback, notifyCallback)
                    // catch == errorCallback, finallyはpromise処理の最後に実行される
                    // それぞれがCallされるのは、Deferred.resolve(),reject(),notify()がCallされたとき。
                    .then(function () {
                        $location.path('/');
                    })
                    .catch(function (reason) {
                        showErrorMsg("Login failed: " + reason);
                    })
                    .finally(function () {
                        login_exit();
                    });
            }
        };
    }]);
