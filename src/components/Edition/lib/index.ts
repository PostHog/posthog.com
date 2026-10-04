export const fetchCategories = (query = '') => {
    return fetch(`${import.meta.env.PUBLIC_SQUEAK_API_HOST}/api/post-categories?${query}`)
        .then((res) => res.json())
        .then((data) => {
            const categories = data?.data
            return categories
        })
}
