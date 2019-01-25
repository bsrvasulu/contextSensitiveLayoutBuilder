
(function (angular) {
    'use strict';
    var theModule = angular.module('mainApp', ['ngRoute', 'smart-table']);
    theModule.config(function ($routeProvider) {
        $routeProvider
            .when('/buildHSLayout', {
                templateUrl: 'app/buildModule/buildHSLayout.html',
                controller: 'buildHSLayoutCtrl'
            })
            .when('/viewHSLayout', {
                templateUrl: 'app/demoLayoutModule/demoLayout.html',
                controller: 'demoLayoutCtrl'
            })
            .when('/test', {
                templateUrl: 'app/indexModule/index.html',
                controller: 'indexCtrl'
            })
            .when('/', {
                templateUrl: 'app/buildModule/buildHSLayout.html',
                controller: 'buildHSLayoutCtrl'
            })
;
    });
})(window.angular);