Coffeend.Views.EditUser = Backbone.View.extend({
	template: JST['users/edit'],
	render: function(){
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
	},

	events:{
		"submit":"updateUser"
	},

	updateUser: function(){
		event.preventDefault();
		debugger
		var userData = $(event.target).serializeJSON();
		console.log(Coffeend.user.id)
		Coffeend.user.save(userData)
	}


})