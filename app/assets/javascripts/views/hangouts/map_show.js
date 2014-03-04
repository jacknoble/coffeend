Coffeend.Views.MapShow = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add remove', this.renderMap)
	},
	template: JST['hangouts/map_show'],
	attributes:{
		class: "col-xs-12",
		style: "margin-left: 21px"
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		var that = this;
		setTimeout( function() {
		  that.renderMap();
		}, 0);
		return this;
	},

	renderMap: function() {
		var map = new GMaps({
  		div: '#map',
  		lat: Coffeend.lat,
  		lng: Coffeend.lng,
			height: "400px",
			width: "100%"
		});
    Coffeend.hangouts.each(function (hangout) {
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
		})
	},

});