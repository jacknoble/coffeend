Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
    this.$bottomEl = options.$bottomEl;
		var mapShow = new Coffeend.Views.MapShow();
		this.$rootEl.html(mapShow.render().$el);
	},

	routes:{
		'':'root',
    'hangouts/:id': 'showHangout',
		'new': "newHangout",
    'users/:id': "showOtherUser",
    'user': 'showCurrentUser'
	},

	root: function(){
    this.$bottomEl.html('<div style="margin-left:30px">FUCK YEAH! MAPS BITCH</div>');
	},

  showHangout: function (id) {
    var hangoutShow = new Coffeend.Views.HangoutShow({
      model: Coffeend.hangouts.get(id)
    });
    this.$bottomEl.html(hangoutShow.render().$el.html());
  },

	newHangout: function(){
		var newHangoutView = new Coffeend.Views.NewHangout();
		this.$bottomEl.html(newHangoutView.render().$el);
	},

  showOtherUser: function (id) {
    var otherUser = Coffeend.users.get(id);
    if (otherUser) {
      var showUser = new Coffeend.Views.UserShow({ model: otherUser });
      this.$bottomEl.html(showUser.render().$el);
    } else {
      console.log('user not found');
    }
  },

  showCurrentUser: function () {
    var showUser = new Coffeend.Views.UserShow({ model: Coffeend.user });
    this.$bottomEl.html(showUser.render().$el);
  }
});
