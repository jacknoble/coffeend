class Api::UsersController < ApplicationController
  def load
    params.permit!
    @user = current_user
    @users = []
    @lat, @lng = params[:lat].to_f, params[:lng].to_f
    location = [@lat, @lng].join(',')
    t = Time.now
    if $REDIS.lrange(CoffeeShop.trim_location(location), 0, -1).length < 10
      Thread.new do 
        CoffeeShop.preload_local_coffee_shops(@lat, @lng)
      end
    end
    @nearby_hangouts = Hangout.find_by_location(
      0.07, :lat => @lat, :lng => @lng
    )
    p Time.now - t
    #this needs to be unique users. Use a join table for this?
    @nearby_hangouts.each do |hangout|
      @users << hangout.user
    end
    
    render "api/users/load"
  end

  def update
    @user = User.find(current_user.id)
    if @user
      @user.update_attributes(params[:user].permit!)
      render "api/users/show"
    else
      render :json => "User not found", status => :unprocessable_entity
    end
  end

  def show_other_user
    @user = User.find(params[:id])
    if @user
      render :json => @user
    else
      render :status => 422
    end
  end
end
