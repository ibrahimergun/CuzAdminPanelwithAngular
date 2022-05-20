/**
 * Created by ibrahimergun on 12/04/2017.
 */
'use strict';

app.controller("translatorsCtrl", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$location', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $location, $filter, $stateParams, RequestData, toastr) {

        $scope.model = new Pagination({
            http: $http,
            pageFilter:"&page=",
            popup:toastr,
            dataSearchUrl:"/translators/?q=",
            dataClassUrl: "/translators/?page=",
            dataClass: "translators",
            RequestData: RequestData
        }).initiate();
        console.log($scope.model);


        $scope.searchButton = function ($index) {
            $scope.search = $scope.searchText;
            console.log($scope.search);

            if ($index === $scope.currentIndex) {
                return;
            }
            $scope.pageNumber = $index + 1;
            console.log($index);
            if ($index !== undefined) {
                $scope.currentIndex = $index;
            }

            var request = {
                method: 'GET',
                url: RequestData.baseUrl + "/translators/?q=" + $scope.search,
                headers: RequestData.headers
            };

            function successfulResponse(response) {
                $rootScope.UsersList = response.data.users;
                $scope.page_counts = response.data.page_count;
                $scope.getPage();
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

        $rootScope.editsTranslator = function ($event) {
            $rootScope.translatorsName = $event.currentTarget.name;
            // $rootScope.$broadcast('parentId', $rootScope.usersName);
            console.log($rootScope.translatorsName);
        };

        $scope.delTranslator = function ($event) {
            $scope.Deltranslator = $event.currentTarget.name;
            console.log($scope.Deltranslator);
            var request = {
                method: 'DELETE',
                url: RequestData.baseUrl + "/translators/" + $scope.Deltranslator + "/",
                headers: RequestData.headers
            };

            function successfulResponse(response) {
                console.log(response.data);
                $scope.DelData = response.data;
                toastr.success('Account has been Deleted', 'Delete success!');
            };
            function errorResponse(response) {
                console.log(response.data);
                toastr.error('Error!', 'Account has not been deleted');
                //$scope.DelData = "Wrong";
            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);

app.controller("editTranslators", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',
    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {
        //$scope.$on('parentId', function (events, args) {
        // console.log(args);
        //});
        var translatorName = document.URL.split("editTranslator/")[1] || document.URL.split("showTranslator/")[1];
        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/translators/" + translatorName + "/",
            headers: RequestData.headers
        };

        function successfulResponse(response) {
            $scope.translatorProfile = response.data;
            console.log(response.data);
        };
        function errorResponse(response) {
            console.log(response.data);
            $scope.translatorProfile = "Wrong";
            //toastr.error('Error!', 'Account has not been Updated');
        };
        $http(request).then(successfulResponse, errorResponse);
        console.log({scope: $scope, state: $state, stateParams: $stateParams});

        $scope.updateTranslator = function () {
            var translatorName = document.URL.split("editTranslator/")[1] || document.URL.split("showTranslator/")[1];
            var request = {
                method: 'PUT',
                url: RequestData.baseUrl + "/users/" + translatorName + "/",
                headers: RequestData.headers,
                data: {
                    "gender": $scope.translatorProfile.translator.user_profile.user.gender,
                    "first_name": $scope.translatorProfile.translator.user_profile.user.first_name,
                    //"birthday": $scope.userProfile.profile.user.birthday,
                    //"date_joined": $scope.userProfile.profile.user.date_joined,
                    "last_name": $scope.translatorProfile.translator.user_profile.user.last_name,
                    "phone": $scope.translatorProfile.translator.user_profile.user.phone,
                    "bio": $scope.translatorProfile.translator.user_profile.bio,
                    "address": $scope.translatorProfile.translator.user_profile.address,
                    "username": $scope.translatorProfile.translator.user_profile.user.username,
                    "email": $scope.translatorProfile.translator.user_profile.user.email
                }
            };
            console.log(request);

            function successfulResponse(response) {
                console.log(response);
                toastr.success('Account has been Updated', 'Update success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '15000'
                });
            };
            function errorResponse(response) {
                console.log(response);
                toastr.error('Update Error!', 'Account has not been updated');
            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);







