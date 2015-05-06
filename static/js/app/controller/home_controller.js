/**
 * Created by skobayashi1 on 15/05/06.
 */

angular.module("myApp")
    .controller('NavCtrl',
    ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
        $scope.$watch(
            function () {
                return AuthService.getUser()
            },
            function (newVal, oldVal) {
                $scope.user = newVal
            }
        );
        $scope.logout = function () {
            AuthService.logout().finally(function () {
                $location.path('/login')
            });
        };
    }]);
