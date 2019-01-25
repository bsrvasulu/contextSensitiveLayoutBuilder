
(function (angular) {
    'use strict';
    angular.module('mainApp').controller('indexCtrl', [
        '$scope', '$rootScope', '$compile', 'indexService', '$log',
        '$timeout',
        function ($scope, $rootScope, $compile, indexService, $log, $timeout) {
            $scope.title = 'Hotspot Plant Layout';
            $scope.selectedHotSpotId = null;
            $scope.mapHotspotSelected = false;
            $scope.hotspots = null;
            $scope.hotspotsDivId = null;
            $scope.newIdCounter = 2;
            $scope.hotspots_intial = {
                main_image: {
                    src: '/images/plant-layout.jpg'
                },
                hot_spot_click_event: 'handleClickHotspot',
                hot_spot_mouseover_event: 'handleHotSpotMouseover',
                hot_spot_mouseout_event: 'handleHotSpotMouseout',
                hot_spots: {
                    'hs-3': {
                        src: "/images/3d-printer.svg",
                        left: '27em',
                        top: '9em',
                        width: '2.2em'
                    },
                    'hs-2': {
                        src: "/images/settings.svg",
                        left: '47em',
                        top: '11em',
                        width: '2.2em'
                    }
                }
            };

            $scope.hotspotsEventHandler = {
                'hs-3': {
                    title: 'Sputter',
                    subTitle: 'SV 702',
                    description: 'Contact Joe',
                    src: "/images/sputter.jpg"

                },
                'hs-2':{
                    title: 'Lube',
                    subTitle: 'LB 702',
                    description: 'Contact Ken',
                    src: "/images/lube.jpg"
                },
                'hs-4':{
                    title: 'Lube',
                    subTitle: 'LB 720',
                    description: 'Contact Mitch',
                    src: "/images/luber720.jpg"
                },
                'hs-5':{
                    title: 'Lube',
                    subTitle: 'LB 720',
                    description: 'Contact Mitch',
                    src: "/images/luber720.jpg"
                }
            };

            $scope.hotSpotSelectAction = function(e){
                if($scope.selectedHotSpotId != null) {
                    $('#' + $scope.selectedHotSpotId).removeClass('hotspot-selected');
                }

                $scope.selectedHotSpotId = e.currentTarget.id;
                $log.log('$scope.hotSpotSelectAction - selected hotspot id = ' + $scope.selectedHotSpotId );
                //$('.hotSpot').removeClass('hotspot-selected');
                $('#'+ $scope.selectedHotSpotId).addClass('hotspot-selected');
                //$('#'+tourId+'_'+map.id +'_'+ hotSpot.id+'_FP').draggable();
                //$('#'+tourId+'_'+map.id +'_'+ hotSpot.id+'_FP').draggable('enable');
                $scope.mapHotspotSelected = true;
            };

            function handleClickHotspot(e){
                var position = $('#'+e.currentTarget.id).offset();
                var position2 = $('#plant-hs-layout').offset();
                var height = $('#'+e.currentTarget.id).height();
                var width = $('#'+e.currentTarget.id).width();
                $log.log('position: ' + JSON.stringify(position));
                $log.log('position: ' + $(position.top).toEm());
                $log.log('position2: ' + $(position2.top).toEm());
                $log.log('diff: ' + (parseFloat($(position.top).toEm()) - parseFloat($(position2.top).toEm())));

                // alert('currentTarget: ' + JSON.stringify($scope.hotspots[e.currentTarget.id].src));
                $('#side-details').attr('src', $scope.hotspotsEventHandler[e.currentTarget.id].src);
                $('#side-details-topid').text($scope.hotspotsEventHandler[e.currentTarget.id].title);
                $('#side-details-middleid').text($scope.hotspotsEventHandler[e.currentTarget.id].subTitle);
                $('#side-details-bottontitleid').text($scope.hotspotsEventHandler[e.currentTarget.id].subTitle);
                $('#side-details-details').text($scope.hotspotsEventHandler[e.currentTarget.id].description);

                $scope.hotSpotSelectAction(e);
            }

            function appendSpeechBubble() {
                var $speechBubble = $('<div>').addClass('speech-bubble zoomIn animated');
                $('.container').append($speechBubble);
            }

            function handleHotSpotMouseover(e) {
                $log.log('currentTarget-id: ' + e.currentTarget.id);
                //$log.log('$scope.hotspots: ' + JSON.stringify($scope.hotspots));
                $log.log('currentTarget: ' + JSON.stringify($scope.hotspotsEventHandler[e.currentTarget.id]));
                var $currentHotSpot = $(e.currentTarget),
                    currentIndex = $currentHotSpot.index(),
                    $speechBubble = $('.speech-bubble'),
                    hotSpotTop = $currentHotSpot.offset().top - 40,
                    hotSpotLeft = $currentHotSpot.offset().left,
                    hotSpotHalfSize = $currentHotSpot.width() / 2,
                    speechBubbleHalfSize = $speechBubble.width() / 2,
                    topTarget = hotSpotTop - $speechBubble.height(),
                    leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;

                $speechBubble.empty();
                $speechBubble.append($('<h1>').text($scope.hotspotsEventHandler[e.currentTarget.id].title));
                $speechBubble.append('<img id="theImg" src= "'+ $scope.hotspotsEventHandler[e.currentTarget.id].src+'" style="width: 11em; height: auto;" />');
                $speechBubble.append($('<p>').text($scope.hotspotsEventHandler[e.currentTarget.id].description));

                $speechBubble.css({
                    'top': topTarget - 175,
                    'left': leftTarget - 250,
                    'display': 'block'
                }).stop().animate({
                    opacity: 1
                }, 200);
            }

            function handleHotSpotMouseout(e){
                $log.log('handleHotSpotMouseout: ' + e.currentTarget.id);
                var $speechBubble = $('.speech-bubble');
                $speechBubble.stop().animate({
                    opacity: 0
                }, 200, function(){
                    $speechBubble.hide();
                });
                //$('#'+ $scope.selectedHotSpotId).removeClass('hotspot-selected');
                //$log.log('class hotspot-selected removed');
            }

            $scope.addHotSpot = function() {
                $log.log($('input[name=hsTypeRadio]:checked').val());
                var hotSpotJson = {
                    src: "/images/map-placeholder-dark-symbol.svg",
                    left: '0em',
                    top: '0em',
                    width: '2.2em'
                };
                var hotSpotId = 'hs-' + $scope.newIdCounter++;
                $log.log('new hotSpotId: ' + hotSpotId);
                var $hotSpot = $('<div>').addClass('image-overlay overlay-image hotspotImage');
                if ($('input[name=hsTypeRadio]:checked').val() == 'image') {
                    $hotSpot.append('<img id="'+ hotSpotId + '" class="hot-spot" src= "'+hotSpotJson.src+'" style="left: ' + hotSpotJson.left +'; top: ' + hotSpotJson.top +'; width: ' + hotSpotJson.width + '" />');
                }else {
                    $hotSpot.append('<span id="' + hotSpotId + '" class="hot-spot floorPlanPoint" ' + ' style="left: ' + hotSpotJson.left + '; top: ' + hotSpotJson.top + '; " />');
                }
                $('#' + $scope.hotspotsDivId).append($hotSpot);
                $('.hot-spot').on('mouseover', eval($scope.hotspots['hot_spot_mouseover_event']));
                $('.hot-spot').on('mouseout', eval($scope.hotspots['hot_spot_mouseout_event']));
                $('.hot-spot').on('click', eval($scope.hotspots['hot_spot_click_event']));
                $( ".hot-spot" ).draggable();
            };

            function buildHotSpotPlantLayout(tagId, hsJSONObj){
                $scope.hotspots = jQuery.extend(true, {}, hsJSONObj);
                $scope.hotspotsDivId = tagId;
                var $hotSpotMap = $('<div>').addClass('image-overlay overlay-image');
                $hotSpotMap.append('<img id="main_image" src= "'+ hsJSONObj['main_image'].src+'" style="" />');
                $('#' + tagId).append($hotSpotMap);//'<img id="main_image" src= "'+ hsJSONObj['main_image'].src+'" style="" />');
                for(var hotSpot in hsJSONObj['hot_spots']) {
                    $log.log(hotSpot);
                    var hotSpotJson = hsJSONObj['hot_spots'][hotSpot];
                    var $hotSpot = $('<div>').addClass('image-overlay overlay-image hotspotImage');
                    $hotSpot.append('<img id="'+ hotSpot + '" class="hot-spot" src= "'+hotSpotJson.src+'" style="left: ' + hotSpotJson.left +'; top: ' + hotSpotJson.top +'; width: ' + hotSpotJson.width + '" />');
                    $('#' + tagId).append($hotSpot);
                    $scope.newIdCounter++;
                }
                $('.hot-spot').on('mouseover', eval($scope.hotspots['hot_spot_mouseover_event']));
                $('.hot-spot').on('mouseout', eval($scope.hotspots['hot_spot_mouseout_event']));
                $('.hot-spot').on('click', eval($scope.hotspots['hot_spot_click_event']));
            }

            $timeout(function () {
                buildHotSpotPlantLayout('plant-hs-layout', $scope.hotspots_intial);
                appendSpeechBubble();

                $( "#et-slider-wrapper" ).draggable();
                $( ".hot-spot" ).draggable();
                $( ".hot-spot" ).draggable( 'disable' );
                // $scope.graphDiv = document.getElementById('scatterPlotDiv');
                // $("#layoutPlant").elevateZoom({zoomWindowPosition: 10});
                // {
                //     zoomType : "lens",
                //     lensShape : "round",
                //     lensSize    : 200
                // });
                $( "#removeHSbtn" ).click(function() {
                    if($scope.selectedHotSpotId !== null) {
                        $("#" + $scope.selectedHotSpotId).remove();
                    }
                });

                $( "#addHSbtn" ).click(function() {
                        $scope.addHotSpot();
                });

            }, 200);
        }
    ]);
})(window.angular);