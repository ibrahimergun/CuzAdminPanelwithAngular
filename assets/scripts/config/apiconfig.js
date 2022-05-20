'use strict';

angular.module("App").service("RequestData", ["$cookies", function ($cookies) {
    //var Token = $cookies.get('getToken');
    var header = {
        "Authorization": "JWT " + $cookies.get('getToken'),
        //"Authorization": "JWT " + localStorage["Token"],
        "Accept": "application/json; version=1.0",
        "Content-Type": "application/json"
    };
    var data = {
        "baseUrl": "https://cuz-test-dot-cuz-tech.appspot.com",
        "headers": header
    };
    return data;
}]);
