Coffeend::Application.routes.draw do
  get "coffee_shops/index"
  root to: "root#root"
  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create]
  namespace :api, :defaults => { :format => :json } do
    get 'user' => 'users#load'
    resources :users, :only => [:show, :update]
    resources :hangouts, :only => [:create, :index, :destroy, :update]
    resources :coffee_shops, :only => [:index]
  end
end
