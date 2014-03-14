class FixAttendanceIndex < ActiveRecord::Migration
  def up
  	remove_index :attendances, :user_id
  	add_index :attendances, [:hangout_id, :user_id], :unique => true
  end

  def down
  	remove_index :attendances, [:hangout_id, :user_id]
  	add_index :attendances, :user_id
  end
end
