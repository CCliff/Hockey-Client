var PlayerCollection = Backbone.Collection.extend({
  model: Player,
  url: '104.236.107.189:1234/api/players'
});