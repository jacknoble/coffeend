Coffeend.Views.MapShow = Backbone.View.extend({
	template: JST['hangouts/map_show'],
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
});