require 'addressable/uri'
module Api::CoffeeShopsHelper
  class CoffeeShop

    def self.google_coffee_uri(location, page_token)
      Addressable::URI.new(
      :scheme => "https",
      :host => "maps.googleapis.com",
      :path => "maps/api/place/nearbysearch/json",
      :query_values => {
        :location => location,
        :keyword => "coffee",
        :sensor => "false",
        :radius => "50000",
        :key => ENV["GOOGLE_MAPS_KEY"],
        :pagetoken => page_token
      }
      ).to_s
    end

    def self.photo_uri(reference)
      Addressable::URI.new(
      :scheme => "https",
      :host => "maps.googleapis.com",
      :path => "maps/api/place/photo",
      :query_values => {
        :sensor => "false",
        :key => ENV["GOOGLE_MAPS_KEY"],
        :photoreference => reference,
        :maxwidth => 500
      }
      ).to_s
    end

    def self.preload_local_coffee_shops(lat, lng)
      location = [lat,lng].join(',')
      get_coffee_shop_pages(location, 10, nil)
    end

    def self.trim_location(location)
      full, trim_lat, trim_lng = location.match(/(^*\d*\.\d\d)\d*,(.*\.\d\d)/).to_a
      [trim_lat, trim_lng].join(',')
    end

    def self.get_coffee_shop_pages(location, page_count, page_token)
      p "hitting api"
      uri = self.google_coffee_uri(location, page_token).gsub!(/%2C/, ',')
      resp = JSON.parse(RestClient.get(uri))
      results = resp["results"].map(&:to_json)
      $REDIS.rpush(trim_location(location), results) unless results.empty?
      page_count -=1
      if page_count > 0 && resp['next_page_token']
        sleep(1.2)
        get_coffee_shop_pages(location, page_count, resp['next_page_token'] )
      end
    end
  end


end
