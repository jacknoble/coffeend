class Comment < ActiveRecord::Base
	validates :body, :user_id, :hangout_id, presence: true
	belongs_to :hangout

end
