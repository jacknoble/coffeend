Coffeend.Collections.Hangouts = Backbone.Collection.extend({
  model: Coffeend.Models.Hangout,
  comparator: function(hangout){
  	start = hangout.get('start')
  	return Date.parse(start)
  }
});
