class GamesController < ApplicationController
    def index
        games = Game.all.sort_by{ |game| -game.score }
        games = games.map do |game|
            obj = {
                name: game.user.name,
                score: game.score
            }
            obj
        end
        render json: games.slice(0, 3), status: "200"
    end

    def create
        game = Game.new(game_params)
        if game.save 
            render json: game, status: "201"
        else 
            render json: {error: "Game not added"}, status: "403"
        end 
    end 

    private 
    def game_params
        params.require(:game).permit(:user_id, :category_id, :score)
    end 
end
