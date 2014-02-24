class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(params[:user].permit!)
    login(@user)
    redirect_to root_url
  end
end
