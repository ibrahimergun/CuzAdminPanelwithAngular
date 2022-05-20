'use strict';

app.controller("translatorCtrl", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {

        $scope.model = new Pagination({
            http:$http,
            pageFilter:"&page=",
            popup:toastr,
            dataSearchUrl:"/translator-requests/?q=",
            dataClassUrl:"/translator-requests/?page=",
            dataClass:"translator_requests",
            RequestData:RequestData
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
                url: RequestData.baseUrl + "/translator-requests/?q=" + $scope.search,
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
        $rootScope.editTranslator = function ($event) {
            $rootScope.translatorID = $event.currentTarget.name;
            // $rootScope.$broadcast('parentId', $rootScope.usersName);
            //console.log($rootScope.usersName);
        };
    }]);
app.controller("editTranslator", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',
    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {
        //$scope.$on('parentId', function (events, args) {
        // console.log(args);
        //});
        var translatorId = document.URL.split("trequestEdit/")[1];
        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/translator-requests/" + translatorId + "/",
            headers: RequestData.headers
        };

        function successfulResponse(response) {
            $scope.translatorProfile = response.data;
            console.log($scope.translatorProfile);
        };
        function errorResponse(response) {
            console.log(response);
            $scope.translatorProfile = "Wrong";
        };
        $http(request).then(successfulResponse, errorResponse);
        //console.log({scope: $scope, state: $state, stateParams: $stateParams});

        $scope.update = function () {
            var isGranted = $scope.translatorProfile.translator_request.is_granted === "Onayla" ? true : false;
            var request = {
                method: 'PUT',
                url: RequestData.baseUrl + "/translator-requests/" + $rootScope.translatorID + "/",
                headers: RequestData.headers,
                data: {
                    "is_granted": isGranted
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
                console.log(response.data);
                toastr.error('Update Error!', 'Account has not been updated');
            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);