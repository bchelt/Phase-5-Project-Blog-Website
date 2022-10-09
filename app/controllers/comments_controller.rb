class CommentsController < ApplicationController
    def create
        if session[:user_id]
            comment = Comment.create(post_id: params[:post_id], user_id: session[:user_id], content: params[:content])
            if comment.valid?
                render json: comment, include: { user: { only: [:id, :full_name]}}, status: :created
            else
                render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: ["Not logged in"]}, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id]
            Comment.destroy(params[:id])
            head :no_content
        else
            render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
    end

    private

    def comment_params
        params.permit()
    end
end
