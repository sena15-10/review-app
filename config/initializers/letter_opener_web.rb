if Rails.env.development?
    LetterOpenerWeb.configure do |config|
      # オプション設定
      config.letters_location = Rails.root.join('tmp', 'letter_opener')
    end
  end