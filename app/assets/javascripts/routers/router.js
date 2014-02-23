Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
    this.$bottomEl = options.$bottomEl;
	},

	routes:{
		'':'root',
    'show/:id': 'showHangout'
	},

	root: function(){
		var mapShow = new Coffeend.Views.MapShow();
		this.$rootEl.html(mapShow.render().$el);
		new GMaps({
  		div: '#map',
  		lat: -12.043333,
  		lng: -77.028333,
			height: "400px",
			width: "100%"
		});
	},

  showHangout: function (id) {
    var hangoutShow = new Coffeend.Views.HangoutShow({ 
      model: Coffeend.hangouts.get(id)
    });
    this.$bottomEl.html(hangoutShow.render().$el);
  }

});
