class Api::UsersController < ApplicationController
  def show
    params.permit!
    @user = current_user
    @users = []
    @lat, @lng = params[:lat].to_f, params[:lng].to_f
    @nearby_hangouts = Hangout.find_by_location(
      0.07, :lat => @lat, :lng => @lng
    )
    @nearby_hangouts.each do |hangout|
      @users << hangout.user
    end
    @data = {
      :user => @user,
      :nearby_hangouts => @nearby_hangouts,
      :users => @users
    }
    render :json => @data
  end

  def update
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
