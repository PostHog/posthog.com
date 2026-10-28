import { SQUEAK_HOST } from 'lib/strapi'
import { isSafeInternalPath } from 'lib/utils'

const POSTHOG_OAUTH_REDIRECT_PATH = '/connect/posthog/redirect'
const RETURN_PATH_KEY = 'posthog_oauth_return_path'

const isSafeReturnPath = (path: string | null): path is string =>
    isSafeInternalPath(path) && !path.startsWith(POSTHOG_OAUTH_REDIRECT_PATH)

export const startPostHogOAuth = ({ intent }: { intent?: 'link' } = {}): void => {
    const { pathname, search, hash } = window.location
    const currentPath = `${pathname}${search}${hash}`
    if (isSafeReturnPath(currentPath)) {
        sessionStorage.setItem(RETURN_PATH_KEY, currentPath)
    }
    if (intent) {
        localStorage.setItem('posthog_oauth_intent', intent)
    }
    window.location.href = `${SQUEAK_HOST}/api/connect/posthog`
}

export const consumePostHogOAuthReturnPath = (): string | null => {
    const path = sessionStorage.getItem(RETURN_PATH_KEY)
    sessionStorage.removeItem(RETURN_PATH_KEY)
    return isSafeReturnPath(path) ? path : null
}
