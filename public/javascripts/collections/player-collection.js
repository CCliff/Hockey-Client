var PlayerCollection = Backbone.Collection.extend({
  model: Player,
  url: ':1234/api/players'
});