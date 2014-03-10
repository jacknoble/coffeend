class Api::CoffeeShopsController < ApplicationController
  def index
  	location = CoffeeShop.trim_location(params[:location])
    @shops = $REDIS.lrange(location, 0, -1)
    render :json => @shops
  end

  def photos
  	photo_uri = CoffeeShop.photo_uri(params[:photo_reference])
  	p photo_uri
  	render RestClient.get(photo_uri)
  end
end
