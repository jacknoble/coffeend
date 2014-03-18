class Hangout < ActiveRecord::Base
  validates :user_id, :lat, :lng, :start, :presence => true

  after_save :add_attendence

  belongs_to :user

  has_many :attendances

  has_many :comments

  has_many :attending_users, :through => :attendances, :source => :user

  def duration=(dur)
    self.end = self.start + dur.to_i.hours
  end

  def self.find_by_location(rad, location)
    lat = location[:lat]
    lng = location[:lng]
    Hangout
      .includes(:attending_users, :comments)
      .where("lat < ? AND lat > ?", lat + rad, lat - rad)
      .where("lng < ? AND lng > ?", lng + rad, lng - rad)
  end

  def add_attendence
    Attendance.create(hangout_id: self.id, user_id: self.user_id)
  end
end
