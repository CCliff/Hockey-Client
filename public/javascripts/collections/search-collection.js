var SearchCollection = Backbone.Collection.extend({
  model: Search,
  url: 'http://localhost:1234/api/search'
});