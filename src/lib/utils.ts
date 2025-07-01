import { IMenu } from 'components/PostLayout/types'
import slugify from 'slugify'
import { LibraryPluginType } from 'types'

export const classNames = (...classes: (string | null | undefined | false)[]): string => {
    return classes.filter(Boolean).join(' ')
}

export const getPluginImageSrc = (plugin: LibraryPluginType): string | null =>
    plugin.imageLink
        ? plugin.imageLink
        : plugin.url.includes('github')
        ? `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/logo.png`
        : null

export const getCookie = (name: string): string | null => {
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

export const setCookie = (name: string, value: string, days: number): void => {
    let expires = ''
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export const generateRandomHtmlId = (): string =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(2, 10)

export const mergeClassList = (...args: (string | null | undefined | false)[]): string =>
    args.filter((classList) => !!classList).join(' ')

// custom function to add scroll offset in the top of section
export const scrollWithOffset = (id: string, offset: number): void => {
    const element = document.querySelector(id)
    if (element) {
        const offsetY = offset || -90 // scroll offset (default = -90)
        const y = element.getBoundingClientRect().top + window.pageYOffset + offsetY
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

export interface HubSpotUser {
    firstName: string
    lastName: string
    email: string
}

export const createHubSpotContact = ({ firstName, lastName, email }: HubSpotUser): Promise<Response> => {
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

export const kebabCase = (s: string): string =>
    s
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

export const isURL = (s: string): boolean => {
    try {
        new URL(s)
        return true
    } catch (_) {
        return false
    }
}

export const groupMenuItems = (items: IMenu[]): Record<string, IMenu[]> => {
    const grouped: Record<string, IMenu[]> = {}
    let currGroup: string
    items.forEach((item) => {
        if (item.url === undefined) {
            currGroup = item.name
            grouped[currGroup] = []
        } else {
            grouped[currGroup].push(item)
        }
    })
    return grouped
}

export const slugifyTeamName = (name: string): string => {
    return slugify(name.toLowerCase().replace('ops', ''), {
        lower: true,
        remove: /and/,
    })
}

/**
 * Appends query parameters from the current page to a URL
 * @param url - The base URL
 * @returns The URL with current page query parameters appended
 */
export const appendQueryParams = (url: string): string => {
    // Check if URL is already absolute (has protocol)
    const isAbsoluteUrl = /^https?:\/\//.test(url)

    if (isAbsoluteUrl) {
        // For absolute URLs, use URL constructor for proper parsing
        try {
            const urlObj = new URL(url)
            const searchParams = new URLSearchParams(urlObj.search)

            // Get current page query parameters and add them
            if (typeof window !== 'undefined') {
                const currentSearchParams = new URLSearchParams(window.location.search)
                currentSearchParams.forEach((value, key) => {
                    // Only add if the parameter doesn't already exist in the target URL
                    if (!searchParams.has(key)) {
                        searchParams.set(key, value)
                    }
                })
            }

            urlObj.search = searchParams.toString()
            return urlObj.toString()
        } catch (error) {
            // If URL parsing fails, fall back to simple query string appending
            if (typeof window !== 'undefined') {
                console.error('Failed to parse URL, using fallback method:', error)
            }
        }
    }

    // For relative URLs or if absolute URL parsing failed, use fallback method to preserve relative nature
    if (typeof window === 'undefined') {
        return url
    }

    // Handle fragments in fallback method
    const [urlWithoutFragment, fragment] = url.split('#')
    const separator = urlWithoutFragment.includes('?') ? '&' : '?'
    const currentSearchParams = new URLSearchParams(window.location.search)
    const newParams: string[] = []

    currentSearchParams.forEach((value, key) => {
        // Only add if the parameter doesn't already exist in the URL
        if (!url.includes(`${key}=`)) {
            newParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }
    })

    const result = newParams.length > 0 ? `${urlWithoutFragment}${separator}${newParams.join('&')}` : urlWithoutFragment
    return fragment ? `${result}#${fragment}` : result
}
