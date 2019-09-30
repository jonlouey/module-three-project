class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, status: "200"
    end

    def create
        user = User.new(user_params)
        if user.save 
            render json: user, status: "201"
        else 
            render json: {error: "Please provide a valid name."}, status: "403"
        end 
    end 

    private 
    def user_params
        params.require(:user).permit(:name)
    end 

end
