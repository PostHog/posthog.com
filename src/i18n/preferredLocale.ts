/**
 * Which translated home page a visitor's languages pick. middleware.ts uses it to redirect `/`, and the
 * hedgehog uses it to decide if the visitor is on their own page. This file has no imports, so the Edge
 * middleware can import it.
 *
 * The Edge runtime cannot read the YAML in src/i18n/locales, so the codes are listed here too.
 * middleware.test.ts fails when this list and the YAML files disagree.
 */
export const TRANSLATED_LOCALES = ['pt', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'tr', 'zh', 'ar']

const TRADITIONAL_CHINESE = ['hant', 'tw', 'hk', 'mo']

/**
 * The page for a language tag, or undefined when there is none. /zh is Simplified Chinese, so a
 * Traditional Chinese tag (zh-TW, zh-HK, zh-MO, zh-Hant) gets English rather than the wrong script.
 */
export function translatedLocale(tag: string): string | undefined {
    const [language, ...subtags] = tag.toLowerCase().split(/[-_]/)
    const traditionalChinese =
        language === 'zh' && !subtags.includes('hans') && subtags.some((subtag) => TRADITIONAL_CHINESE.includes(subtag))
    return TRANSLATED_LOCALES.includes(language) && !traditionalChinese ? language : undefined
}

/**
 * The first tag that has a translated page, or undefined when an English tag comes first or none match.
 * `tags` is ranked best first, as in `navigator.languages`.
 */
export function preferredTag(tags: readonly string[]): string | undefined {
    for (const tag of tags) {
        if (tag.split(/[-_]/)[0].toLowerCase() === 'en') return
        if (translatedLocale(tag)) return tag
    }
}
