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

export const classNames = (...classes: (string | null | undefined | false)[]) => {
    return classes.filter(Boolean).join(' ')
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

export const setCookie = (name: string, value: string, days: number) => {
    let expires = ''
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
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

// tests email address for RFC 5322 compliance
export function isValidEmailAddress(email: string): boolean {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export interface HubSpotUser {
    firstName: string
    lastName: string
    email: string
}

export const createHubSpotContact = ({ firstName, lastName, email }: HubSpotUser) => {
    return fetch('/api/hubspot', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
        }),
    })
}

export const kebabCase = (string) =>
    string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

export const squeakProfileLink = (profile) => (profile ? `/community/profiles/${profile.id}` : '')

export const isURL = (text: string) =>
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/gi.test(text)
