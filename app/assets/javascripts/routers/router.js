Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl
	},
	routes:{
		'':'root'
	},

	root: function(){
		var mapShow = new Coffeend.Views.MapShow();
		this.$rootEl.html(mapShow.render().$el);
		new GMaps({
  		div: '#map',
  		lat: -12.043333,
  		lng: -77.028333,
			height: "500px",
			width: "500px"
		});
	}

});