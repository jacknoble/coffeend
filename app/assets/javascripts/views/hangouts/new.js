Coffeend.Views.NewHangout = Backbone.View.extend({
	template: JST['hangouts/new'],
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		var that = this;
		Coffeend.map.removeMarkers()
		setTimeout( function() {
		  that.addAutoComplete();
		  $('#dtpicker1').datetimepicker();
		}, 0);
		return this
	},
	events: {
		"submit":"createHangout",
		"typeahead:selected":"addLocationData",
		"typeahead:autocompleted":"addLocationData",
	},

	addAutoComplete: function(){
		var that = this
		var shops = new Bloodhound({
		  datumTokenizer: function (d) { return Bloodhound.tokenizers.whitespace(d.name); },
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  limit: 75,
		  prefetch: {
		    url: 'api/coffee_shops/?location=' + Coffeend.lat + ',' + Coffeend.lng,
		    filter: function(list) {
		      var cafes = $.map(list, function(shop) {
						var jshop = $.parseJSON(shop)
						return {
							name: jshop.name,
							vicinity: jshop.vicinity,
							location: jshop.geometry,
							photo: function(jshop){
								if (typeof jshop.photos != 'undefined'){
									return jshop.photos[0].photo_reference
								} else {
									return null
								}
							}(jshop)
						};
					});
					that.addShopMarkers(cafes);
					return cafes
		    }
		  }
		});

		shops.initialize();
		$('#hangout_location_name').typeahead(null, {
	    displayKey: 'name',
	    source: shops.ttAdapter(),
	    highlight: true,
	    templates: {
		    suggestion: Handlebars.compile([
		      '<p class="tt-name cof-text">{{name}}</p>',
		      '<p class="tt-vac" style="color: #3D1F00;">{{vicinity}}</p>'
		    ].join(''))
  		}
		})
	},

	addShopMarkers: function(cafes){
		cafes.forEach(function(cafe){
			Coffeend.map.addMarker({
        lat: cafe.location.location.lat,
        lng: cafe.location.location.lng,
        title: cafe.name,
        infoWindow: {
          content: JST['coffee_shops/info']({ shop: cafe })
        },
        click: function(e) {
        	debugger
          $('#hangout_location_name').val(cafe.name)
          $('#hangout_lat').val(cafe.location.location.lat)
					$('#hangout_lng').val(cafe.location.location.lng)
        }
			})
		})
	},

	addLocationData: function(event, suggestion, dataset){
		$('#hangout_lat').val(suggestion.location.location.lat)
		$('#hangout_lng').val(suggestion.location.location.lng)
	},

	createHangout: function(event){
		event.preventDefault();
		var hangData = $(event.target).serializeJSON();
		var hangout = new Coffeend.Models.Hangout(hangData);

		hangout.save({}, {
			success: function(){
				Coffeend.hangouts.add(hangout);
				var id = hangout.id
				Coffeend.router.navigate("hangouts/" + id, true)
				Coffeend.map.setCenter({lat: hangout.get('lat'), lng: hangout.get('lng')})
			}
		})
	}
})
