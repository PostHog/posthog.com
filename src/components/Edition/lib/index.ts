// Shared fetch helper for Edition post/category requests.
//
// The Strapi host (GATSBY_SQUEAK_API_HOST) can intermittently return an HTML
// error page instead of JSON — most notably on Vercel preview deployments,
// which fall back to a shared Strapi host. Calling `.json()` on that HTML
// throws an uncaught `SyntaxError: Unexpected token '<'`. Guard against it by
// checking `response.ok` and the content-type before parsing, and throwing a
// descriptive error so SWR surfaces it as an error state instead.
export const fetchJSON = async (url: string) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Request to ${url} failed with status ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
        throw new Error(`Expected JSON from ${url} but received "${contentType || 'unknown content type'}"`)
    }

    return response.json()
}

export const fetchCategories = (query = '') => {
    return fetchJSON(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-categories?${query}`).then((data) => {
        const categories = data?.data
        return categories
    })
}
