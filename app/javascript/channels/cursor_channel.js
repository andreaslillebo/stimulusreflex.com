import consumer from './consumer'
import rotateRGBHue from '../lib/color'
import throttle from '../lib/throttle'
import CableReady from 'cable_ready'

const createCursor = id => {
  const clone = document
    .getElementById('being')
    .content.firstElementChild.cloneNode(true)
  const svg = document.body.appendChild(clone)
  const hue = Math.floor(Math.random() * 360)
  const color = {
    '#BA6598': rotateRGBHue(186, 101, 152, hue),
    '#FFD9F0': rotateRGBHue(255, 217, 240, hue),
    '#E096C3': rotateRGBHue(224, 150, 195, hue),
    '#F5B9DD': rotateRGBHue(245, 185, 221, hue),
    '#F0F0F0': rotateRGBHue(240, 240, 240, hue),
    white: rotateRGBHue(255, 255, 255, hue)
  }
  svg.querySelectorAll('[fill]').forEach(f => {
    const rgb = color[f.getAttribute('fill')]
    f.setAttribute('fill', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
  })
  svg.id = id
  svg.classList = 'cursor'
  return svg
}

const session = document.head.querySelector('meta[name="session"]').content

const cursorChannel = consumer.subscriptions.create('CursorChannel', {
  received (data) {
    if (data.cableReady) {
      CableReady.perform(data.operations, {
        emitMissingElementWarnings: false
      })
    } else {
      if (data.session === session) return
      const el =
        document.getElementById(data.session) || createCursor(data.session)
      el.style.left = data.x + 'px'
      el.style.top = data.y + 'px'
    }
  }
})

document.addEventListener(
  'mousemove',
  throttle(e => {
    if (!consumer.connection.disconnected)
      cursorChannel.send({ x: e.pageX, y: e.pageY })
  }, 40)
)
