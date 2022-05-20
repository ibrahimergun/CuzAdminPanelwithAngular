'use strict';

app.controller("login", ["$scope", "$rootScope", "$http", "$location", "toastr", "RequestData", "$cookies",
    function ($scope, $rootScope, $http, $location, toastr, RequestData, $cookies) {
        $scope.loginAdmin = function () {
            var request = {
                method: 'POST',
                url: RequestData.baseUrl + "/admins/login/",
                headers: {
                    "Accept": "application/json; version=1.0",
                    "Content-Type": "application/json"
                },
                data: {
                    "username": $scope.username,
                    "password": $scope.password
                }
            };

            function successfulResponse(response) {
                $cookies.put('getToken', response.data.token);
                toastr.success('Log In', 'Successfull!');
                $location.path('home/dashboard');
            }

            function errorResponse(response) {
                $cookies.put('getToken', '');
                toastr.error('Error!', 'Oops! User name or password wrong. Please again.');
                response.data.token = "";
            }

            $http(request).then(successfulResponse, errorResponse);
            console.log(request);
        };
    }]);