'use strict';

app.controller("UsersCtrl", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$location', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $location, $filter, $stateParams, RequestData, toastr) {

        $scope.model = new Pagination({
            http:$http,
            pageFilter:"&page=",
            popup:toastr,
            dataSearchUrl:"/users/?is_translator=false&q=",
            dataClassUrl:"/users/?is_translator=false&page=",
            dataClass:"users",
            RequestData:RequestData
        }).initiate();
        console.log($scope.model);

        //Pagination and list

        $rootScope.editUser = function ($event) {
            $rootScope.usersName = $event.currentTarget.name;
            // $rootScope.$broadcast('parentId', $rootScope.usersName);
            console.log($event.currentTarget.name);
        };
        $scope.delUser = function ($event) {
            $scope.DelUser = $event.currentTarget.name;

            console.log($scope.DelUser);
            var request = {
                method: 'DELETE',
                url: RequestData.baseUrl + "/users/" + $scope.DelUser + "/",
                headers: RequestData.headers
            };

            function successfulResponse(response) {
                console.log(response.data);
                $scope.DelData = response.data;
                toastr.success('Account has been Deleted', 'Delete success!');
            }

            function errorResponse(response) {
                console.log(response.data);
                toastr.error('Error!', 'Account has not been deleted');
                //$scope.DelData = "Wrong";
            }

            $http(request).then(successfulResponse, errorResponse);
        };
    }]);

app.controller("editUsers", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',
    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {
        //$scope.$on('parentId', function (events, args) {
        // console.log(args);
        //});
        var username = document.URL.split("userEdit/")[1] || document.URL.split("usersShow/")[1] ;
        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/users/" + username + "/",
            headers: RequestData.headers
        };
        function successfulResponse(response) {
            $scope.userProfile = response.data;
            console.log(response.data);
        };
        function errorResponse(response) {
            console.log(response.data);
            $scope.userProfile = "Wrong";
            //toastr.error('Error!', 'Account has not been Updated');
        };
        $http(request).then(successfulResponse, errorResponse);
        console.log({scope: $scope, state: $state, stateParams: $stateParams});
        console.log(request);

        $scope.update = function () {
            var username = document.URL.split("userEdit/")[1] || document.URL.split("usersShow/")[1] ;
            var request = {
                method: 'PUT',
                url: RequestData.baseUrl + "/users/" + username + "/",
                headers: RequestData.headers,
                data: {
                    "gender": $scope.userProfile.profile.user.gender,
                    "first_name": $scope.userProfile.profile.user.first_name,
                    "birthday": $scope.userProfile.profile.user.birthday,
                    "date_joined": $scope.userProfile.profile.user.date_joined,
                    "last_name": $scope.userProfile.profile.user.last_name,
                    "phone": $scope.userProfile.profile.user.phone,
                    "bio": $scope.userProfile.profile.bio,
                    "address": $scope.userProfile.profile.address,
                    "username": $scope.userProfile.profile.user.username,
                    "email": $scope.userProfile.profile.user.email
                }
            };

            console.log(request);

            function successfulResponse(response) {
                console.log(response);
                toastr.success('Account has been Updated', 'Update success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '1000'
                });
            };
            function errorResponse(response) {
                console.log(response.data);
                toastr.error('Update Error!', 'Account has not been updated');
            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);


/*var request = {
 method: 'GET',
 url: RequestData.baseUrl + "/users/" + $scope.userName + "/",
 headers: RequestData.headers
 };
 function successfulResponse(response) {
 $scope.user = response.data;
 console.log(response.data);
 };
 function errorResponse(response) {
 console.log(response.data);
 $scope.user = "Wrong";
 };
 $http(request).then(successfulResponse, errorResponse);

 $scope.editUser = function (x) {
 $scope.userName = $scope.UsersList[x].user.username;
 $scope.userEmail = $scope.UsersList[x].user.email;
 console.log($scope.userName);


 //$scope.editUser();
 };*/



/*$scope.getUser = function (x) {
 $scope.userName = $scope.UsersList[x].user.username;
 console.log($scope.userName);

 var request = {
 method: 'GET',
 url: RequestData.baseUrl + "/users/" + $scope.userName + "/",
 headers: RequestData.headers
 };

 function successfulResponse(response) {
 $scope.user = response.data;
 console.log(response.data);
 };
 function errorResponse(response) {
 console.log(response.data);
 $scope.user = "Wrong";
 };
 $http(request).then(successfulResponse, errorResponse);

 $window.location.reload();
 };
 $scope.getUser();
 */

//$scope.$on('parent', function (events, args) {
//console.log(args);
//$scope.userName = args;
//$scope.userssName = $scope.userName[$rootScope.usersName].user.username;
//console.log($scope.userName);
//$scope.usersName = $scope.userName.user.username;






