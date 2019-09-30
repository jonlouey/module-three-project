class QuestionsController < ApplicationController
    def index
        questions = Question.all.map{|ele| ele}
        question = questions.sample
        render json: question, status: "200"
    end 

    def show 
        question = Question.find(params[id])
        render json: question, status: "200"
    end 
end
