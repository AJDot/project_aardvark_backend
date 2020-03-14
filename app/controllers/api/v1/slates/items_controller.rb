module Api
  module V1
    module Slates
      class ItemsController < ApplicationController
        before_action :authorize_access_request!
        before_action :set_slate
        before_action :set_item, except: [:create]

        def create
          @item = @slate.items.build(item_params)

          if @item.save
            render json: @item, status: :created
          else
            render json: @item.errors, status: :unprocessable_entity
          end
        end

        def destroy
          if @item.destroy
            render json: @item, status: :ok
          else
            render json: @item.errors, status: :unprocessable_entity
          end
        end

        private

        # Use callbacks to share common setup or constraints between actions.
        def set_slate
          @slate = Slate.find(params[:slate_id])
        end

        def set_item
          @item = @slate.items.find(params[:id])
        end

        def item_params
          params.require(:item).permit(
            :description,
          ).to_hash
        end
      end
    end
  end
end
