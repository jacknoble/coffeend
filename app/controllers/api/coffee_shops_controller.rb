class Api::CoffeeShopsController < ApplicationController
  def index
    @shops = get_local_coffee_shops(params[:location])
    render :json => @shops
  end
end
