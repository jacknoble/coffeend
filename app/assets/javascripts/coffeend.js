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

  parseAndStart: function (data) {
		var $root = $('#content');
    var $bottom = $('#bottom');
    Coffeend.hangouts = new Coffeend.Collections.Hangouts(
      data['nearby_hangouts']
    );
    Coffeend.user = new Coffeend.Models.User(data['user']);
    Coffeend.users = new Coffeend.Collections.Users(data['users']);
    Coffeend.users.add(Coffeend.user)
    Coffeend.router = new Coffeend.Routers.Router({
      $rootEl: $root,
      $bottomEl: $bottom
    })
    Backbone.history.start();
  },

  getUserAndHangouts: function (lat, lng) {
    $.ajax({
      url: "/api/user",
      data: {
        lat: lat,
        lng: lng
      },
      type: 'GET',
      success: this.parseAndStart
    });
  },

	initialize: function(){
    var that = this;
    // add a modal or alert explaining why we are asking for geolocation?
		this.getLocation(function (position) {
			Coffeend.lat = position.coords.latitude;
			Coffeend.lng = position.coords.longitude;
      that.getUserAndHangouts(Coffeend.lat, Coffeend.lng);
		})
	}
}

$(function () {
  if(Coffeend.loggedIn) {
    Coffeend.initialize();
  }
});
