var SearchCollection = Backbone.Collection.extend({
  model: Search,
  url: 'http://104.236.107.189:1234/api/search'
});