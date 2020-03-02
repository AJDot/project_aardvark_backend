module Slates
  class Item
    include Mongoid::Document
    include Mongoid::Timestamps::Short
    include Modeling::Properties::Describable
    include Modeling::Properties::Sortable

    embedded_in :slate
  end
end