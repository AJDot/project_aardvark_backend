class HomeController < ApplicationController
  def index
    @slates = Slate.all
    render json: @slates
  end
end