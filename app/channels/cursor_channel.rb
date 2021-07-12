class CursorChannel < ApplicationCable::Channel
  def subscribed
    stream_from "cursor"
  end

  def receive(data)
    ActionCable.server.broadcast("cursor", data.merge(session: session_id))
  end
end
