# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001'  # Reactアプリのポート番号に注意
    
    resource '*',
      headers: :any,
      methods: %w[GET POST PUT PATCH DELETE OPTIONS],
      max_age: 86400,
      credentials: true,
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client']
  end
end
