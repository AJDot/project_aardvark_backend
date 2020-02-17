module Api
  module V1
    class SlatesController < ApplicationController
      before_action :set_slate, only: [:show, :update, :destroy]

      # GET /slates
      def index
        @slates = Slate.all

        render json: @slates
      end

      # GET /slates/1
      def show
        render json: @slate
      end

      # POST /slates
      def create
        @slate = Slate.new(slate_params)

        if @slate.save
          render json: @slate, status: :created, location: @slate
        else
          render json: @slate.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /slates/1
      def update
        if @slate.update(slate_params)
          render json: @slate
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
        ).to_hash
      end
    end
  end
end