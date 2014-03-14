class Attendance < ActiveRecord::Base
	validates_uniqueness_of :user_id, :scope => :account_id

	belongs_to :user
	belongs_to :hangout
end
