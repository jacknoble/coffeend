json.user {json.partial!('api/users/user', user: @user)}
json.users do 
	user_hash = {}
	json.array! @users do |user|
		next if user_hash[user.id] == true
  	json.partial!('api/users/user', user: user)
  	user_hash[user.id] = true
  end
end
json.nearby_hangouts do
	json.array! @nearby_hangouts do |hangout|
		json.partial!("api/hangouts/hangout", hangout: hangout)
	end
end