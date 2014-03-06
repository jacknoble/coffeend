Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
    this.$bottomEl = options.$bottomEl;
		var mapShow = new Coffeend.Views.MapShow({collection: Coffeend.hangouts});
		this.$rootEl.html(mapShow.render().$el);
	},

	routes:{
		'':'root',
    'hangouts/:id': 'showHangout',
		'new': "newHangout",
    'users/:id': "showOtherUser",
    'user': 'showCurrentUser',
    'profile': 'editProfile' 
	},

	root: function(){
    var rootView = new Coffeend.Views.Root();
    this.$bottomEl.html(rootView.render().$el);
	},

  editProfile: function(){
    var editUser = new Coffeend.Views.EditUser({model: Coffeend.user});
    this.$bottomEl.html(editUser.render().$el);
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
