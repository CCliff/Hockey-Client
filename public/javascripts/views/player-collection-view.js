var PlayerListView = Backbone.View.extend({
  className: 'players',
  render: function() {
    this.$el.html("");
    var that = this;
    $.get('templates/players/player-collection-template.html',function (data){
      template = _.template(data);
      var renderedHTML = template({collection: that.collection.toJSON()});
      that.$el.html(renderedHTML);
    });
    return this;
  }
});