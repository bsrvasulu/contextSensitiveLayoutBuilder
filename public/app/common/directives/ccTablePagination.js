
(function (angular) {
    'use strict';
    angular.module("mainApp").directive('ccTablePagination', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: '/app/common/directives/tablePagination.html'
            };
        }
    ]);

})(window.angular);