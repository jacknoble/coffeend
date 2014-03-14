hangout ||= @hangout
json.(hangout, :id, :user_id, :start, :end, :location_name, :description, :lat, :lng, :created_at, :updated_at)
json.attending_users do 
	json.array! hangout.attending_users do |user|
		json.(user, :id)
	end
end