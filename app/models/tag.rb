class Tag < ApplicationRecord
    has_many :posts, through: :post_tag
end
