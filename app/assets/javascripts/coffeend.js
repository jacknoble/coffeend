window.Coffeend = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	getLocation: function (callback) {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(callback);
    } else {
    	callback(null);
    }
	},
	initialize: function(){
		var $root = $('#content')
		this.getLocation(function (position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			$.ajax({
				url: "/api/user",
				data: {
					lat: lat,
					lng: lng
				},
				type: 'GET',
				success: function (data) {
					Coffeend.user = new Coffeend.Models.User(data);
					Coffeend.router = new Coffeend.Routers.Router({ $rootEl: $root })
					Backbone.history.start();
				}
			});
		})
	}
}

$(function () {
	Coffeend.initialize();
});