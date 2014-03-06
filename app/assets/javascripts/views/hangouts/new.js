Coffeend.Views.NewHangout = Backbone.View.extend({
	template: JST['hangouts/new'],
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		var that = this;
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
		// "typeahead:cursorchanged":"changePhoto"
	},

	addAutoComplete: function(){
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
					return cafes
		    }
		  }
		});

		shops.initialize();
		$('#hangout_location_name').typeahead(null, {
	    displayKey: 'name',
	    source: shops.ttAdapter(),
      open: function(event, ui){
          var $input = $(event.target),
              $results = $input.autocomplete("widget"),
              top = $results.position().top,
              height = $results.height(),
              inputHeight = $input.height(),
              newTop = top - height - inputHeight;

          $results.css("top", newTop + "px");
      },
	    highlight: true,
	    templates: {
		    suggestion: Handlebars.compile([
		      '<p class="tt-name">{{name}}</p>',
		      '<p class="tt-vac">{{vicinity}}</p>'
		    ].join(''))
  		}
		})
	},

	addLocationData: function(event, suggestion, dataset){
		debugger
		$('#hangout_lat').val(suggestion.location.location.lat)
		$('#hangout_lng').val(suggestion.location.location.lng)
		$('#hangout_location_name').val(suggestion.name)
	},

	// changePhoto: function(event, suggestion, dataset){
	// 	$.ajax({
	// 		method: "GET",
	// 		url: "api/coffee_shops/photos",
	// 		data: {
	// 			photo_reference: suggestion.photo,
	// 		},
	// 		success: function(resp){
	// 			$($('#shop_photo')).src(resp)
	// 		}
	// 	})
	// },

	createHangout: function(event){
		debugger
		event.preventDefault();
		var hangData = $(event.target).serializeJSON();
		var hangout = new Coffeend.Models.Hangout(hangData);

		hangout.save({}, {
			success: function(){
				Coffeend.hangouts.add(hangout);
			}
		})
	}
})
