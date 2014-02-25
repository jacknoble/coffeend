Coffeend.Views.EditUser = Backbone.View.extend({
	render({
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
	})

})