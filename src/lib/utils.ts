import { AuthorsData, LibraryPluginType } from 'types'

export const unsafeHash = (str: string) => {
    let a = 1,
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
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
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

export const mergeClassList = (...args: (string | null | undefined | false)[]): string =>
    args.filter((classList) => !!classList).join(' ')

export const findAuthor = (authors: AuthorsData[]) => (authorKey?: string) =>
    authors?.find(({ handle }) => handle === authorKey)

// custom function to add scroll offset in the top of section
export const scrollWithOffset = (id: string, offset: number) => {
    const element = document.querySelector(id)
    if (element) {
        const offsetY = offset || -90 // scroll offset (default = -90)
        const y = element.getBoundingClientRect().top + window.pageYOffset + offsetY
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g // eslint-disable-line no-control-regex

// tests email address for RFC 5322 compliance
export const isValidEmailAddress = (email: string): boolean => emailRegex.test(email)
