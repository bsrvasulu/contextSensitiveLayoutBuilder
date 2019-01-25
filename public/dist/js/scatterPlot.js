/*!
	Scatter Plot using plotly
*/
var scatterAdvancePlot =  (function() {
    "use strict";

    var drawPlot = function (plotTagID, plotData, plotConfig = {}  ){

        var scatterData = [ ];
        var i = 1;
        while(plotData["trace"+i] !== undefined){
            var dataMarks = {
                x: plotData["trace"+i].x,
                y: plotData["trace"+i].y,
                mode: 'markers',
                type: 'scatter',
                name: plotData["trace"+i].markerName || '',
                marker: {
                    size: plotData["trace"+i].markerSize || 4
                }
            };
            if (plotData["trace"+i].markerColor)  dataMarks.marker.color = plotData["trace"+i].markerColor;
            scatterData.push(dataMarks);
            i++;
        }

        var layout = {
            xaxis: {
                title: plotConfig.xAxisTitle || ''
            },
            yaxis: {
                title: plotConfig.yAxisTitle || ''
            },
            title: plotConfig.graphTitle || ''
        };
        if (plotConfig.xAxisRange)  layout.xaxis.range = plotConfig.xAxisRange;
        if (plotConfig.yAxisRange)  layout.yaxis.range = plotConfig.yAxisRange;
        if (plotConfig.width)  layout.width = plotConfig.width;
        if (plotConfig.height)  layout.height = plotConfig.height;

        var domObject = document.getElementById(plotTagID);
        Plotly.newPlot(domObject, scatterData, layout, {displaylogo: false, scrollZoom: true,
            displayModeBar: true,
            modeBarButtonsToRemove: [
                'sendDataToCloud',
                'toImage',
                'autoScale2d',
                'resetScale2d',
                'hoverClosestCartesian',
                'hoverCompareCartesian',
                'boxSelect', 'lasso2d', 'toggleSpikelines', 'select2d']});

        if (plotConfig.boundX !== undefined || plotConfig.boundY !== undefined) {
            domObject.on('plotly_relayout',
                function(eventdata){
                    if(eventdata['yaxis.range[0]']) {
                        var axesUpdate = false;
                        if (plotConfig.boundX !== undefined) {
                            if (eventdata['xaxis.range[0]'] < plotConfig.boundX[0]) {
                                eventdata['xaxis.range[0]'] = plotConfig.boundX[0];
                                axesUpdate = true;
                            }
                            if (eventdata['xaxis.range[1]'] > plotConfig.boundX[1]) {
                                eventdata['xaxis.range[1]'] = plotConfig.boundX[1];
                                axesUpdate = true;
                            }
                        }

                        if (plotConfig.boundY !== undefined) {
                            if (eventdata['yaxis.range[0]'] < plotConfig.boundY[0]) {
                                eventdata['yaxis.range[0]'] = plotConfig.boundY[0];
                                axesUpdate = true;
                            }
                            if (eventdata['yaxis.range[1]'] > plotConfig.boundY[1]) {
                                eventdata['yaxis.range[1]'] = plotConfig.boundY[1];
                                axesUpdate = true;
                            }
                        }

                        if (axesUpdate) {
                            var update = {
                                'xaxis.range': [eventdata['xaxis.range[0]'], eventdata['xaxis.range[1]']],   // updates the xaxis range
                                'yaxis.range': [eventdata['yaxis.range[0]'], eventdata['yaxis.range[1]']]     // updates the end of the yaxis range
                            };
                            Plotly.relayout(domObject, update)
                        }
                    }

                });
        }
    };

    var relayoutEvent = function(plotTagID, next){
        var domObject = document.getElementById(plotTagID);
        domObject.on('plotly_relayout',
            function(eventdata){
                next(eventdata);
            });
    };
    return{
        drawPlot : drawPlot,
        relayoutEvent: relayoutEvent
    }
})();