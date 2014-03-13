class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
    	t.integer :user_id, :null => false
    	t.integer :hangout_id, :null => false

      t.timestamps
    end

    add_index :attendances, :user_id
  end
end
