class Profile < ApplicationRecord
    belongs_to :user
    has_one_attached :avatar
    validates :avatar, blob: { content_type: ['image/png', 'image/jpg', 'image/jpeg'], size_range: 1..5.megabytes }
    has_many :profile_skills, dependent: :destroy
    has_many :skills, through: :profile_skills
end
