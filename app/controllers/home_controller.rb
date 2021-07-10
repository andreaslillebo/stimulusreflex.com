class HomeController < ApplicationController
  include CableReady::Broadcaster
  include Pagy::Backend
end