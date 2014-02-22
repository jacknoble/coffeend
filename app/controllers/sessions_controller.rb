class SessionsController < ApplicationController
  def new
  end

  def create
    params.permit!
    email = params[:email]
    password = params[:password]
    @user = User.find_by_credentials(email, password)
    login(@user)
    redirect_to root_url
  end

  def destroy
  end

end
