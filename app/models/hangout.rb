class Hangout < ActiveRecord::Base
  validates :user_id, :lat, :lng, :start, :presence => true

  belongs_to :user

  def duration=(dur)
    self.end = self.start + dur.to_i.hours
  end

  def self.find_by_location(rad, location)
    lat = location[:lat]
    lng = location[:lng]
    Hangout
      .includes(:user)
      .where("lat < ? AND lat > ?", lat + rad, lat - rad)
      .where("lng < ? AND lng > ?", lng + rad, lng - rad)
  end
end
