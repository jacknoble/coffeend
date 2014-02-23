require 'addressable/uri'
require 'rest-client'
module Api::CoffeeShopsHelper
  def google_coffee_uri(location)
    Addressable::URI.new(
    :scheme => "https",
    :host => "maps.googleapis.com",
    :path => "maps/api/place/nearbysearch/json",
    :query_values => {
      :key => ENV["GOOGLE_MAPS_KEY"],
      :location => location,
      :keyword => "coffee",
      :types => "cafe",
      :sensor => "false",
      :radius => "10000"
    }
    ).to_s
  end

  def get_local_coffee_shops(location)
    uri = google_coffee_uri(location)
    resp = RestClient.get(uri.gsub!(/%2C/, ','))
  end


end
