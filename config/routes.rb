Coffeend::Application.routes.draw do
  root to: "root#root"
  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create]
  namespace :api, :defaults => { :format => :json } do
    get 'user' => 'users#load'
    put 'user' => 'users#update'
    resources :users, :only => [:show]
    resources :hangouts, :only => [:create, :index, :destroy, :update]
    resources :coffee_shops, :only => [:index]
    get 'coffee_shops/photos' => 'coffee_shops#photos'
  end
end
