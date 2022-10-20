class UsersController < ApplicationController
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
       else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
       end
    end

    def show
        user = User.find(params[:id])
        render json: user, only: [:id, :full_name, :bio], include: [:posts, :comments]
    end

    def update
        if session[:user_id]
            user = User.find(session[:user_id])
            user.update(full_name: params[:full_name], bio: params[:bio])
            render json: user, only: [:id, :full_name, :bio], include: [:posts, :comments]
        else
            render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id]
            User.destroy(params[:id])
            session.delete :user_id
            head :no_content
        else
            render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :full_name)
    end
end
