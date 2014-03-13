class Api::AttendancesController < ApplicationController

	def create
		params[:attendance]["user_id"] = current_user.id
		p params[:attendance]
		@attendance = Attendance.new(params[:attendance].permit!)
		if @attendance.save
			head :ok
		else
			render :json => @attendance.errors.full_messages
		end
	end

	def destroy

	end
end
