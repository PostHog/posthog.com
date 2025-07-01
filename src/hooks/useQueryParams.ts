import { useState, useEffect } from 'react'

export const useQueryParams = (): URLSearchParams => {
    const [queryParams, setQueryParams] = useState<URLSearchParams>(new URLSearchParams())

    useEffect(() => {
        // Only run on client-side after hydration
        if (typeof window !== 'undefined') {
            setQueryParams(new URLSearchParams(window.location.search))
        }
    }, [])

    return queryParams
}

export const useAppendQueryParams = () => {
    const queryParams = useQueryParams()

    return (url: string): string => {
        // Check if URL is already absolute (has protocol)
        const isAbsoluteUrl = /^https?:\/\//.test(url)

        if (isAbsoluteUrl) {
            // For absolute URLs, use URL constructor for proper parsing
            try {
                const urlObj = new URL(url)
                const searchParams = new URLSearchParams(urlObj.search)

                // Add current page query parameters
                queryParams.forEach((value, key) => {
                    // Only add if the parameter doesn't already exist in the target URL
                    if (!searchParams.has(key)) {
                        searchParams.set(key, value)
                    }
                })

                urlObj.search = searchParams.toString()
                return urlObj.toString()
            } catch (error) {
                console.error('JFBW: Failed to parse URL, using fallback method:', error)
            }
        }

        // For relative URLs, use fallback method to preserve relative nature
        const [urlWithoutFragment, fragment] = url.split('#')
        const separator = urlWithoutFragment.includes('?') ? '&' : '?'
        const newParams: string[] = []

        queryParams.forEach((value, key) => {
            // Only add if the parameter doesn't already exist in the URL
            if (!url.includes(`${key}=`)) {
                newParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            }
        })

        const result =
            newParams.length > 0 ? `${urlWithoutFragment}${separator}${newParams.join('&')}` : urlWithoutFragment
        return fragment ? `${result}#${fragment}` : result
    }
}
