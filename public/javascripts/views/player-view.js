var PlayerView = Backbone.View.extend({
  className: 'player',
  render: function() {
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