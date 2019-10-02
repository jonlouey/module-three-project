class UsersController < ApplicationController

    def index
        user = User.last
        render json: user, status: "200"
    end

    def show 
        user = User.find(params[:id])
        render json: user, status: "200"
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
