Coffeend::Application.routes.draw do
  root to: "root#root"
  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create]
  namespace :api, :defaults => { :format => :json } do
    resource :user, :only => [:show, :update]
    get 'users/:id' => 'api/users#show_other_user'
    resources :hangouts, :only => [:create, :index, :destroy, :update]
  end
end
