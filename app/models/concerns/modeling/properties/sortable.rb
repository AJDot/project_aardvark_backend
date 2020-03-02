module Modeling
  module Properties
    module Sortable
      extend ActiveSupport::Concern

      included do
        field :sort_order, type: Integer
      end
    end
  end
end