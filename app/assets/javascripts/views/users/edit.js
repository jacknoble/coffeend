Coffeend.Views.EditUser = Backbone.View.extend({
	template: JST['users/edit'],
	render: function(){
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.$el.find('.dropzone').dropzone({
			dictDefaultMessage: '',
			paramName: "user[photo]",
			method: "put",
			sending: function(file, xhr, formData) {
				xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
			},

			success: function(file, resp) {
				that.model.set({photo: resp.photo_url})
			}
		})
    return this;
	},

	events:{
		"submit":"updateUser"
	},

	updateUser: function(){
		event.preventDefault();
		var userData = $(event.target).serializeJSON();
		console.log(Coffeend.user.id)
		Coffeend.user.save(userData)
	}


})