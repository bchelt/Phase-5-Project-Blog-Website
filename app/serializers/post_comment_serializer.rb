class PostCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user
end
