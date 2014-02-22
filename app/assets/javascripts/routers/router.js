Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl
	},
	routes:{
		'':'root'
	},

	root: function(){
		alert('this is working')
	}

})