Coffeend.Views.HangoutShow = Backbone.View.extend({
  template: JST["hangouts/hangout_show"],
  render: function () {
    var renderedContent = this.template({ hangout: this.model });
    this.$el.html(renderedContent);
    var center = new google.maps.LatLng(this.model.get('lat'), this.model.get('lng'))
    Coffeend.map.panTo(center)
    return this;
  }
});
