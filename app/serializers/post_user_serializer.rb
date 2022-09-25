class PostUserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :bio
end
