var PlayerView = Backbone.View.extend({
  className: 'player',
  render: function() {
    var display_seasons = [];
    var lastSeason = {};
    var newSeasons = _.map(this.model.toJSON().seasons, function(season, index){
      if (season.year === lastSeason.year){

        season = {
          parts: [season, lastSeason],
          A: season.A + lastSeason.A,
          G: season.G + lastSeason.G,
          GP: season.GP + lastSeason.GP,
          GTG: season.GTG + lastSeason.GTG,
          GWG: season.GWG + lastSeason.GWG,
          PIM: season.PIM + lastSeason.PIM,
          PPA: season.PPA + lastSeason.PPA,
          PPG: season.PPG + lastSeason.PPG,
          PlusMinus: season.PlusMinus + lastSeason.PlusMinus,
          Pts: season.Pts + lastSeason.Pts,
          SHA: season.SHA + lastSeason.SHA,
          SHG: season.SHG + lastSeason.SHG,
          SOG: season.SOG + lastSeason.SOG,
          lgID: season.lgID,
          playerID: season.playerID,
          pos: season.pos,
          tmID: "VAR",
          year: season.year
        };
      }
      lastSeason = season;
      return season;
    });

    for (var i = newSeasons.length - 1; i >= 1; i--) {
      if (newSeasons[i].year === newSeasons[i-1].year){
        newSeasons.splice(i-1, 1);
      }
    }
    this.model.attributes.seasons = newSeasons;
    this.$el.html("");
    var that = this;
    $.get('templates/players/player-template.html',function (data){
      template = _.template(data);
      var renderedHTML = template(that.model.toJSON());
      that.$el.html(renderedHTML);
      setGraph(that.model.toJSON());
    });
    return this;
  }
});