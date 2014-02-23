Coffeend.Views.HangoutShows = Backbone.View.extend({
  template: JST["hangouts/hangout_show"],
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
});
