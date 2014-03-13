Coffeend.Collections.Hangouts = Backbone.Collection.extend({
  model: Coffeend.Models.Hangout,
  comparator: function(hangout){
  	return hangout.get('start')
  }
});
