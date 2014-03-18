Coffeend.Models.Hangout = Backbone.Model.extend({
	urlRoot: "api/hangouts",
	parse: function(data){
		var comments = new Coffeend.Collections.Comments(
			data.comments, {parse: true}
		)
		data.comments = comments;
		return data;
	}
})
