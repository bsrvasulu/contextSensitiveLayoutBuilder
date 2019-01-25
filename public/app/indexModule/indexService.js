
(function (angular) {
    'use strict';
    angular.module('mainApp').factory('indexService', [
        '$http', '$log', function ($http, $log) {
            var hotSpotLayout = {};

            var getHotSpotLayout = function () {
                return $.extend(true, {}, hotSpotLayout);
            };

            var setHotSpotLayout = function (jsonObj) {
                hotSpotLayout = $.extend(true, {}, jsonObj);
            };

            return {
                getHotSpotLayout: getHotSpotLayout,
                setHotSpotLayout: setHotSpotLayout
            };
        }
    ]);


})(window.angular);