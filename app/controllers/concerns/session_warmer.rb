# frozen_string_literal: true

module SessionWarmer
  extend ActiveSupport::Concern
  
  included do
    before_action do
      session[:ping] = true
    end
  end
end