
(function (angular) {
    'use strict';
    angular.module('mainApp').controller('buildHSLayoutCtrl', [
        '$scope', '$rootScope', '$compile', 'indexService', '$log',
        '$timeout',
        function ($scope, $rootScope, $compile, indexService, $log, $timeout) {
            $scope.title = 'Build Layout';
            $scope.selectedHotSpotId = null;
            $scope.mapHotspotSelected = false;
            //$scope.hotspots = null;
            $scope.hotspotsDivId = null;
            $scope.newIdCounter = 2;
            $scope.plantLayoutSrc = "";
            $scope.plantLayoutSrcBinary = null;

            $scope.hotspots_intial = {
                image_dir: '/images/',
                hot_spot_click_event: 'handleClickHotspot',
                hot_spot_mouseover_event: 'handleHotSpotMouseover',
                hot_spot_mouseout_event: 'handleHotSpotMouseout',
                hot_spots: {
                }
            };

            $scope.hotSpotSelectAction = function(e){
                if($scope.selectedHotSpotId != null) {
                    $('#' + $scope.selectedHotSpotId).removeClass('hotspot-selected');
                }

                $scope.selectedHotSpotId = e.currentTarget.id;
                $log.log('$scope.hotSpotSelectAction - selected hotspot id = ' + $scope.selectedHotSpotId );
                $('#'+ $scope.selectedHotSpotId).addClass('hotspot-selected');
                $scope.mapHotspotSelected = true;
            };

            function handleClickHotspot(e){
                var position = $('#'+e.currentTarget.id).offset();
                var position2 = $('#plant-hs-layout').offset();
                var height = $('#'+e.currentTarget.id).height();
                var width = $('#'+e.currentTarget.id).width();
                $log.log('position: ' + JSON.stringify(position));
                $log.log('position2: ' + JSON.stringify(position2));
                $log.log('width: ' + width);
                if(($scope.hotspots_intial.hot_spots[e.currentTarget.id] !== undefined) &&($scope.hotspots_intial.hot_spots[e.currentTarget.id] != null)){
                    //update hotspot position
                    $scope.hotspots_intial.hot_spots[e.currentTarget.id].top = (parseFloat($(position.top).toEm()) - parseFloat($(position2.top).toEm())).toFixed(2)+'em';
                    $scope.hotspots_intial.hot_spots[e.currentTarget.id].left = (parseFloat($(position.left).toEm()) - parseFloat($(position2.left).toEm())).toFixed(2)+'em';
                    $scope.hotspots_intial.hot_spots[e.currentTarget.id].height = (parseFloat($(height).toEm())).toFixed(2)+'em';
                    $scope.hotspots_intial.hot_spots[e.currentTarget.id].width = (parseFloat($(width).toEm())).toFixed(2)+'em';

                    //$log.log('addHotSpot - $scope.hotspots_intial: ' + JSON.stringify($scope.hotspots_intial));
                }
                $scope.hotSpotSelectAction(e);
            }

            function handleHotSpotMouseover(e) {
                //$log.log('currentTarget-id: ' + e.currentTarget.id);
                var $currentHotSpot = $(e.currentTarget),
                    currentIndex = $currentHotSpot.index();

            }

            function handleHotSpotMouseout(e){
                //$log.log('handleHotSpotMouseout: ' + e.currentTarget.id);

            }

            $scope.addHotSpot = function() {
                $log.log($('input[name=hsTypeRadio]:checked').val());
                if($('#hotspotIdentifier').val().trim() === ''){
                    $('#model-body-msgid').show();
                    $('#model-body-msgid').text('Enter hotspot identifier.');
                    $('#jsonTextId').hide();
                    $('#modal-dialog').modal('show');
                    $('#hotspotIdentifier').focus();
                    return;
                }
                var hotSpotJson = {
                    identifier: $('#hotspotIdentifier').val(),
                    src: "map-placeholder-dark-symbol.svg",
                    left: '0em',
                    top: '0em',
                    width: '2.2em',
                    type: 'image'
                };
                var hotSpotId = 'hs-' + $scope.newIdCounter++;
                $scope.hotspots_intial.hot_spots[hotSpotId] = hotSpotJson;
                $log.log('new hotSpotId: ' + hotSpotId);
                var $hotSpot = $('<div>').addClass('image-overlay overlay-image hotspotImage');
                if ($('input[name=hsTypeRadio]:checked').val() == 'image') {
                    $hotSpot.append('<img id="'+ hotSpotId + '" class="hot-spot" src= "'+$scope.hotspots_intial.image_dir + hotSpotJson.src+'" style="left: ' + hotSpotJson.left +'; top: ' + hotSpotJson.top +'; width: ' + hotSpotJson.width + '" />');
                }else if($('input[name=hsTypeRadio]:checked').val() == 'rectangle'){
                    $scope.hotspots_intial.hot_spots[hotSpotId].type = 'rectangle';
                    $hotSpot.append('<div id="' + hotSpotId + '" class="hot-spot floorPlanRectangle hot-spot-rect" ' + ' style="left: ' + hotSpotJson.left + '; top: ' + hotSpotJson.top + '; ' +  '" />');
                    $log.log('hotSpotId: ' + hotSpotId );
                } else {
                    $scope.hotspots_intial.hot_spots[hotSpotId].type = 'mark';
                    $hotSpot.append('<span id="' + hotSpotId + '" class="hot-spot floorPlanPoint" ' + ' style="left: ' + hotSpotJson.left + '; top: ' + hotSpotJson.top + '; " />');
                }
                $('#' + $scope.hotspotsDivId).append($hotSpot);
                if($('input[name=hsTypeRadio]:checked').val() == 'rectangle'){
                    $log.log('hotSpotId: ' + hotSpotId + ' resizable - before');
                    $( "#"+hotSpotId ).resizable();
                    $log.log('hotSpotId: ' + hotSpotId + ' resizable - after');
                }

                $('.hot-spot').on('mouseover', eval($scope.hotspots_intial['hot_spot_mouseover_event']));
                $('.hot-spot').on('mouseout', eval($scope.hotspots_intial['hot_spot_mouseout_event']));
                $('.hot-spot').on('click', eval($scope.hotspots_intial['hot_spot_click_event']));
                $( ".hot-spot" ).draggable();
                //$log.log('addHotSpot - $scope.hotspots_intial: ' + JSON.stringify($scope.hotspots_intial));
            };

            $scope.setPlanrLayout = function(event){
                var files = event.target.files; //FileList object
                if(files.length > 0){
                    $('#hotspot-edit-chk').removeAttr("disabled");
                    var file = files[0];
                    $scope.plantLayoutSrc = file.name;
                    $scope.hotspots_intial.main_image = {};
                    $scope.hotspots_intial.main_image.src = $scope.plantLayoutSrc;
                    $log.log('file: ' + JSON.stringify($scope.plantLayoutSrc));
                    var reader = new FileReader();
                    reader.onload = $scope.mapIsLoaded;
                    reader.readAsDataURL(file);
                }
            };

            $scope.mapIsLoaded = function(){
                $scope.$apply(function () {
                    //$scope.plantLayoutSrc = event.target.result;
                    //$log.log('$scope.plantLayoutSrc: ' + $scope.plantLayoutSrc);
                    //$scope.hotspots_intial.main_image = {};
                    $scope.plantLayoutSrcBinary = event.target.result;
                    hotspotBuilder.buildHotSpotPlantLayout('plant-hs-layout', $scope.hotspots_intial, null, $scope.plantLayoutSrcBinary);

                });
            };

            $scope.enableDisableButton = function() {
                //$('#modal-dialog').show();

                if(($scope.plantLayoutSrcBinary !== undefined) && ($scope.plantLayoutSrcBinary !== null)){
                    var isChecked = ($('#hotspot-edit-chk').is(':checked'));
                    if (isChecked) {
                        $('#addHSbtn').removeAttr("disabled").button('refresh');
                        $('#removeHSbtn').removeAttr("disabled").button('refresh');
                        $("input[name='hsTypeRadio']").removeAttr("disabled");
                        $('#hotspotIdentifier').removeAttr("disabled");
                        $(".hot-spot").draggable('enable');
                    }
                    else {
                        $('#addHSbtn').attr("disabled", "disabled").button('refresh');
                        $('#removeHSbtn').attr("disabled", "disabled").button('refresh');
                        $("input[name='hsTypeRadio']").attr("disabled", "disabled");
                        $('#hotspotIdentifier').attr("disabled", "disabled");
                        $(".hot-spot").draggable('disable');
                    }
                } else{
                    $('#model-body-msgid').show();
                    $('#model-body-msgid').text('Select plant layout before edit hotspots.');
                    $('#jsonTextId').hide();
                    $('#modal-dialog').modal('show');
                    $('#hotspot-edit-chk').prop('checked', false);
                }
            };

            $timeout(function () {
                $('#hotspot-edit-chk').change(function() {
                    $scope.enableDisableButton();
                });
                //$scope.hotspots = jQuery.extend(true, {}, $scope.hotspots_intial);
                $scope.hotspotsDivId = 'plant-hs-layout';
                hotspotBuilder.buildHotSpotPlantLayout('plant-hs-layout', $scope.hotspots_intial);
                $( ".hot-spot" ).draggable();
                $( ".hot-spot" ).draggable( 'disable' );
                $( "#removeHSbtn" ).click(function() {
                    if($scope.selectedHotSpotId !== null) {
                        $("#" + $scope.selectedHotSpotId).remove();
                        delete $scope.hotspots_intial.hot_spots[$scope.selectedHotSpotId];
                    }
                });

                $( "#addHSbtn" ).click(function() {
                        $scope.addHotSpot();
                });

                $( "#jsonHSLayout" ).click(function() {
                    $('#model-body-msgid').hide();
                    $('#jsonTextId').show();
                    $('#jsonTextId').val(JSON.stringify($scope.hotspots_intial, undefined, 4));
                    $('#modal-dialog').modal('show');
                });
                $( "#saveHSLayout" ).click(function() {
                    indexService.setHotSpotLayout($scope.hotspots_intial);
                    $log.log('indexService.getHotSpotLayout(): ' + JSON.stringify(indexService.getHotSpotLayout()))
                });


            }, 200);
        }
    ]);
})(window.angular);