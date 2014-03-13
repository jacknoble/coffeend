Coffeend.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
    this.$bottomEl = options.$bottomEl;
    Coffeend.hangoutsMapOn = false
	},

	routes:{
		'':'root',
    'hangouts/:id': 'showHangout',
		'new': "newHangout",
    'users/:id': "showOtherUser",
    'user': 'showCurrentUser',
    'profile': 'editProfile',
    'coffeedates': 'hangoutsIndex'
	},

  hangoutsMap: function(){
    if (Coffeend.hangoutsMapOn == false) {
      var mapShow = new Coffeend.Views.MapShow({collection: Coffeend.hangouts});
      this.$rootEl.html(mapShow.render().$el);
      Coffeend.hangoutsMapOn = true;
    }
  },

	root: function(){
    this.hangoutsMap();
    var rootView = new Coffeend.Views.Root();
    this.$bottomEl.html(rootView.render().$el);
	},

  hangoutsIndex: function(){
    this.hangoutsMap();
    var hangoutsView = new Coffeend.Views.HangoutIndex();
    this.$bottomEl.html(hangoutsView.render().$el)
  },

  editProfile: function(){
    var editUser = new Coffeend.Views.EditUser({model: Coffeend.user});
    this.$bottomEl.html(editUser.render().$el);
  },

  showHangout: function (id) {
    this.hangoutsMap()
    var hangoutShow = new Coffeend.Views.HangoutShow({
      model: Coffeend.hangouts.get(id)
    });
    this.$bottomEl.html(hangoutShow.render().$el);
  },

	newHangout: function(){
		var newHangoutView = new Coffeend.Views.NewHangout();
		this.$bottomEl.html(newHangoutView.render().$el);
	},

  showOtherUser: function (id) {
    if (id == Coffeend.user.id){
      this.navigate('profile', true)
    } else {
      var otherUser = Coffeend.users.get(id);
      if (otherUser) {
        var showUser = new Coffeend.Views.UserShow({ model: otherUser });
        this.$bottomEl.html(showUser.render().$el);
      } else {
      }
    }
  },

  showCurrentUser: function () {
    var showUser = new Coffeend.Views.UserShow({ model: Coffeend.user });
    this.$bottomEl.html(showUser.render().$el);
  }
});
