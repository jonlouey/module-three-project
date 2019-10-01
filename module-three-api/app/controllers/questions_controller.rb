class QuestionsController < ApplicationController
    def index
        questions = Question.all
        render json: questions, status: "200"
    end 

    def show 
        question = Question.find(params[:id])
        render json: question, status: "200"
    end 
end
