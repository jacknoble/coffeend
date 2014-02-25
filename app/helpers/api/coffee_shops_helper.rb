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
        :types => "cafe",
        :sensor => "false",
        :radius => "10000",
        :page_token => page_token,
        :key => ENV["GOOGLE_MAPS_KEY"]
      }
      ).to_s
    end

    def self.preload_local_coffee_shops(lat, lng)
      location = [lat,lng].join(',')
      get_coffee_shop_pages(location, 10, nil)
    end

    def self.trim_location(location)
      full, trim_lat, trim_lng = location.match(/(^*\d*\.\d\d\d)\d*,(.*\.\d\d\d)/).to_a
      [trim_lat, trim_lng].join(',')
    end

    def self.get_coffee_shop_pages(location, page_count, page_token)
      @uri ||= self.google_coffee_uri(location, page_token).gsub!(/%2C/, ',')
      resp = JSON.parse(RestClient.get(@uri))
      results = resp["results"].map(&:to_json)
      $redis.rpush(trim_location(location), results)
      page_count -=1
      if page_count > 0
        get_coffee_shop_pages(location, page_count, resp['next_page_token'] )
      end
    end
  end


end
