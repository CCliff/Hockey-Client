function parseQueryString(queryString){
      var targetObject = {};
      if(queryString){
        var decodedQueryStringParams = decodeURI(queryString).split(/&/g);
        _.each(
            _.map(decodedQueryStringParams, function(keyValueString){
                var keyAndValue = keyValueString.split('='), yeOldeTempObject = {};
                if(keyAndValue.length >= 1){
                    var val = undefined;
                    if(keyAndValue.length == 2)
                        val = keyAndValue[1].split(',');
                    yeOldeTempObject[keyAndValue[0]] = val;
                }
                return yeOldeTempObject;
            }),
            function(obj){
                _.extend(targetObject, obj);
            }
        );
    }
    return targetObject;
}

function setGraph(player){
  var vis = d3.select('#stats-graph'),
    WIDTH = 800,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(player.seasons, function(season){
        return season.year;}), d3.max(player.seasons, function(season){
        return season.year;})]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, d3.max(player.seasons, function(season) {
      return season.Pts;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickFormat(d3.format("d"))
      .tickSize(1)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickFormat(d3.format("d"))
      .tickSize(1)
      .orient('left')
      .tickSubdivide(true);      

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,'+ (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);

    var ptsFunc = d3.svg.line()
      .x(function(d) {
        return xRange(d.year);
      })
      .y(function(d) {
        return yRange(d.Pts);
      })
      .interpolate('monotone');

    vis.append('svg:path')
      .attr('d', ptsFunc(player.seasons))
      .attr('class', 'line-Pts')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    var GFunc = d3.svg.line()
      .x(function(d) {
        return xRange(d.year);
      })
      .y(function(d) {
        return yRange(d.G);
      })
      .interpolate('monotone');

    vis.append('svg:path')
      .attr('d', GFunc(player.seasons))
      .attr('class', 'line-G')
      .attr('stroke', 'green')
      .attr('stroke-width', 3)
      .attr('fill', 'none');

    $('.line-goal').append('svg:title')
        .text('Goals');
}

$(function(){
    var playerCollection = new PlayerCollection();
    var playerModel = new Player();
    var router;
    router = new Router({
        collection: playerCollection,
        model: playerModel,
        $el: $('.content')
    });

    Backbone.history.start();

});