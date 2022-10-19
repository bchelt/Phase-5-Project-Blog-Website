class PostsController < ApplicationController
    def index
        posts = Post.order(created_at: :desc)
        render json: posts
    end

    def show
        post = Post.find(params[:id])
        render json: post
    end

    def create
        if session[:user_id]
            post = Post.create(title: params[:title], content: params[:content], user_id: session[:user_id], tags: tags_param)
            if post.valid?
                render json: post, status: :created
            else
                render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id]
            Post.destroy(params[:id])
            head :no_content
        else
            render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
    end

    private

    def tags_param
        tags = Tag.where(category: params[:tags])
    end
    
    def summary_param
        summary = params[:content][0, 50] + "..."
    end
end
