Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create] 
      post 'users/verify', to: 'users#verify'
      post 'users/resend_code', to: 'users#resend_code'
    end
  end
end
