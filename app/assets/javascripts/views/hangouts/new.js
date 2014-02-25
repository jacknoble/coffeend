Coffeend.Views.NewHangout = Backbone.View.extend({
	template: JST['hangouts/new'],
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		var that = this;
		setTimeout( function() {
		  that.addAutoComplete();
		}, 0);
		return this
	},
	events: {
		"submit":"createHangout",
		"typeahead:selected":"addLocationData",
		"typeahead:autocompleted":"addLocationData"
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
							location: jshop.geometry
						};
					});
					console.log(cafes)
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
		      '<p class="tt-name">{{name}}</p>',
		      '<p class="tt-vac">{{vicinity}}</p>'
		    ].join(''))
  		}
		})
	},

	addLocationData: function(event, suggestion, dataset){
		$('#hangout_lat').val(suggestion.location.lat)
		$('#hangout_lng').val(suggestion.location.lng)
	},

	createHangout: function(event){
		event.preventDefault();
		var hangData = $(event.target).serializeJSON();
		var hangout = new Coffeend.Models.Hangout(hangData);
		hangout.save({}, {
			success: function(){
				Coffeend.hangouts.add(hangout);
				Backbone.history.navigate('#/', {trigger: true})
			}
		})
	}
})