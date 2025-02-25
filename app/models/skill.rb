class Skill < ApplicationRecord
    has_many :profile_skills
    has_many :profiles, through: :profile_skills
    
    validates :name, presence: true, uniqueness: { scope: :category }
    validates :category, presence: true, inclusion: { in: %w(language framework database tool) }
end
