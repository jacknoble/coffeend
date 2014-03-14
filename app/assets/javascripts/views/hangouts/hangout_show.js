Coffeend.Views.HangoutShow = Backbone.View.extend({
  initialize: function(){
    this.listenTo(Coffeend.user, "change", this.render)
    this.listenTo(this.model, "change", this.render)
  },
  template: JST["hangouts/hangout_show"],
  render: function () {
    var going = this.isUsergoing()
    var renderedContent = this.template({ hangout: this.model, going: going });
    this.$el.html(renderedContent);
    var center = new google.maps.LatLng(this.model.get('lat'), this.model.get('lng'))
    setTimeout(function(){
      Coffeend.map.panTo(center)
    }, 0)
    return this;
  },

  isUsergoing: function(){
    var going = false
    this.model.get('attending_users').forEach(function(user){
      if (user.id == Coffeend.user.id) {
        going = true;
      }
    });
    return going;
  },

  events: {
  	"click #hangout_attend":"createAttendance",
    "click #hangout_unattend":"destroyAttendance"
  },

  createAttendance: function(event){
  	event.preventDefault();
    var that = this;
  	$.ajax({
  		data: { attendance: {hangout_id: $(event.target).data('id')} },
  		url: "api/attendances",
  		method: "POST",
  		success: function(resp){
  			that.model.set(resp)
  		}
  	})
  },

  destroyAttendance: function(event){
    event.preventDefault();
    var that = this;
    $.ajax({
      data: {attendance: {hangout_id: $(event.target).data('id')} },
      url: "api/attendances",
      method: "DELETE",
      success: function(resp){
        that.model.set(resp)
      }
    })
  }
});
