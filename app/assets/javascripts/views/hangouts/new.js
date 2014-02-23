Coffeend.Views.NewHangout = Backbone.View.extend({
	template: JST['hangouts/new'],
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		return this
	},
	events: {
		"click #submit":"createHangout"
	},

	createHangout: function(event){
		event.preventDefault();
		debugger
	}
})