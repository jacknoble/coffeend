class Api::UsersController < ApplicationController
  def show
    @user = current_user
    params.permit!
    lat, lng = params[:lat].to_f, params[:lng].to_f
    @nearby_hangsouts = Hangout.find_by_location(0.07, :lat => lat, :lng => lng)
    p @nearby_hangouts.class
    @user.nearby_hangouts = @nearby_hangouts
    render :json => @user
  end

  def update
  end

  def show_other_user
  end
end
