class Hangout < ActiveRecord::Base
  validates :user_id, :lat, :lng, :start, :presence => true

  belongs_to :user

  def self.find_by_location(rad, location)
    lat = location[:lat]
    lng = location[:lng]
    Hangout
      .where("lat < ? AND lat > ?", lat + rad, lat - rad)
      .where("lng < ? AND lng > ?", lng + rad, lng - rad)
  end
end
