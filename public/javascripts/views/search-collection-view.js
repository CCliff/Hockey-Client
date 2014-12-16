var SearchCollectionView = Backbone.View.extend({
  className: 'search',
  render: function() {
    this.$el.html("");
    var that = this;
    $.get('templates/search/search-collection-template.html',function (data){
      template = _.template(data);
      var renderedHTML = template({collection: that.collection.toJSON()});
      that.$el.html(renderedHTML);
    });
    return this;
  }
});