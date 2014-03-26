class Api::HangoutsController < ApplicationController

  before_action :require_logged_in

  def index
  end

  def create
    params[:hangout][:user_id] = current_user.id
    date = params[:hangout][:start]
    params[:hangout][:start] = DateTime.strptime(date, '%m/%d/%Y %H:%M %p')
    @hangout = Hangout.new(params[:hangout].permit!)
    if @hangout.save
      render :partial => 'api/hangouts/hangout'
    else
      render :json => @hangout.errors.full_messages,
      :status => :unprocessable_entity
    end
  end

  def destroy
    @hangout = Hangout.find(params[:id])
    @hangout.destroy
    render :json => {}
  end

  def update
  end
end
