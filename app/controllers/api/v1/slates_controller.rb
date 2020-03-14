module Api
  module V1
    class SlatesController < ApplicationController
      before_action :authorize_access_request!
      before_action :set_slate, only: [:show, :update, :destroy]

      # GET /slates
      def index
        @slates = current_user.slates.all

        render json: @slates.as_json
      end

      # GET /slates/1
      def show
        render json: @slate.as_json
      end

      # POST /slates
      def create
        @slate = current_user.slates.build(slate_params)

        if @slate.save
          render json: @slate.as_json, status: :created
        else
          render json: @slate.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /slates/1
      def update
        if @slate.update(slate_params)
          render json: @slate.as_json
        else
          render json: @slate.errors, status: :unprocessable_entity
        end
      end

      # DELETE /slates/1
      def destroy
        @slate.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_slate
        @slate = Slate.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def slate_params
        params.require(:slate).permit(
          :title,
          items_attributes: [
            :id,
            :description,
          ],
        ).to_hash
      end
    end
  end
end