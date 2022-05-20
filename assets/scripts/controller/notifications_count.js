/**
 * Created by ibrahimergun on 17/04/2017.
 */
app.controller("translatorRequestCount", ['$scope', '$rootScope', '$http', '$state', 'RequestData',

    function ($scope, $rootScope, $http, $state, RequestData) {

        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/translator-requests/",
            headers: RequestData.headers
        };
        function successfulResponse(response) {
            $scope.request_counts = response.data.request_count;
            console.log($scope.request_counts);
        }
        function errorResponse(response) {
            console.log(response.data);
        }
        $http(request).then(successfulResponse, errorResponse);
    }]);
app.controller("jobsCount", ['$scope',  '$http', '$state', 'RequestData',
    function ($scope, $http, $state, RequestData) {
        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/jobs/",
            headers: RequestData.headers
        };
        function successfulResponse(response) {
            $scope.request_counts = response.data.job_count;
            console.log(response.data);
        }
        function errorResponse(response) {
            console.log(response.data);
        }
        $http(request).then(successfulResponse, errorResponse);
    }]);



