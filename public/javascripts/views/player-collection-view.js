var PlayerListView = Backbone.View.extend({
  render: function() {
    this.$el.html("");
    var that = this;
    $.get('javascripts/templates/players/player-collection-template.html',function (data){
      template = _.template(data);
      var renderedHTML = template({collection: that.collection.toJSON()});
      that.$el.html(renderedHTML);
    });
    return this;
  }
});