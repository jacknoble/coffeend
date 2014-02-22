class CreateHangouts < ActiveRecord::Migration
  def change
    create_table :hangouts do |t|
      t.integer :user_id, :null => false
      t.string :lat, :null => false
      t.string :lng, :null => false
      t.datetime :start, :null => false
      t.datetime :end
      t.string :location_name

      t.timestamps
    end

    add_index :hangouts, :user_id
    add_index :hangouts, [:lat, :lng]
    add_index :hangouts, :start
    add_index :hangouts, :location_name
  end
end
