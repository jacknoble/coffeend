Coffeend.Views.HangoutIndex = Backbone.View.extend({
	initialize: function(){
		this.listenTo(Coffeend.hangouts, "add remove", this.render)
	},

	template: JST['hangouts/index'],

	render: function(){
		var content = this.template({hangouts: Coffeend.hangouts})
		this.$el.html(content)
		return this
	}
})