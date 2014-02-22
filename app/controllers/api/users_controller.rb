class Api::UsersController < ApplicationController
  def show
    @user = current_user
    render :json => @user
  end

  def update
  end

  def show_other_user
  end
end
