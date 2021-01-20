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

export const getPluginImageSrc = (plugin) =>
    plugin.imageLink
        ? plugin.imageLink
        : plugin.url.includes('github')
        ? `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/logo.png`
        : null
