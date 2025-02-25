class SocialLink < ApplicationRecord
    belongs_to :profile
    validates :platform, presence: true
    validates :url, presence: true
end
