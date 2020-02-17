class User
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  has_secure_password
  field :first_name, type: String
  field :last_name, type: String
  field :email, allow_nil: false

  validates :email, presence: true

  has_many :slates, dependent: :destroy
end