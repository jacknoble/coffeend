Coffeend.Views.EditUser = Backbone.View.extend({
	template: JST['users/edit'],
	render: function(){
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    var that = this;
		setTimeout( function() {
		  that.renderEditable();
		}, 0);
    return this;
	},

	renderEditable: function(){
		$.fn.editable.defaults.mode = 'inline';
		$.fn.editable.defaults.ajaxOptions = {type: "put"}
		$('.editable').editable({
	  	url: "api/user",
	  	success: function(resp){
	  		Coffeend.user.set(resp)
	  	},
	  	send: "always",
	  	params: function(params){
	  		params[params.name] = params.value
	  		return params;
	  	}
	  });
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