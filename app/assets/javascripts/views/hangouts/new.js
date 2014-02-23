Coffeend.Views.NewHangout = Backbone.View.extend({
	template: JST['hangouts/new'],
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		return this
	},
	events: {
		"submit":"createHangout"
	},

	createHangout: function(event){
		event.preventDefault();
		var hang_data = $(event.target).serializeJSON();
		var hangout = new Coffeend.Models.Hangout();
		hangout.save({}, {
			success: function(){
				Coffeend.hangouts.add(hangout);
			}
		})
	}
})