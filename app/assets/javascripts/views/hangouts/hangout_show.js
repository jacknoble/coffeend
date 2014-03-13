Coffeend.Views.HangoutShow = Backbone.View.extend({
  initialize: function(){
    this.listenTo(Coffeend.user, "change", this.render)
    this.listenTo(this.model, "change", this.render)
  },
  template: JST["hangouts/hangout_show"],
  render: function () {
    var renderedContent = this.template({ hangout: this.model });
    this.$el.html(renderedContent);
    var center = new google.maps.LatLng(this.model.get('lat'), this.model.get('lng'))
    Coffeend.map.panTo(center)
    return this;
  },

  events: {
  	"click button":"createAttendance"
  },

  createAttendance: function(event){
  	event.preventDefault()
  	$.ajax({
  		data: { attendance: {hangout_id: $(event.target).data('id')} },
  		url: "api/attendances",
  		method: "POST",
  		success: function(resp){
  			
  		}
  	})
  }
});
