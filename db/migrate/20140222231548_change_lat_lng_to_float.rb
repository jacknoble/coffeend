class ChangeLatLngToFloat < ActiveRecord::Migration
  def up
    remove_column :hangouts, :lat
    remove_column :hangouts, :lng
    add_column :hangouts, :lat, :float
    add_column :hangouts, :lng, :float
  end

  def down
    remove_column :hangouts, :lat
    remove_column :hangouts, :lng
    add_column :hangouts, :lat, :string
    add_column :hangouts, :lng, :string
  end
end
