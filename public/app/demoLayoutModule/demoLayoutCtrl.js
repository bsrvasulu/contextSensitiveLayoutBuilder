
(function (angular) {
    'use strict';
    angular.module('mainApp').controller('demoLayoutCtrl', [
        '$scope', '$rootScope', '$compile', 'indexService', '$log',
        '$timeout',
        function ($scope, $rootScope, $compile, indexService, $log, $timeout) {
            $scope.title = 'View Layout';
            $scope.selectedHotSpotId = null;
            $scope.mapHotspotSelected = false;
            $scope.hotspotsDivId = null;
            $scope.hotspotPlant = {
                "image_dir": "/images/",
                "hot_spot_click_event": "handleClickHotspot",
                "hot_spot_mouseover_event": "handleHotSpotMouseover",
                "hot_spot_mouseout_event": "handleHotSpotMouseout",
                "hot_spots": {
                    "hs-2": {
                        "identifier": "Sputter",
                        "src": "map-placeholder-dark-symbol.svg",
                        "left": "10.00em",
                        "top": "5.07em",
                        "width": "8.07em",
                        "type": "rectangle",
                        "height": "18.50em"
                    },
                    "hs-3": {
                        "identifier": "Tester",
                        "src": "map-placeholder-dark-symbol.svg",
                        "left": "8.93em",
                        "top": "26.71em",
                        "width": "15.50em",
                        "type": "rectangle",
                        "height": "4.50em"
                    }
                },
                "main_image": {
                    "src": "plant-layout.jpg"
                }
            };


            $scope.hotspotSputter = {
                "image_dir": "/images/",
                "hot_spot_click_event": "handleClickHotspot",
                "hot_spot_mouseover_event": "handleHotSpotMouseover",
                "hot_spot_mouseout_event": "handleHotSpotMouseout",
                "hot_spots": {
                    "hs-2": {
                        "identifier": "SP002",
                        "src": "map-placeholder-dark-symbol.svg",
                        "left": "12.21em",
                        "top": "7.29em",
                        "width": "1.64em",
                        "type": "image",
                        "height": "1.64em"
                    },
                    "hs-3": {
                        "identifier": "SP003",
                        "src": "map-placeholder-dark-symbol.svg",
                        "left": "12.71em",
                        "top": "29.29em",
                        "width": "1.50em",
                        "type": "mark",
                        "height": "1.50em"
                    }
                },
                "main_image": {
                    "src": "sputter-layout2.png"
                }
            };

            $scope.hotspotLube = {
                "image_dir": "/images/",
                "hot_spot_click_event": "handleClickHotspot",
                "hot_spot_mouseover_event": "handleHotSpotMouseover",
                "hot_spot_mouseout_event": "handleHotSpotMouseout",
                "hot_spots": {
                    "hs-2": {
                        "identifier": "LUBE01",
                        "src": "map-placeholder-dark-symbol.svg",
                        "left": "35.71em",
                        "top": "9.29em",
                        "width": "1.50em",
                        "type": "mark",
                        "height": "1.50em"
                    },
                    "hs-3": {
                        "identifier": "LUBE02",
                        "src": "map-placeholder-dark-symbol.svg",
                        "left": "41.29em",
                        "top": "3.64em",
                        "width": "1.50em",
                        "type": "mark",
                        "height": "1.50em"
                    }
                },
                "main_image": {
                    "src": "layout-lube.png"
                }
            };

            $scope.hotspotsEventHandler = {
                'Sputter': {
                    title: 'Sputter',
                    subTitle: 'Sputter Area',
                    description: 'Contact Foo',
                    src: "/images/sputter.jpg"
                },
                'Tester': {
                    title: 'Tester',
                    subTitle: 'Tester',
                    description: 'Contact Foo',
                    src: "/images/lube.jpg"
                },
                'LUBE01':{
                    title: 'LUBE01',
                    subTitle: 'LUBE01',
                    description: 'Contact Ken',
                    src: "/images/lube.jpg"
                },
                'LUBE02':{
                    title: 'LUBE02',
                    subTitle: 'LUBE02',
                    description: 'Contact Foo',
                    src: "/images/lube.jpg"
                },
                'SP002':{
                    title: 'SP002',
                    subTitle: 'SP002',
                    description: 'Contact Foo',
                    src: "/images/sputter.jpg"
                },
                'SP003':{
                    title: 'SP003',
                    subTitle: 'SP003',
                    description: 'Contact Foo',
                    src: "/images/sputter.jpg"
                }
            };
            $scope.hotspotsLayout = null;

            $scope.hotSpotSelectAction = function(e){
                if($scope.selectedHotSpotId != null) {
                    $('#' + $scope.selectedHotSpotId).removeClass('hotspot-selected');
                }
                var identifier = $scope.hotspotsLayout.hot_spots[e.currentTarget.id].identifier;
                $scope.selectedHotSpotId = e.currentTarget.id;
                $log.log('$scope.hotSpotSelectAction - selected hotspot id = ' + $scope.selectedHotSpotId );
                //$('.hotSpot').removeClass('hotspot-selected');
                $('#'+ $scope.selectedHotSpotId).addClass('hotspot-selected');
                //$('#'+tourId+'_'+map.id +'_'+ hotSpot.id+'_FP').draggable();
                //$('#'+tourId+'_'+map.id +'_'+ hotSpot.id+'_FP').draggable('enable');
                $scope.mapHotspotSelected = true;
                if(identifier === 'Sputter') {
                    $scope.hotspotsLayout = $scope.hotspotSputter;//indexService.getHotSpotLayout();
                    hotspotBuilder.buildHotSpotPlantLayout('plant-hs-layout', $scope.hotspotsLayout);
                    hotspotBuilder.addHotSpotEventHandler($scope.hotspotsEventHandler, $scope.hotSpotSelectAction);
                    hotspotBuilder.appendSpeechBubble();
                }
            };

            $timeout(function () {
                $scope.hotspotsLayout = jQuery.extend(true, {}, $scope.hotspotPlant);
                $scope.hotspotsDivId = 'plant-hs-layout';
                hotspotBuilder.buildHotSpotPlantLayout('plant-hs-layout', $scope.hotspotsLayout);
                $scope.hotspotsDivId = 'plant-hs-layout';
                hotspotBuilder.appendSpeechBubble();
                hotspotBuilder.addHotSpotEventHandler($scope.hotspotsEventHandler, $scope.hotSpotSelectAction);
                $("#et-slider-wrapper").draggable();
                $('#et-slider-wrapper').hide();

            }, 200);
        }
    ]);
})(window.angular);