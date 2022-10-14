class TagsController < ApplicationController
    def index
        tags = Tag.all
        render json: tags
    end

    def create
        if session[:user_id]
            tag = Tag.create(category: params[:category])
            if tag.valid?
                render json: tag, status: :created
            else
                render json: { errors: tag.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
    end
end
