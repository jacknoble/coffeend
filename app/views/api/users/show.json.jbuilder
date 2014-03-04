json.(@user, :id, :email, :first_name, :last_name, :job, :age, :sex, :self_summary)
json.small_photo @user.photo(:small)
json.medium_photo @user.photo(:small)