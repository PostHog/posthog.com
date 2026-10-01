import type { HedgehogActorFlagOption } from '@posthog/hedgehog-mode'

// The flag for a language tag with a region, for each country that has a flag in hedgehog mode.
const TAG_FLAGS: Record<string, HedgehogActorFlagOption> = {
    'pt-br': 'brazil',
    'de-de': 'germany',
    'es-es': 'spain',
    'es-mx': 'mexico',
    'fr-fr': 'france',
    'it-it': 'italy',
    'ja-jp': 'japan',
    'ko-kr': 'south-korea',
    'pl-pl': 'poland',
    'tr-tr': 'turkiye',
    'zh-cn': 'china',
}

// The flag for a language tag without a region, for a language that one country mostly speaks.
// Portuguese, Spanish, French, Chinese, and Arabic are spoken in many countries, so they get the globe.
const LANGUAGE_FLAGS: Record<string, HedgehogActorFlagOption> = {
    de: 'germany',
    it: 'italy',
    ja: 'japan',
    ko: 'south-korea',
    pl: 'poland',
    tr: 'turkiye',
}

/**
 * The flag that the hedgehog holds on the page of a locale, or undefined when the visitor isn't on their
 * own page. `tag` is the visitor's `preferredTag()` from `navigator.languages`, the same tag that the
 * middleware redirects with. So an English browser on /ja gets no hedgehog, and neither does zh-TW on /zh.
 * The region of the tag gives the country: pt-BR gets Brazil, pt-PT gets the globe, zh-CN gets China. A
 * region without a flag (de-AT, es-AR, es-419) gets the globe. A tag without a region gets the flag of
 * the language.
 */
export function localeFlag(locale: string, tag: string | undefined): HedgehogActorFlagOption | undefined {
    if (!tag) return

    const [language, ...subtags] = tag.toLowerCase().split(/[-_]/)
    if (language !== locale) return
    // The region is two letters or three digits, after an optional script: zh-Hans-CN, es-419.
    const region = subtags.find((subtag) => /^([a-z]{2}|\d{3})$/.test(subtag))
    if (region) return TAG_FLAGS[`${language}-${region}`] ?? 'earth'

    return LANGUAGE_FLAGS[language] ?? 'earth'
}
