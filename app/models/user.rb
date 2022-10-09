class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :full_name, presence: true
    has_many :posts
    has_many :comments
    has_secure_password
end
