class RemovePhotosFromUsers < ActiveRecord::Migration
  def up
  	remove_column :users, :photo
  end

  def down
  	add_column :users, :photo, :string
  end
end
