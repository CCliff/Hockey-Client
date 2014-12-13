var PlayerCollection = Backbone.Collection.extend({
  model: Player,
  url: 'http://localhost:1234/api/players'
});