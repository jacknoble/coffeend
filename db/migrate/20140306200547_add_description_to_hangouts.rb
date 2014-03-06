class AddDescriptionToHangouts < ActiveRecord::Migration
  def change
  	add_column :hangouts, :description, :text
  end
end
