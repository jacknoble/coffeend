class Api::CoffeeShopsController < ApplicationController
	before_action :require_logged_in
  def index
  	location = CoffeeShop.trim_location(params[:location])
    @shops = $REDIS.lrange(location, 0, -1)
    render :json => @shops
  end

  def photos
  	photo_uri = CoffeeShop.photo_uri(params[:photo_reference])
  	render RestClient.get(photo_uri)
  end
end
