class User < ApplicationRecord
    has_secure_password
    has_many :verification_codes, dependent: :destroy
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, presence: true, on: :create
end
