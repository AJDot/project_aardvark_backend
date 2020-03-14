class Slate
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  belongs_to :user
  field :title, type: String

  embeds_many :items, class_name: Slates::Item.name
  accepts_nested_attributes_for :items

  validates :title, presence: true

  def as_json(opts = {})
    attrs = super
    attrs['items'] = items.as_json(opts)
    attrs
  end
end