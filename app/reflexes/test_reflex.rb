class TestReflex < ApplicationReflex
  def test
    cable_ready.console_log(message: "test")
    morph :nothing
  end
end