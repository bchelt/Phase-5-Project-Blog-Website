class Post < ApplicationRecord
    validates :title, presence: true
    validates :content, presence: true, length: { minimum: 50 }
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :tags, through: :post_tag
end
