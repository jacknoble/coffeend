Coffeend.Views.MapShow = Backbone.View.extend({
	template: JST['hangouts/map_show'],
	attributes:{
		class: "col-xs-12",
		style: "margin-left: 21px"
	},
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
});
