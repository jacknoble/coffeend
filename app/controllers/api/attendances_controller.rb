class Api::AttendancesController < ApplicationController

	def create
		params[:attendance][:user_id] = current_user.id
		@attendance = Attendance.new(params[:attendance].permit!)
		if @attendance.save
			@hangout = Hangout.find(params[:attendance][:hangout_id])
			render :partial => "api/hangouts/hangout"
		else
			render :json => @attendance.errors.full_messages
		end
	end

	def destroy
		params[:attendance][:user_id] = current_user.id
		@attendance =Attendance.find_by!(params[:attendance])
		if @attendance
			@attendance.destroy
			@hangout = Hangout.find(params[:attendance][:hangout_id])
			render :partial => "api/hangouts/hangout"
		else
			render :json => ["Could not find attendance records"],
			:status => :unprocessable_entity
		end
	end
end
