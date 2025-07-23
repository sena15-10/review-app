
require "letter_opener_web" if Rails.env.development?
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create] do
        collection do
          post 'verify'
          post 'resend_code'
        end
      end
      resources :profiles, only: [:show, :create, :update] do
        member do 
          get :is_public
        end
      end
      resources :sessions, only: [:create, :destroy]
      get '/me', to: 'users#show'
    end
  end
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end
  mount ActionCable.server => '/cable'  # '/ws'ではなく'/cable'を使用
end
