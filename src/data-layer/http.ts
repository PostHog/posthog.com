// fetch with retries, for build-time API calls.

export async function fetchJson<T = any>(url: string, init: RequestInit = {}, attempts = 3): Promise<T> {
    let lastError: unknown
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await fetch(url, init)
            if (!response.ok) {
                throw new Error(
                    `${response.status} ${response.statusText} for ${url}: ${(await response.text()).slice(0, 200)}`
                )
            }
            return (await response.json()) as T
        } catch (error) {
            lastError = error
            if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
        }
    }
    throw lastError
}

export async function fetchText(url: string, init: RequestInit = {}): Promise<string> {
    const response = await fetch(url, init)
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
    return response.text()
}

/** Runs `task` over `items` with at most `limit` running at once. */
export async function mapLimit<T, R>(
    items: T[],
    limit: number,
    task: (item: T, index: number) => Promise<R>
): Promise<R[]> {
    const results: R[] = new Array(items.length)
    let next = 0
    async function worker() {
        while (next < items.length) {
            const index = next++
            results[index] = await task(items[index], index)
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
    return results
}
