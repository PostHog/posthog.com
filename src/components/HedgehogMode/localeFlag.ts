import type { HedgehogActorFlagOption } from '@posthog/hedgehog-mode'

// The flag for the region of a language tag (pt-PT, de-AT, es-419), for the countries where a translated
// language is spoken. A region that is not here gets the globe. Taiwan, Hong Kong, and Macau are left out on
// purpose, so Chinese only gets the flag of China. Regions shared by several languages (CH, BE) are listed once.
const REGION_FLAGS: Record<string, HedgehogActorFlagOption> = {
    // Portuguese
    br: 'brazil',
    pt: 'portugal',
    ao: 'angola',
    mz: 'mozambique',
    cv: 'cabo-verde',
    gw: 'guinea-bissau',
    st: 'sao-tome-and-principe',
    tl: 'timor-leste',
    // Spanish
    es: 'spain',
    mx: 'mexico',
    ar: 'argentina',
    co: 'colombia',
    cl: 'chile',
    pe: 'peru',
    ve: 'venezuela',
    ec: 'ecuador',
    gt: 'guatemala',
    cu: 'cuba',
    bo: 'bolivia',
    do: 'dominican-republic',
    hn: 'honduras',
    py: 'paraguay',
    sv: 'el-salvador',
    ni: 'nicaragua',
    cr: 'costa-rica',
    pa: 'panama',
    uy: 'uruguay',
    pr: 'puerto-rico',
    gq: 'equatorial-guinea',
    us: 'united-states',
    // French
    fr: 'france',
    be: 'belgium',
    ca: 'canada',
    lu: 'luxembourg',
    mc: 'monaco',
    sn: 'senegal',
    ci: 'cote-divoire',
    cm: 'cameroon',
    ml: 'mali',
    bf: 'burkina-faso',
    ne: 'niger',
    td: 'chad',
    gn: 'guinea',
    bj: 'benin',
    tg: 'togo',
    cd: 'dr-congo',
    cg: 'congo',
    ga: 'gabon',
    mg: 'madagascar',
    ht: 'haiti',
    rw: 'rwanda',
    bi: 'burundi',
    dj: 'djibouti',
    km: 'comoros',
    // German
    de: 'germany',
    at: 'austria',
    ch: 'switzerland',
    li: 'liechtenstein',
    // Italian
    it: 'italy',
    sm: 'san-marino',
    va: 'vatican-city',
    // Arabic
    sa: 'saudi-arabia',
    ae: 'united-arab-emirates',
    eg: 'egypt',
    ma: 'morocco',
    dz: 'algeria',
    tn: 'tunisia',
    jo: 'jordan',
    lb: 'lebanon',
    kw: 'kuwait',
    qa: 'qatar',
    bh: 'bahrain',
    om: 'oman',
    iq: 'iraq',
    ly: 'libya',
    ye: 'yemen',
    sd: 'sudan',
    mr: 'mauritania',
    so: 'somalia',
    ps: 'palestine',
    // Japanese, Korean, Polish, Turkish, and Chinese
    jp: 'japan',
    kr: 'south-korea',
    pl: 'poland',
    tr: 'turkiye',
    xk: 'kosovo',
    cn: 'china',
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

const parse = (tag: string) => {
    const [language, ...subtags] = tag.toLowerCase().split(/[-_]/)
    // The region is two letters or three digits, after an optional script: zh-Hans-CN, es-419.
    return { language, region: subtags.find((subtag) => /^([a-z]{2}|\d{3})$/.test(subtag)) }
}

/**
 * The flag that the hedgehog holds on the page of a locale, or undefined when the visitor isn't on their
 * own page. `tag` is the visitor's `preferredTag()` from `navigator.languages`, the same tag that the
 * middleware redirects with. So an English browser on /ja gets no hedgehog, and neither does zh-TW on /zh.
 *
 * The country comes from the first tag in `languages` that has the language of the page and a region, even
 * when `tag` has no region: ['pt', 'pt-PT'] on /pt gets Portugal. Only that first region counts, so
 * ['zh-TW', 'zh-CN'] on /zh gets the globe, not China. Without any region, the flag of the language is used.
 */
export function localeFlag(
    locale: string,
    tag: string | undefined,
    languages: readonly string[]
): HedgehogActorFlagOption | undefined {
    if (!tag || parse(tag).language !== locale) return

    const region = languages.map(parse).find((parsed) => parsed.language === locale && parsed.region)?.region
    if (region) return REGION_FLAGS[region] ?? 'earth'

    return LANGUAGE_FLAGS[locale] ?? 'earth'
}
