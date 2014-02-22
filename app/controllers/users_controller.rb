class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(params.permit!)
  end
end
