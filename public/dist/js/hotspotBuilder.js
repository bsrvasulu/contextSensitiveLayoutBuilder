/*!
	hotspotBuilder
*/
var hotspotBuilder =  (function() {
    "use strict";
    var hotspotsLayout = null;
    var hotspotsEventHandler = null;
    var hotSpotSelectAction = null;
    function handleClickHotspot(e){
        // alert('currentTarget: ' + JSON.stringify($scope.hotspotsLayout[e.currentTarget.id].src));
        var identifier = hotspotsLayout.hot_spots[e.currentTarget.id].identifier;
        if((hotspotsEventHandler[identifier] !== undefined) && (hotspotsEventHandler[identifier] !== null)) {
            $('#et-slider-wrapper').show();
            $('#side-details').attr('src', hotspotsEventHandler[identifier].src);
            $('#side-details-topid').text(hotspotsEventHandler[identifier].title);
            $('#side-details-middleid').text(hotspotsEventHandler[identifier].subTitle);
            $('#side-details-bottontitleid').text(hotspotsEventHandler[identifier].subTitle);
            $('#side-details-details').text(hotspotsEventHandler[identifier].description);
        }
        else{
            $('#et-slider-wrapper').hide();
        }
        if((hotSpotSelectAction !== undefined) && (hotSpotSelectAction !== null)){
            hotSpotSelectAction(e);
        }
    }

    function appendSpeechBubble() {
        var $speechBubble = $('<div>').addClass('speech-bubble zoomIn animated');
        $('.container').append($speechBubble);
    }

    function handleHotSpotMouseover(e) {
        var currentHotSpotId = hotspotsLayout.hot_spots[e.currentTarget.id].identifier;
        var $currentHotSpot = $(e.currentTarget),
            $speechBubble = $('.speech-bubble'),
            hotSpotTop = $currentHotSpot.offset().top - 10,
            hotSpotLeft = $currentHotSpot.offset().left,
            hotSpotHalfSize = $currentHotSpot.width() / 2,
            speechBubbleHalfSize = $speechBubble.width() / 2,
            topTarget = hotSpotTop - $speechBubble.height(),
            leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;

        $speechBubble.empty();
        if((hotspotsEventHandler[currentHotSpotId] !== undefined) && (hotspotsEventHandler[currentHotSpotId] !== null)) {
            $speechBubble.append($('<h1>').text(hotspotsEventHandler[currentHotSpotId].title));
            $speechBubble.append('<img id="theImg" src= "' + hotspotsEventHandler[currentHotSpotId].src + '" style="width: 11em; height: auto;" />');
            $speechBubble.append($('<p>').text(hotspotsEventHandler[currentHotSpotId].description));
        } else{
            $speechBubble.append($('<h1>').text(currentHotSpotId));
        }
        $speechBubble.css({
            'top': topTarget - 175,
            'left': leftTarget - 265,
            'display': 'block'
        }).stop().animate({
            opacity: 1
        }, 200);
    }

    function handleHotSpotMouseout(e){
        var $speechBubble = $('.speech-bubble');
        $speechBubble.stop().animate({
            opacity: 0
        }, 200, function(){
            $speechBubble.hide();
        });
    }

     function buildHotSpotPlantLayout(tagId, hsJSONObj, clientCallbackAfterBuild, maimImageSrc){
        hotspotsLayout = jQuery.extend(true, {}, hsJSONObj);
        if((hotspotsLayout.main_image === undefined) || (hotspotsLayout.main_image === null))
            return;
        var hotspotsDivId = tagId;
        $('#'+ hotspotsDivId).empty();
        var $hotSpotMap = $('<div>').addClass('image-overlay overlay-image');
        if((maimImageSrc !== undefined) && (maimImageSrc !== null)) {
            $hotSpotMap.append('<img id="main_image" src= "' + maimImageSrc  + '" style="" />');
        }
        else{
            $hotSpotMap.append('<img id="main_image" src= "' + hotspotsLayout.image_dir + hotspotsLayout['main_image'].src + '" style="" />');
        }
        $('#' + tagId).append($hotSpotMap);
        for(var hotSpot in hotspotsLayout['hot_spots']) {
            var hotSpotJson = hotspotsLayout['hot_spots'][hotSpot];
            var $hotSpot = $('<div>').addClass('image-overlay overlay-image hotspotImage');
            if (hotSpotJson.type === 'image') {
                $hotSpot.append('<img id="' + hotSpot + '" class="hot-spot" src= "' + hotspotsLayout.image_dir + hotSpotJson.src + '" style="left: ' + hotSpotJson.left + '; top: ' + hotSpotJson.top + '; width: ' + hotSpotJson.width + '; position: relative; " />');
            } else if(hotSpotJson.type === 'rectangle'){
                $hotSpot.append('<div id="' + hotSpot + '" class="hot-spot floorPlanRectangle hot-spot-rect" ' + ' style="left: ' + hotSpotJson.left + '; top: ' + hotSpotJson.top + '; width: ' + hotSpotJson.width + '; height: ' + hotSpotJson.height +  '" />');
            } else{
                $hotSpot.append('<span id="' + hotSpot + '" class="hot-spot floorPlanPoint" ' + ' style="left: ' + hotSpotJson.left + '; top: ' + hotSpotJson.top + '; " />');
            }
            $('#' + tagId).append($hotSpot);
            if((clientCallbackAfterBuild !== undefined) && (clientCallbackAfterBuild !== null))
                clientCallbackAfterBuild();
        }
    }

    function addHotSpotEventHandler(hotspotsEventJson, hotSpotSelectEventAction){
        hotspotsEventHandler = jQuery.extend(true, {}, hotspotsEventJson);
        hotSpotSelectAction = hotSpotSelectEventAction;
        $('.hot-spot').on('mouseover', eval(hotspotsLayout['hot_spot_mouseover_event']));
        $('.hot-spot').on('mouseout', eval(hotspotsLayout['hot_spot_mouseout_event']));
        $('.hot-spot').on('click', eval(hotspotsLayout['hot_spot_click_event']));
    }

    return{
        buildHotSpotPlantLayout : buildHotSpotPlantLayout,
        addHotSpotEventHandler : addHotSpotEventHandler,
        appendSpeechBubble: appendSpeechBubble
    }
})();


