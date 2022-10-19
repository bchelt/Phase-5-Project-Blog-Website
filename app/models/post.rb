class Post < ApplicationRecord
    validates :title, presence: true
    validates :content, presence: true
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :post_tags
    has_many :tags, through: :post_tags
end
