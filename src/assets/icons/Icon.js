export default function createIcon({path, color, className = '', children = '', style = '', ...props} = {}, React) {
  let attrs = [];
  if (typeof path === 'string') {
    path = [path]
  }

    if (typeof style === 'string') {
        if (typeof color === 'string') {
            style += `;fill: ${ color };`
        }
    } else {
        style.fill = color;
        if (style.color) {
            style.fill = style.color;
            console.warn(`if you will set svg with color: "${style.color}", please use { fill: ${style.color} }`)
        }

        style = Object.entries(style).map(([key, value]) => `${key}: ${value};`).join('')
    }

  if (style) {
    attrs.push(`style="${style}"`)
  }

  if (props && typeof props === 'object') {
    Object.entries(props).map(([key, value]) => attrs.push(`${key}="${value}"`))
  }

  /*if (React.createElement) {

  }*/

  return (
    `<svg
      class="icon ${className}"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      ${ attrs.join(' \n') }
    >
      ${
      (path && path.length) ? path.map(data => (`<path d="${ data }"/>`)).join('') : ''
    }${
      children ? children : ''
    }
    </svg>`
  )
}
