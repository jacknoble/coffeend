class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, :null => false
      t.string :first_name, :null => false
      t.string :last_name
      t.string :job
      t.integer :age
      t.string :sex
      t.text :self_summary
      t.string :photo
      t.string :session_token
      t.string :password_digest, :null => false

      t.timestamps
    end

    add_index :users, :email, :unique => true
    add_index :users, :session_token
  end
end
