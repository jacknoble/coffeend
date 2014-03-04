json.user {json.partial!('api/users/user', user: @user)}
json.users do 
	json.array! @users do |user|
  	json.partial!('api/users/user', user: user)
  end
end
json.nearby_hangouts do
	json.array! @nearby_hangouts do |hangout|
		json.partial!("api/hangouts/hangout", hangout: hangout)
	end
end