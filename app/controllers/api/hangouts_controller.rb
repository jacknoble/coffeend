class Api::HangoutsController < ApplicationController
  def index
  end

  def create
    params[:hangout][:user_id] = current_user.id
    @hangout = Hangout.new(params[:hangout].permit!)
    if @hangout.save
      render :json => @hangout
    else
      render :json => @hangout.errors.full_messages,
      :status => :unprocessable_entity
    end
  end

  def destroy
  end

  def update
  end
end
