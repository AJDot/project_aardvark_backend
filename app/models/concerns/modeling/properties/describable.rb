module Modeling
  module Properties
    module Describable
      extend ActiveSupport::Concern

      included do
        field :description, type: String
      end
    end
  end
end
