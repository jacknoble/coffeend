class Api::CommentsController < ApplicationController
  def create
  	params[:comment][:user_id] = current_user.id
  	@comment = Comment.new(params[:comment].permit!)
  	if @comment.save
  		render json: @comment
  	else
  		render json: @comment.errors.full_messages,
  		status: :unprocessable_entity
  	end
  end
end
