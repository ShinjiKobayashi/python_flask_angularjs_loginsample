/**
 * Created by skobayashi on 15/02/13.
 */

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'static/view/home.view.html',
        controller: function () {
        }
    });
    $routeProvider.when('/page1', {
        template: '<h1>page1</h1>',
        controller: function () {
        }
    });
    $routeProvider.when('/page2', {
        template: '<h1>page2</h1>',
        controller: function () {
        }
    });
    $routeProvider.when('/login', {
        templateUrl: 'static/view/login.view.html',
        controller: 'LoginCtrl'
    });
    $routeProvider.when('/register', {
        templateUrl: 'static/view/register.view.html',
        controller: 'RegisterCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
});


// app.run()は以下のタイミングで呼び出される
// これらは、別URLのアクセスの度に実行される
// 1. app.config()
// 2. app.run()
// 3. directive's compile functions (if they are found in the dom)
// 4. app.controller()
// 5. directive's link functions (again if found)
myApp.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function (ev, next, current) {
        /*
         var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;

         if (restrictedPage && AuthService.isLogged() != false) {
         $location.path('/login');
         $route.reload();
         }
         */
        console.log('myApp.run():  next.controller', next);
        if (next.controller == 'LoginCtrl' || next.controller == 'RegisterCtrl') {
            if (AuthService.isLogged()) {
                $location.path('/');
                $route.reload();
            }
        }
        else {
            if (AuthService.isLogged() == false) {
                $location.path('/login');
                $route.reload();
            }
        }

    });
});



