class User
  include Mongoid::Document
  include Mongoid::Timestamps::Short
  include ActiveModel::SecurePassword

  field :password_digest, type: String
  has_secure_password
  field :first_name, type: String
  field :last_name, type: String
  field :email, type: String

  validates :email, presence: true, uniqueness: true

  has_many :slates, dependent: :destroy
end