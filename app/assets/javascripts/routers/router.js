Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
    this.$bottomEl = options.$bottomEl;
	},

	routes:{
		'':'root',
    'hangouts/:id': 'showHangout',
		'new': "newHangout",
    'users/:id': "showOtherUser",
    'user': 'showCurrentUser'
	},

	root: function(){
		var mapShow = new Coffeend.Views.MapShow();
		this.$rootEl.html(mapShow.render().$el);
		var map = new GMaps({
  		div: '#map',
  		lat: Coffeend.lat,
  		lng: Coffeend.lng,
			height: "400px",
			width: "100%"
		});
    _.each(Coffeend.hangouts.models, function (hangout) {
      console.log(hangout);
      if (hangout === undefined)
        return;
      map.addMarker({
        lat: hangout.get('lat'),
        lng: hangout.get('lng'),
        title: hangout.get('location_name'),
        icon: '/coffee_marker.png',
        infoWindow: {
          content: JST['hangouts/hangout_info']({ hangout: hangout })
        },
        click: function(e) {
          Backbone.history.navigate('#/hangouts/' + hangout.get('id'));
        }
      });
    });
	},

  showHangout: function (id) {
    var hangoutShow = new Coffeend.Views.HangoutShow({
      model: Coffeend.hangouts.get(id)
    });
    this.$bottomEl.html(hangoutShow.render().$el.html());
  },

	newHangout: function(){
		var newHangoutView = new Coffeend.Views.NewHangout();
		this.$bottomEl.html(newHangoutView.render().$el);
	},

  showOtherUser: function (id) {
    var otherUser = Coffeend.users.get(id);
    if (otherUser) {
      var showUser = new Coffeend.Views.UserShow({ model: otherUser });
      this.$bottomEl.html(showUser.render().$el);
    } else {
      console.log('user not found');
    }
  },

  showCurrentUser: function () {
    var showUser = new Coffeend.Views.UserShow({ model: Coffeend.user });
    this.$bottomEl.html(showUser.render().$el);
  }
});
