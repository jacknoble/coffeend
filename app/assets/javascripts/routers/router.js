Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
    this.$bottomEl = options.$bottomEl;
	},

	routes:{
		'':'root',
    'hangouts/:id': 'showHangout'
		'new': "newHangout"
	},

	root: function(){
		var mapShow = new Coffeend.Views.MapShow();
		this.$rootEl.html(mapShow.render().$el);
		new GMaps({
  		div: '#map',
  		lat: Coffeend.lat,
  		lng: Coffeend.lng,
			height: "400px",
			width: "100%"
		});
	},

  showHangout: function (id) {
    var hangoutShow = new Coffeend.Views.HangoutShow({
      model: Coffeend.hangouts.get(id)
    });
    this.$bottomEl.html(hangoutShow.render().$el);
  },

	newHangout: function(){
		var newHangoutView = new Coffeend.Views.NewHangout();
		this.$bottomEl.html(newHangoutView.render().$el);
	}
});
