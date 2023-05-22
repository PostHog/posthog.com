export default function getBackgroundColor(el: HTMLElement): string {
    const color = window.getComputedStyle(el).backgroundColor
    if (color !== 'rgba(0, 0, 0, 0)' || el.tagName.toLowerCase() === 'body') {
        return color
    } else if (el.parentElement) {
        return getBackgroundColor(el.parentElement)
    } else {
        return ''
    }
}
