class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :summary
  belongs_to :user, serializer: PostUserSerializer
  has_many :comments, serializer: PostCommentSerializer
  has_many :tags
end
