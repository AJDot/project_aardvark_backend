class Slate
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  belongs_to :user
  field :title, type: String

  validates :title, presence: true
end