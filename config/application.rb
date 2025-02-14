# config/application.rb
require_relative 'boot'
require 'rails/all'
require 'letter_opener_web' if Rails.env.development?
module ReviewApp
  class Application < Rails::Application
    # Rails 8.0の設定を読み込み
    config.load_defaults 8.0

    # APIモード設定
    config.api_only = true

    # タイムゾーンの設定
    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local
    config.i18n.available_locales = [:ja, :en]  # この行を追加
    # 国際化の設定
    config.i18n.default_locale = :ja
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]
    config.active_job.queue_adapter = :async
    # セッション関連の設定（APIモードでも必要な場合）
    config.session_store :cookie_store, key: '_review_app_session'
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options

  end
end