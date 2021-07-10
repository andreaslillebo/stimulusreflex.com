class CursorChannel < ApplicationCable::Channel
  def subscribed
    stream_from "cursor_channel"
  end

  def receive(data)
    ActionCable.server.broadcast("cursor_channel", data.merge(session: session_id))
  end

  def unsubscribed
    cable_ready[CursorChannel].remove(session.id).broadcast
  end
end
