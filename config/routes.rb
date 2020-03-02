Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :slates do
        scope module: :slates do
          resources :items
        end
      end
    end
  end

  root to: 'home#index'

  post 'refresh', controller: :refresh, action: :create
  post 'sign_in', controller: :sign_in, action: :create
  post 'sign_up', controller: :sign_up, action: :create
  delete 'sign_in', controller: :sign_in, action: :destroy
end
