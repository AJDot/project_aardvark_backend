class User
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  field :first_name, type: String
  field :last_name, type: String
  field :email, allow_nil: false

  has_secure_password
end