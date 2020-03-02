class Slate
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  belongs_to :user
  field :title, type: String

  embeds_many :items, class_name: Slates::Item.name

  validates :title, presence: true
end