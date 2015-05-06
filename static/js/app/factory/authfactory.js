/**
 * Created by skobayashi1 on 15/05/06.
 */

angular.module('myApp')
    .factory('AuthService',
    ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
        var _user = null;
        return {
            isLogged: function () {
                return !!_user;
            },
            getUser: function () {
                return _user;
            },
            // login() の戻りはPromise Obj
            // Promise Objを生成するには$qサービスのdefer()を利用する
            login: function (username, password) {
                var deferred = $q.defer();

                $http.post('/api/user/login', {username: username, password: password})
                    .success(function (data, status) {
                        if(status != 200){
                            deferred.reject();
                            return;
                        }

                        switch(data["result"]){
                            case 0:
                                // success
                                _user = data["user"];
                                deferred.resolve();
                                break;
                            case -1:
                                // unknown user
                                deferred.reject("unknown user");
                                break;
                            case -2:
                                // invalid password
                                deferred.reject("invalid password");
                                break;
                        }
                    });

                return deferred.promise;
            },
            logout: function () {
                _user = null;
                return $q.all();
            },
            register: function (firstname, lastname, username, password, nfckey) {
                var deferred = $q.defer();
                $http.post('/api/user/register',
                    {
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                        nfckey: nfckey
                    })
                    .success(function (data, status) {
                        console.log("data:", data, "\nstatus:", status);
                        if (status != 200) {
                            deferred.reject();
                            return;
                        }

                        if (data['result'] != 0) {
                            // TODO: to handle error codes.
                            deferred.reject();
                            return;
                        }

                        deferred.resolve();
                    });
                return deferred.promise;
            }
        };
    }]);

