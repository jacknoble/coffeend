module SessionsHelper
  def login(user)
    user.reset_session_token!
    session[:token] = user.session_token
  end

  def current_user
    p session[:token]
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def logged_in?
    !current_user.nil?
  end

  def require_logged_in
    redirect_to new_user_url unless logged_in?
  end

end
