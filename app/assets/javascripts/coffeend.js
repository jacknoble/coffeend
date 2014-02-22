window.Coffeend = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function(){
		var $root = $('#content')
		if (USER_ID !== null) {
			var user = Coffeend.user = new Coffeend.Models.User({id: USER_ID})
			//get geolocation here?
			user.fetch({
				success: function(resp) {
					Coffeend.router = new Coffeend.Routers.Router({$rootEl: $root})
					Backbone.history.start();
				}
			})
		}
	}
}

$(function () {
	Coffeend.initialize();
});