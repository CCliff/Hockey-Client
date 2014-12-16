var SearchRouter = Backbone.Router.extend({
  initialize: function(options){
    this.collection = options.collection;
    this.$el = options.$el;
  },
  routes:{
    'search(?*:queryString)' : 'listResults',
    '' : 'showSearch'
  },
  setView: function(view) {
    if(this.view){
      this.view.remove();
      this.view = null;
    }
    this.view = view;
    this.$el.html(this.view.render().$el);
  },
  listResults: function(queryString){
    var collectionFilter = parseQueryString(queryString);
    var that = this;
    this.collection.fetch({
      data: collectionFilter, 
      success: function() {

        var view = new SearchCollectionView({ collection: that.collection });
        that.setView(view);
      }
    });    
  },
  showSearch: function(){
    var view = new WelcomeView();
      this.setView(view);
  }
});
