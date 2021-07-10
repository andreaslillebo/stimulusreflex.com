import consumer from './consumer'
import CableReady from 'cable_ready'

function throttle (callback, interval) {
  let enableCall = true

  return function (...args) {
    if (!enableCall) return

    enableCall = false
    callback.apply(this, args)
    setTimeout(() => (enableCall = true), interval)
  }
}

const deg = Math.PI / 180

function rotateRGBHue (r, g, b, hue) {
  const cosA = Math.cos(hue * deg)
  const sinA = Math.sin(hue * deg)
  const neo = [
    cosA + (1 - cosA) / 3,
    (1 - cosA) / 3 - Math.sqrt(1 / 3) * sinA,
    (1 - cosA) / 3 + Math.sqrt(1 / 3) * sinA
  ]
  const result = [
    r * neo[0] + g * neo[1] + b * neo[2],
    r * neo[2] + g * neo[0] + b * neo[1],
    r * neo[1] + g * neo[2] + b * neo[0]
  ]
  return result.map(x => uint8(x))
}

function uint8 (value) {
  return 0 > value ? 0 : 255 < value ? 255 : Math.round(value)
}

const createCursor = id => {
  const clone = document
    .getElementById('being')
    .content.firstElementChild.cloneNode(true)
  const svg = document.body.appendChild(clone)
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
