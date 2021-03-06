'use strict';

app.controller("jobsliveCtrl", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData', 'toastr',

    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData, toastr) {

        $scope.model = new Pagination({
            http:$http,
            pageFilter:"&page=",
            popup:toastr,
            dataSearchUrl:"/jobs/?job_type=live&q=",
            dataClassUrl:"/jobs/?job_type=live&page=",
            dataClass:"jobs",
            RequestData:RequestData
        }).initiate();
        console.log($scope.model);

       /* $scope.currentIndex = -1;
        $scope.getPage = function () {
            var page_count = [];
            for (var i = 1; i <= $scope.page_counts; i++) {
                //console.log($scope.page_counts);
                page_count.push(i);
            }
            $scope.pages = page_count;
        };
        $scope.getPreviousPage = function () {
            if ($scope.currentIndex > 0) {
                $scope.getPageLiveList($scope.currentIndex - 1);
            }
        };
        $scope.getNextPage = function () {
            if ($scope.currentIndex < $scope.page_counts - 1) {
                $scope.getPageLiveList($scope.currentIndex + 1);
            }
        };
        $scope.noPrevious = function () {
            return $scope.pageNumber === 1;
        };
        $scope.noNext = function () {
            return $scope.pageNumber === $scope.page_counts;
        };
        $scope.isActive = function (page) {
            return $scope.pageNumber === page;
        };
        $scope.getPageLiveList = function ($index) {
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
                url: RequestData.baseUrl + "/jobs/?job_type=live&page=" + $scope.pageNumber,
                headers: RequestData.headers
            };

            function successfulResponse(response) {
                $rootScope.jobsliveList = response.data.jobs;
                $scope.page_counts = response.data.page_count;
                $scope.getPage();
                console.log($rootScope.jobsliveList);
            }

            function errorResponse(response) {
                console.log(response.data);
            }

            $http(request).then(successfulResponse, errorResponse);
        };
        $scope.getPageLiveList(0);*/

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
                url: RequestData.baseUrl + "/jobs/?job_type=live&q=" + $scope.search,
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
        $rootScope.editliveJob = function ($event) {
            /*$rootScope.jobsListID = $event.currentTarget.name;
            // $rootScope.$broadcast('parentId', $rootScope.usersName);
            console.log($rootScope.jobsListID);*/
        };
        $scope.delJob = function ($event) {
            $scope.DelJob = $event.currentTarget.name;
            console.log($scope.DelJob);
            var request = {
                method: 'DELETE',
                url: RequestData.baseUrl + "/jobs/" + $scope.DelJob,
                headers: RequestData.headers
            };

            function successfulResponse(response) {
                console.log(response.data);
                toastr.success('Account has been deleted', 'Delete success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '1000'
                });
                $scope.DelData = response.data;
            };
            function errorResponse(response) {
                console.log(response.data);
                toastr.error('Delete Error!', 'Account has not been deleted');
                $scope.DelData = "Wrong";
            };
            $http(request).then(successfulResponse, errorResponse);
            // $window.location.reload();
        };
    }]);

app.controller("editliveJobs", ['$scope', '$rootScope', '$window', '$http', '$filter', '$state', '$stateParams', 'RequestData',
    function ($scope, $rootScope, $window, $http, $state, $filter, $stateParams, RequestData) {

        var jobId = document.URL.split("livejobsEdit/")[1] || document.URL.split("jobsliveShow/")[1];
        console.log(jobId);
        var request = {
            method: 'GET',
            url: RequestData.baseUrl + "/jobs/" + jobId + "/",
            headers: RequestData.headers
        };

        function successfulResponse(response) {
            $scope.jobProfile = response.data;

            $scope.jobProfile.job.is_granted = $scope.jobProfile.job.is_granted === true ? "Onayland??" : $scope.jobProfile.job.is_granted === false ? "Reddedildi" : "Beklemede";
            $scope.jobProfile.job.is_in_progress = $scope.jobProfile.job.is_in_progress === true ? "Onayland??" : $scope.jobProfile.job.is_in_progress === false ? "Reddedildi" : "Beklemede";

            console.log(response.data);
        };
        function errorResponse(response) {
            console.log(response.data);
            $scope.jobProfile = "Wrong";
        };
        $http(request).then(successfulResponse, errorResponse);
        //console.log({scope: $scope, state: $state, stateParams: $stateParams});

        $scope.jobliveupdate = function () {

            var isGranted = $scope.jobProfile.job.is_granted === "Onayland??" ? true : $scope.jobProfile.job.is_granted === "Reddedildi" ? false : null;

            var isProgress = $scope.jobProfile.job.is_in_progress === "Onayland??" ? true : $scope.jobProfile.job.is_in_progress === "Reddedildi" ? false : null;

            var request = {
                method: 'PUT',
                url: RequestData.baseUrl + "/jobs/" + $rootScope.jobsListID + "/",
                headers: RequestData.headers,
                data: {
                    "is_granted": isGranted,
                    "is_in_progress": isProgress
                }
            };

            console.log(request);

            function successfulResponse(response) {
                toastr.success('Job has been Updated', 'Update success!', {
                    progressBar: true,
                    "closeButton": false,
                    timeOut: '15000'
                });
                console.log(response);
            };
            function errorResponse(response) {
                toastr.error('Error!', 'Job has not been updated');
                console.log(response.data);
            };
            $http(request).then(successfulResponse, errorResponse);
        };
    }]);






