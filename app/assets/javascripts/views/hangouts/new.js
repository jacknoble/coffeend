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
		"submit":"createHangout"
	},

	addAutoComplete: function(){
		var shops = new Bloodhound({
		  datumTokenizer: function(d) { return d.name; },
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  limit: 75,
		  prefetch: {
		    url: 'api/coffee_shops/?location=' + Coffeend.lat + ',' + Coffeend.lng,
		    filter: function(list) {
		      var cafes =  $.map(list.results, function(shop) {
						return { name: shop.name, vicinity: shop.vicinity };
					});
					return cafes
		    }
		  }
		});

		shops.initialize();
		$('#hangout_location_name').typeahead(null, {
	    displayKey: 'name',
	    source: shops.ttAdapter()
		})
	},

	createHangout: function(event){
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