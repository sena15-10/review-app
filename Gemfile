source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.0", ">= 8.0.0.1"

# Use sqlite3 as the database for Active Record
gem "sqlite3", ">= 2.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"
gem 'rails-i18n'
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem 'dotenv-rails', groups: [:development, :test]



# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"
gem "rack-cors"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Deploy this application anywhere as a Docker container
gem "kamal", require: false
gem 'bcrypt'

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma
gem "thruster", require: false
gem 'foreman'
 gem 'letter_opener'
group :development do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  
  # Static analysis for security vulnerabilities
  gem "brakeman", require: false
  
  # メール送信のテスト用
 
  gem 'letter_opener_web'
  
  # Omakase Ruby styling
  gem "rubocop-rails-omakase", require: false
  
  gem 'jwt'
  gem "jsbundling-rails", "~> 1.3"
end