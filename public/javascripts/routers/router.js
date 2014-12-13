var Router = Backbone.Router.extend({
  initialize: function(options){
    this.collection = options.collection;
    this.$el = options.$el;
  },
  routes:{
    'players(?*:queryString)' : 'listPlayers',
    'players/:id' : 'showPlayer'
  },
  setView: function(view) {
    if(this.view){
      this.view.remove();
      this.view = null;
    }
    this.view = view;
    this.$el.html(this.view.render().$el);
  },
  listPlayers: function(queryString){
    var collectionFilter = parseQueryString(queryString);
    var that = this;
    this.collection.fetch({
      data: collectionFilter, 
      success: function(e) {
        var view = new PlayerListView({ collection: that.collection });
        that.setView(view);
      }
    });    
  },
});