var WelcomeView = Backbone.View.extend({
  className: 'search',
  render: function() {
    this.$el.html("");
    var that = this;
    $.get('templates/welcome-template.html',function (data){
      template = _.template(data);
      var renderedHTML = template();
      that.$el.html(renderedHTML);
    });
    return this;
  }
});