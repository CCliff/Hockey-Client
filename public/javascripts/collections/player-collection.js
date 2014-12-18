var PlayerCollection = Backbone.Collection.extend({
  model: Player,
  url: 'http://104.236.107.189:1234/api/players'
});