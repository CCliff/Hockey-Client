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
        return season.year - 0.25;}), d3.max(player.seasons, function(season){
        return season.year + 0.25;})]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(player.seasons, function(season) {
      var min = Math.min(season.PlusMinus, 0);
      return min * 1.2;
    }), d3.max(player.seasons, function(season) {
      var max = Math.max(season.Pts, season.PIM, season.SOG);
      return max * 1.2;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickFormat(d3.format("d"))
      .tickSize(2)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickFormat(d3.format("d"))
      .tickSize(1)
      .orient('left')
      .tickSubdivide(true);
    
    // vis.append("line")
    //   .attr("x1", MARGINS.left)
    //   .attr("y1", HEIGHT - MARGINS.bottom)
    //   .attr("x2", WIDTH - MARGINS.right)
    //   .attr("y2", HEIGHT- MARGINS.bottom)
    //   .attr("stroke-width", 2)
    //   .attr("stroke", "black");    

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,'+ (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);

    function createLine(data, stat, color){
      STAT = stat;
      var lineFunc = d3.svg.line()
        .x(function(d) {
          return xRange(d.year);
        })
        .y(function(d) {
          return yRange(d[STAT]);
        })
        .interpolate('monotone');

      vis.append('svg:path')
        .attr('d', lineFunc(data))
        .attr('class', stat)
        .attr('stroke', color)
        .attr('stroke-width', 4)
        .attr('fill', 'none');
    }

    createLine(player.seasons, 'Pts', 'black');
    createLine(player.seasons, 'G', '#1A1F2B');
    createLine(player.seasons, 'GP', '#931111');
    createLine(player.seasons, 'A', '#600000');
    createLine(player.seasons, 'PPA', '#790000');
    createLine(player.seasons, 'PPG', '#30395C');
    createLine(player.seasons, 'PlusMinus', '#AAA48E');
    createLine(player.seasons, 'SOG', '#2565C7');
    createLine(player.seasons, 'GWG', '#4A6491');
    createLine(player.seasons, 'GTG', '#85A5CC');
    createLine(player.seasons, 'PIM', '#D8D2BA');
    
}

$(function(){
  // set up Backbone routers dependencies
  var playerCollection = new PlayerCollection();
  var playerModel = new Player();
  var playerRouter;
  playerRouter = new PlayerRouter({
      collection: playerCollection,
      model: playerModel,
      $el: $('.content')
  });

  var searchCollection = new SearchCollection();
  var searchRouter;
  searchRouter = new SearchRouter({
      collection: searchCollection,
      $el: $('.content')
  });

  // Start Backbone history for routing capabilities

  Backbone.history.start();

  // click event on the header of the player table to toggle the lines in the graph

  $(document).on('click', '#season-header td', function(){
    var stat = $(this).text();
    if (stat === '+/-'){
      stat = 'PlusMinus';
    }
    $('.' + stat).toggle();
    renderBoxes();
  });

  // hover event to highlight the path and the column of a hovered over path in the player graph

  $(document).on('mouseenter mouseleave', 'path', function(){
    var stat = $(this).attr('class');
    $('.stat-' + stat).toggleClass("cells-highlighted");
  });

  // click event to expand seasons for a player that is traded mid-season

  $(document).on('click', '.stat-expand button', function(){
    $(this).parents('tbody').next('.season-parts').toggle();
    if ($(this).text() === '+'){
      $(this).text('-');
    } else{
      $(this).text('+');
    }
  });

  // expand and contract Players and Teams on the search results page 

  $(document).on('click', '.info h1', function(){
    $(this).siblings('h2').slideToggle(function(){
      if($(this).css('border-radius') === '9px'){        
        $(this).removeAttr('style');
      }else{
        $(this).css('border-radius', '9px');
      }
    }.bind(this));
    if($(this).children('.triangle').attr('style') === 'transform: rotate(90deg);'){
      $(this).children('.triangle').removeAttr('style');
    }else{
      $(this).children('.triangle').css('transform', 'rotate(90deg)');
    }
  });

  $(document).on('click', '.search-button', function(){
    var search_term = $(this).parent().parent().children().find('input').val();
    var year = $(this).parent().parent().children().find('select').val();
      window.location =  "/#search?search=" + search_term + "&year=" + year;
  });

});