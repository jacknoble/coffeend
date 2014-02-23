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
		var $bottom = $('#bottom')
		this.getLocation(function (position) {
			var lat = Coffeend.lat = position.coords.latitude;
			var lng = Coffeend.lng = position.coords.longitude;
			$.ajax({
				url: "/api/user",
				data: {
					lat: lat,
					lng: lng
				},
				type: 'GET',
				success: function (data) {
					Coffeend.user = new Coffeend.Models.User(data);
          Coffeend.hangouts
					Coffeend.router = new Coffeend.Routers.Router({
						$rootEl: $root,
						$bottomEl: $bottom
					})
					Backbone.history.start();
				}
			});
		})
	}
}

$(function () {
	Coffeend.initialize();
});
