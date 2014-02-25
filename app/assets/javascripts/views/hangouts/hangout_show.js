Coffeend.Views.HangoutShow = Backbone.View.extend({
  template: JST["hangouts/hangout_show"],
  render: function () {
  	console.log(this.model)
    var renderedContent = this.template({ hangout: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
