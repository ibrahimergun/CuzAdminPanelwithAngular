'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("/", {
            url: '/',
            templateUrl: "views/pages/login.html"
        })
        .state("home", {
            url: '/home',
            templateUrl: "views/pages/home.html"
        })
        .state("home.dashboard", {
            url: '/dashboard',
            templateUrl: "views/pages/dashboard.html"
        })

        .state("home.docjobs", {
            url: '/docjobs',
            templateUrl: "views/pages/jobs/list.html"
        })
        .state("home.livejobs", {
            url: '/livejobs',
            templateUrl: "views/pages/jobs/livelist.html"
        })
        .state("home.jobsEdit", {
            url: '/jobsEdit/{id}',
            templateUrl: "views/pages/jobs/edit.html",
            controller: 'editdocJobs'
        })
        .state("home.livejobsEdit", {
            url: '/livejobsEdit/{id}',
            templateUrl: "views/pages/jobs/liveedit.html",
            controller: 'editliveJobs'
        })
        .state("home.jobsShow", {
            url: '/jobsShow/{id}',
            templateUrl: "views/pages/jobs/show.html",
            controller: 'editdocJobs'
        })
        .state("home.jobsliveShow", {
            url: '/jobsliveShow/{id}',
            templateUrl: "views/pages/jobs/liveshow.html",
            controller: 'editliveJobs'
        })
        .state("home.users", {
            url: '/users',
            templateUrl: "views/pages/users/list.html"
        })
        .state("home.translatorsList", {
            url: '/translatorsList',
            templateUrl: "views/pages/users/listTranslator.html"
        })
        .state("home.editTranslator", {
            url: "/editTranslator/{id}",
            templateUrl: "views/pages/users/editTranslator.html",
            params: {new_param: null}
        })
        .state("home.showTranslator", {
            url: "/showTranslator/{id}",
            templateUrl: "views/pages/users/showTranslator.html",
            controller: 'translatorsCtrl'
        })
        .state("home.userEdit", {
            url: "/userEdit/{id}",
            templateUrl: "views/pages/users/edit.html",
            params: {new_param: null}
        })
        .state("home.usersShow", {
            url: "/usersShow/{id}",
            templateUrl: "views/pages/users/show.html",
            controller: 'UsersCtrl'
        })


        .state("home.admin", {
            url: '/admin',
            templateUrl: "views/pages/admin/list.html"
        })
        .state("home.newAdmin", {
            url: '/newAdmin',
            templateUrl: "views/pages/admin/new.html",
            controller: 'newAdmin'
        })
        .state("home.editAdmin", {
            url: '/editAdmin/{id}',
            templateUrl: "views/pages/admin/edit.html",
        })
        .state("home.showAdmin", {
            url: '/showAdmin/{id}',
            templateUrl: "views/pages/admin/show.html",
        })

        .state("home.trequest", {
            url: '/trequest',
            templateUrl: "views/pages/translator/list.html"
        })
        .state("home.trequestEdit", {
            url: '/trequestEdit/{id}',
            templateUrl: "views/pages/translator/edit.html"

        })

        .state("home.economy", {
            url: '/economy',
            controller: 'Main',
            templateUrl: "views/pages/economy/list.html"

        })


        .state("home.support", {
            url: '/support',
            controller: 'Main',
            templateUrl: "views/pages/support/list.html"
        })
        .state("home.supportShow", {
            url: '/supportShow/{id}',
            controller: 'SupportController',
            templateUrl: "views/pages/support/show.html"

        })
        .state("home.readme", {
            url: '/readme',
            templateUrl: "views/pages/readme.html"

        })
});

app.run(function ($rootScope, $state) {

    $rootScope.$state = $state;

});

app.controller("PostController", function ($scope, PostFactory, $stateParams) {
    $scope.posts = PostFactory.posts[$stateParams.id];

});

app.controller("JobController", function ($scope, PostJobFactory, $stateParams) {
    $scope.jobs = PostJobFactory.jobs[$stateParams.id];

});

app.controller("SupportController", function ($scope, PostSupportFactory, $stateParams) {
    $scope.support = PostSupportFactory.support[$stateParams.id];

});


app.controller("Main", function ($scope, PostFactory, PostJobFactory, PostEcoFactory, PostSupportFactory, $location, toastr) {
    $scope.posts = PostFactory.posts;
    $scope.jobs = PostJobFactory.jobs;
    $scope.eco = PostEcoFactory.eco;
    $scope.support = PostSupportFactory.support;


    $scope.Login = function (email, name) {
        $scope.user = "";
        for (var a = 0; a < $scope.posts.length; a++) {
            if ($scope.posts[a].Name == name) {
               // alert("Kullanıcı giriş yaptı. " + name);
                $scope.user = name;
            }
            else {
            }
        }
        if ($scope.user != "") {
            $location.path('home/dashboard')
        }
        else {
            toastr.error('Error!', 'Oops! User name or password wrong. Please again.');
           // alert("Kullanıcı adı veya şifre yanlış");
        }
    };

    $scope.Logout = function () {
        localStorage["Token"] = "";
        $location.path('/')
    };

});

app.factory("PostFactory", function () {

    var obj = {
        posts: [
            {
                "id": "1",
                "Name": "Hüseyin",
                "Email": "h@h.com",
                "Role": "User",
                "MemberDate": "10.10.2016"
            },
            {
                "id": "2",
                "Name": "Hakan",
                "Email": "h@h.com",
                "Role": "Translater",
                "MemberDate": "10.10.2016"
            },
            {
                "id": "3",
                "Name": "Halil",
                "Email": "h@h.com",
                "Role": "User",
                "MemberDate": "10.10.2016"
            },
            {
                "id": "4",
                "Name": "Kerim",
                "Email": "h@h.com",
                "Role": "Translater",
                "MemberDate": "10.10.2016"
            },
            {
                "id": "5",
                "Name": "Ahmet",
                "Email": "h@h.com",
                "Role": "User",
                "MemberDate": "10.10.2016"
            }
        ]

    };

    return obj;
});

app.factory("PostJobFactory", function () {

    var obj = {
        jobs: [
            {
                "id": "1",
                "JobName": "Translate",
                "JobUser": "Hüseyin",
                "State": "Wait",
                "JobDate": "10.10.2015"
            },
            {
                "id": "2",
                "JobName": "Translate",
                "JobUser": "Hakan",
                "State": "Tranlated",
                "JobDate": "10.10.2015"
            },
            {
                "id": "3",
                "JobName": "Translate",
                "JobUser": "Halil",
                "State": "Wait",
                "JobDate": "10.10.2015"
            },
            {
                "id": "4",
                "JobName": "Translate",
                "JobUser": "Kerim",
                "State": "Tranlated",
                "JobDate": "10.10.2015"
            },
            {
                "id": "5",
                "JobName": "Translate",
                "JobUser": "Ahmet",
                "State": "Wait",
                "JobDate": "10.10.2015"
            }
        ]

    };

    return obj;
});

app.factory("PostEcoFactory", function () {

    var obj = {
        eco: [
            {
                "id": "1",
                "JobName": "Translate",
                "JobUser": "Hüseyin",
                "Price": "20",
                "State": "Payment received"
            },
            {
                "id": "2",
                "JobName": "Translate",
                "JobUser": "Hakan",
                "Price": "50",
                "State": "Wait"
            },
            {
                "id": "3",
                "JobName": "Translate",
                "JobUser": "Halil",
                "Price": "100",
                "State": "Payment received"
            },
            {
                "id": "4",
                "JobName": "Translate",
                "JobUser": "Kerim",
                "Price": "45",
                "State": "Wait"
            },
            {
                "id": "5",
                "JobName": "Translate",
                "JobUser": "Ahmet",
                "Price": "75",
                "State": "Payment received"
            }
        ]

    };

    return obj;
});

app.factory("PostSupportFactory", function () {

    var obj = {
        support: [
            {
                "id": "1",
                "JobName": "Translate",
                "JobUser": "Hüseyin",
                "TranslateUser": "Ali",
                "Subject": "Late",
                "Message": "My file is wrong translate"

            },
            {
                "id": "2",
                "JobName": "Translate",
                "JobUser": "Hakan",
                "TranslateUser": "Veli",
                "Subject": "There are some wrong",
                "Message": "There are some wrong my project"
            },
            {
                "id": "3",
                "JobName": "Translate",
                "JobUser": "Halil",
                "TranslateUser": "John",
                "Subject": "to late",
                "Message": "My file is wrong translate"
            },
            {
                "id": "4",
                "JobName": "Translate",
                "JobUser": "Kerim",
                "TranslateUser": "Khan",
                "Subject": "Hurry up!",
                "Message": "My file is wrong translate"
            },
            {
                "id": "5",
                "JobName": "Translate",
                "JobUser": "Ahmet",
                "TranslateUser": "Can",
                "Subject": ".Thanks",
                "Message": "My file is very nice. Tahnks"
            }
        ]

    };
    return obj;
});