class ApplicationController < ActionController::Base
  include CableReady::Broadcaster
  include SessionWarmer
end
