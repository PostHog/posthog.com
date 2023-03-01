const FETCH_DEFAULTS: RequestInit = {
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    // mode: 'cors'
}

function buildUrl(host: string, path: string) {
    return host + path
}

export async function patch(host: string, url: string, body: Record<string, any>) {
    try {
        const res = await fetch(buildUrl(host, url), {
            ...FETCH_DEFAULTS,
            method: 'PATCH',
            body: JSON.stringify(body),
        })
        return processResponse(res)
    } catch (e) {
        console.error('PATCH request error', e)
        return { error: e }
    }
}

export async function doDelete(host: string, url: string, body: Record<string, any>) {
    try {
        const res = await fetch(buildUrl(host, url), {
            ...FETCH_DEFAULTS,
            method: 'DELETE',
            body: JSON.stringify(body),
        })
        return processResponse(res)
    } catch (e) {
        console.error('DELETE request error', e)
        return { error: e }
    }
}

export async function get(host: string, url: string, params: Record<string, string> | string | string[][]) {
    if (params) {
        url += '?' + new URLSearchParams(params).toString()
    }
    try {
        const res = await fetch(buildUrl(host, url), {
            ...FETCH_DEFAULTS,
            method: 'GET',
        })
        return processResponse(res)
    } catch (e) {
        console.error('GET request error', e)
        return { error: e, data: undefined }
    }
}
/**
 * Submit a POST request
 * @param  {string} host
 * @param  {string} url
 * @param  {any} body body is serialized as json
 */
export async function post(host: string, url: string, body: Record<string, any>) {
    try {
        const res = await fetch(buildUrl(host, url), {
            ...FETCH_DEFAULTS,
            method: 'POST',
            body: JSON.stringify(body),
        })
        return processResponse(res)
    } catch (e) {
        return { error: e, data: undefined }
    }
}

/**
 * Process the response according to it's status code. Success responses are deserialized as json.
 * @param  {} res Response
 */
async function processResponse(res: Response) {
    if (res.status >= 200 && res.status <= 201) {
        const data = await res.json()
        return { data, response: res }
    } else if (res.status === 400) {
        const data = await res.json()
        return { error: new Error(data?.error), response: res, data: undefined }
    } else if (res.status === 401) {
        return { error: new Error('Not authenticated'), response: res }
    } else if (res.status >= 500) {
        return { error: new Error('Unexpected error occurred'), response: res }
    }
}
