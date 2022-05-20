'use strict';

app.controller("adminCtrl", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {

        $scope.model = new Pagination({
            http: $http,
            pageFilter:"&page=",
            popup:toastr,
            dataSearchUrl:"/admins/system-managers/?q=",
            dataClassUrl: "/admins/system-managers/?page=",
            dataClass: "system_managers",
            RequestData: RequestData
        }).initiate();
        console.log($scope.model);

        $scope.searchButton = function () {
            $scope.search = $scope.searchText;
            console.log($scope.search);

            var request = {
                method: 'GET',
                url: RequestData.baseUrl + "/admins/system-managers/?q=" + $scope.search,
                //url: RequestData.baseUrl + "/users/" + $scope.user,
                headers: RequestData.headers
            };

            function successfulResponse(response) {
                $rootScope.UsersList = response.data.users;
                $scope.page_counts = response.data.page_count;
                toastr.success('Search successfull', 'Search success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '1000'
                });
                console.log(response.data);
            }

            function errorResponse(response) {
                toastr.error('Search Error!', 'Not Found');
                console.log(response.data);
            }

            $http(request).then(successfulResponse, errorResponse);
        };
        $rootScope.editAdmin = function ($event) {
            $rootScope.updateAdmin = $event.currentTarget.name;
            // $rootScope.$broadcast('parentId', $rootScope.usersName);
            //console.log($rootScope.updateAdmin);
        };
        $scope.delAdmin = function ($event) {
            $scope.deleteAdmin = $event.currentTarget.name;
            console.log($scope.deleteAdmin);
            var request = {
                method: 'DELETE',
                url: RequestData.baseUrl + "/admins/system-managers/" + $scope.deleteAdmin + "/",
                headers: RequestData.headers
            };
            function successfulResponse(response) {
                console.log(response.data);
                $scope.DelData = response.data;
                toastr.success('Account has been Deleted', 'Delete success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '1000'
                });
            }
            function errorResponse(response) {
                console.log(response.data);
                toastr.error('Update Error!', 'Account has not been updated');
                $scope.DelData = "Wrong";
            }
            $http(request).then(successfulResponse, errorResponse);
            // $window.location.reload();
        };
    }
]);

app.controller("updateAdmin", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {
        var username = document.URL.split("editAdmin/")[1] || document.URL.split("showAdmin/")[1] ;
        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/admins/system-managers/" + username + "/",
            headers: RequestData.headers
        };
        function successfulResponse(response) {
            $scope.adminProfile = response.data;
            toastr.success('Account has been Updated', 'Update success!', {
                progressBar: true,
                "closeButton": false,
                timeOut: '1000'
            });
            console.log(response.data);
        };
        function errorResponse(response) {
            $scope.adminProfile = "Wrong";
            toastr.error('Update Error!', 'Account has not been updated');
            console.log(response.data);
        };
        $http(request).then(successfulResponse, errorResponse);
        //console.log({scope: $scope, state: $state, stateParams: $stateParams});

        $scope.putAdmin = function () {
            var request = {
                method: 'PUT',
                url: RequestData.baseUrl + "/admins/system-managers/" + $rootScope.updateAdmin + "/",
                headers: RequestData.headers,
                data: {
                    "first_name": $scope.adminProfile.system_manager.user.first_name,
                    "last_name": $scope.adminProfile.system_manager.user.last_name,
                    "username": $scope.adminProfile.system_manager.user.username,
                    "email": $scope.adminProfile.system_manager.user.email,
                    "password": $scope.adminProfile.system_manager.user.password
                }
            };
            console.log(request);
            function successfulResponse(response) {
                console.log(response.data);
                toastr.success('Account has been Updated', 'Update success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '1000'
                });
                //console.log(response);
            };
            function errorResponse(response) {
                toastr.error('Update Error!', 'Account has not been updated');
                console.log(response.data);

            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);
app.controller('newAdmin', ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {
        $scope.addAdmin = function () {
            var request = {
                method: 'POST',
                url: RequestData.baseUrl + "/admins/system-managers/register/",
                headers: RequestData.headers,
                data: {
                    "first_name": $scope.admin.first_name,
                    "last_name": $scope.admin.last_name,
                    "username": $scope.admin.username,
                    "email": $scope.admin.email,
                    "password": $scope.admin.password
                }
            };
            console.log(request);
            function successfulResponse(response) {
                toastr.success('New Admin account has been created', 'Upload success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '1000'
                });
                console.log(response);
            };
            function errorResponse(response) {
                toastr.error('Error!', 'Account has not been created');

                /*  (clear: clear,
                 error: error,
                 info: info,
                 remove: remove,
                 success: success,
                 warning: warning)
                 toastr.success('demo@minovate.com, pass: minovate', 'Login default data!', {progressBar: true, "closeButton": false, timeOut: '15000'});
                 */
                console.log(response.data);
            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);


//$scope.$on('parent', function (events, args) {
//console.log(args);
//$scope.userName = args;
//$scope.userssName = $scope.userName[$rootScope.usersName].user.username;
//console.log($scope.userName);
//$scope.usersName = $scope.userName.user.username;






