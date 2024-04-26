import { throttle } from './common'

export const remBase = 14

let htmlFontSize

    !(function() {
    const calc = function() {
        const maxFontSize = 18
        const minFontSize = 14
        const html = document.getElementsByTagName('html')[0]
        const width = html.clientWidth
        let size = remBase * (width / 1440)
        size = Math.min(maxFontSize, size)
        size = Math.max(minFontSize, size)
        html.style.fontSize = size + 'px'
        htmlFontSize = size
    }
    calc()
    window.addEventListener('resize', throttle(calc, 500))
})()

// Calculated according to the reference size
// Used for static styles
export function toRem(px) {
    return `${px / remBase}rem`
}

// Calculated based on the current html root font size
// Used for dynamic computation of some js
export function toCurrentRem(px) {
    return `${px / htmlFontSize}rem`
}