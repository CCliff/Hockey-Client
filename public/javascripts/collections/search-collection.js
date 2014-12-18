var SearchCollection = Backbone.Collection.extend({
  model: Search,
  url: ':1234/api/search'
});