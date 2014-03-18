class AddIndexToComments < ActiveRecord::Migration
  def change
  	add_index :comments, :hangout_id
  end
end
