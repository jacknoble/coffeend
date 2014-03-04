Coffeend.Views.UserShow = Backbone.View.extend({
	initialize: function(){
		this.listenTo(Coffeend.user, 'change', this.render)
	},
  template: JST['users/show'],
  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
