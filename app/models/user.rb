class User < ActiveRecord::Base
  validates :email, :presence => true
  validates :age, :numericality => true, :allow_blank => true
  validates :password,
            :presence => true,
            :length => { :minimum => 6 },
            :on => :create

    before_validation :require_session_token

  attr_reader :password

  has_many :planned_hangouts, :through => :attendance, :source => :hangout

  has_attached_file :photo, :styles => {
    :medium => "200x200>",
    :small => "40x40>",
  }, :default_url => "/assets/portrait.jpg"

  validates_attachment :photo, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    if user && user.is_password?(password)
      return user
    end

    nil
  end

  def require_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  def password=(pt_password)
    @password = pt_password
    self.password_digest = BCrypt::Password.create(pt_password)
  end

  def is_password?(pt_password)
    BCrypt::Password.new(self.password_digest).is_password?(pt_password)
  end

  def as_json(options={})
    super(:except => :password_digest)
  end

end
