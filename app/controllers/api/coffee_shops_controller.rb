class Api::CoffeeShopsController < ApplicationController
  def index
  	location = CoffeeShop.trim_location(params[:location])
    @shops = $redis.lrange(location, 0, -1)
    render :json => @shops
  end
end
