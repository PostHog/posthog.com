/**
 * Set by "View in English" on a translated home page. While it is set, middleware.ts serves English at `/`.
 * This file has no imports, so the Edge middleware can import it.
 */
export const SKIP_TRANSLATION_COOKIE = 'ph_skip_translation'

export const skipTranslation = () => {
    document.cookie = `${SKIP_TRANSLATION_COOKIE}=1; path=/; max-age=31536000; samesite=lax`
}
