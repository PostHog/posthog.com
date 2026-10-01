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
 * The flag that the hedgehog holds on the page of a locale, or undefined on an English page.
 * `languages` is `navigator.languages`. The first tag in the language of the page gives the region,
 * so pt-BR gets Brazil, pt-PT gets the globe, zh-CN gets China, and zh-TW gets the globe. A region
 * without a flag (de-AT, es-AR, es-419) gets the globe. No tag in that language, or a tag without a
 * region, gets the flag of the language.
 */
export function localeFlag(locale: string, languages: readonly string[]): HedgehogActorFlagOption | undefined {
    if (locale === 'en') return

    for (const tag of languages) {
        const [language, ...subtags] = tag.toLowerCase().split(/[-_]/)
        if (language !== locale) continue
        // The region is two letters or three digits, after an optional script: zh-Hans-CN, es-419.
        const region = subtags.find((subtag) => /^([a-z]{2}|\d{3})$/.test(subtag))
        if (region) return TAG_FLAGS[`${language}-${region}`] ?? 'earth'
        break
    }

    return LANGUAGE_FLAGS[locale] ?? 'earth'
}
