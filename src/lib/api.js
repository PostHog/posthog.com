async function getJSONOrThrow(response) {
    try {
        return await response.json()
    } catch (e) {
        throw new Error('Something went wrong when parsing the response from the server.')
    }
}

class Api {
    async get(url) {
        if (url.indexOf('http') !== 0) {
            url = '/' + url + (url.indexOf('?') === -1 && url[url.length - 1] !== '/' ? '/' : '')
        }
        const response = await fetch(url)

        if (!response.ok) {
            const data = await getJSONOrThrow(response)
            throw { status: response.status, ...data }
        }
        return await getJSONOrThrow(response)
    }

    async update(url, data) {
        if (url.indexOf('http') !== 0) {
            url = '/' + url + (url.indexOf('?') === -1 && url[url.length - 1] !== '/' ? '/' : '')
        }
        const isFormData = data instanceof FormData
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            },
            body: isFormData ? data : JSON.stringify(data),
        })
        if (!response.ok) {
            const data = await getJSONOrThrow(response)
            if (Array.isArray(data)) {
                throw data
            }
            throw { status: response.status, ...data }
        }
        return await getJSONOrThrow(response)
    }

    async create(url, data) {
        if (url.indexOf('http') !== 0) {
            url = '/' + url + (url.indexOf('?') === -1 && url[url.length - 1] !== '/' ? '/' : '')
        }
        const isFormData = data instanceof FormData
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            },
            body: isFormData ? data : JSON.stringify(data),
        })
        if (!response.ok) {
            const data = await getJSONOrThrow(response)
            if (Array.isArray(data)) {
                throw data
            }
            throw { status: response.status, ...data }
        }
        return await getJSONOrThrow(response)
    }

    async delete(url) {
        if (url.indexOf('http') !== 0) {
            url = '/' + url + (url.indexOf('?') === -1 && url[url.length - 1] !== '/' ? '/' : '')
        }
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        if (!response.ok) {
            const data = await getJSONOrThrow(response)
            throw { status: response.status, ...data }
        }
        return response
    }
}

let api = new Api()
export default api
