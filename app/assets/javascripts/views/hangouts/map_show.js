Coffeend.Views.MapShow = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add remove', this.renderMarkers)
		this.listenTo(Coffeend.user, 'change', this.renderMarkers)
	},
	template: JST['hangouts/map_show'],
	attributes:{
		class: "col-xs-10 col-xs-offset-1",
	},

	events: {
		"click #cancel":"cancelHangout"
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

	renderMarkers: function(){
		Coffeend.map.removeMarkers()
		Coffeend.hangouts.each(function (hangout) {
      Coffeend.map.addMarker({
        lat: hangout.get('lat'),
        lng: hangout.get('lng'),
        title: hangout.get('location_name'),
        icon: '/coffee_marker.png',
        infoWindow: {
          content: JST['hangouts/hangout_info']({ hangout: hangout })
        },
        click: function(e) {
          Backbone.history.navigate('#/hangouts/' + hangout.id);
        }
      });
		})
	},

	renderMap: function() {
		var map = Coffeend.map = new GMaps({
  		div: '#map',
  		lat: Coffeend.lat,
  		lng: Coffeend.lng,
			height: "400px",
			width: "100%",
			zoom: 13,
		});
		this.renderMarkers()
	},

	cancelHangout: function(event){
		event.preventDefault();
		var id = $(event.target).data('id')
		var hangout = Coffeend.hangouts.get(id)
		hangout.destroy({

		})
	}

});
