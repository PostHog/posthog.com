// The POST carries a multi-megabyte resume, so it is the request most likely to drop on a flaky
// connection. A `fetch` rejection means the request never reached the handler, so send it once more
// before we tell the candidate their finished application failed.
export const postApplication = async (form: FormData): Promise<Response> => {
    try {
        return await fetch('/api/apply', { method: 'POST', body: form })
    } catch {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return fetch('/api/apply', { method: 'POST', body: form })
    }
}
