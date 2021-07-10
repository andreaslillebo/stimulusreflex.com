const deg = Math.PI / 180

export default function rotateRGBHue (r, g, b, hue) {
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
