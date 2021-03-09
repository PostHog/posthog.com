import { LibraryPluginType } from 'types'

export const unsafeHash = (str: string) => {
    var a = 1,
        c = 0,
        h,
        o
    a = 0
    for (h = str.length - 1; h >= 0; h--) {
        o = str.charCodeAt(h)
        a = ((a << 6) & 268435455) + o + (o << 14)
        c = a & 266338304
        a = c !== 0 ? a ^ (c >> 21) : a
    }
    return String(a)
}

export const getPluginImageSrc = (plugin: LibraryPluginType) =>
    plugin.imageLink
        ? plugin.imageLink
        : plugin.url.includes('github')
        ? `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/logo.png`
        : null

export const getCookie = (name: string) => {
    var cookieValue = null
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';')
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

export const generateRandomHtmlId = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(2, 10)
