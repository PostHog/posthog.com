const RETRY_DELAYS_MS = [1000, 5000]
const NULL_BODY_STATUSES = new Set([101, 204, 205, 304])

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchWithRetry = async (input: string | URL, init?: RequestInit): Promise<Response> => {
    for (let attempt = 0; ; attempt++) {
        const retryDelay = RETRY_DELAYS_MS[attempt]
        try {
            const response = await fetch(input, init)
            if (response.status >= 500 && retryDelay !== undefined) {
                await wait(retryDelay)
                continue
            }
            const body = NULL_BODY_STATUSES.has(response.status) ? null : await response.arrayBuffer()
            return new Response(body, response)
        } catch (error) {
            if (retryDelay === undefined) {
                throw error
            }
            console.warn(`Retrying ${String(input).split('?')[0]} after fetch error: ${error}`)
            await wait(retryDelay)
        }
    }
}
