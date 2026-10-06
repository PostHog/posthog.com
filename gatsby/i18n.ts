import fs from 'fs'
import path from 'path'
import { parse } from 'yaml'
import type { Actions, Page } from 'gatsby'
import { flattenMessages, type Messages } from '../src/i18n/flatten'

const LOCALES_DIR = path.resolve(__dirname, '../src/i18n/locales')
const STATIC_DIR = path.resolve(__dirname, '../static')

// The share image of a home page: a screenshot of that page, made by scripts/home-og-images.mjs.
// A locale without one uses the site default.
const ogImage = (code: string) => {
    const image = `/images/og/home-${code}.jpg`
    return fs.existsSync(path.join(STATIC_DIR, image)) ? image : '/images/og/default.png'
}

// `lang` is the BCP 47 tag for <html lang> and hreflang, when it differs from the code: pt.yml has `lang: pt-BR`.
type Locale = { code: string; name: string; lang: string; messages: Messages }

// One YAML file per locale. The file name is the locale code, and also the URL prefix: pt.yml -> /pt.
export function readLocales(): Locale[] {
    return fs
        .readdirSync(LOCALES_DIR)
        .filter((file) => file.endsWith('.yml'))
        .map((file) => {
            const code = path.basename(file, '.yml')
            const { name, lang, messages } = parse(fs.readFileSync(path.join(LOCALES_DIR, file), 'utf8'))
            return { code, name, lang: lang || code, messages: flattenMessages(messages) }
        })
}

/**
 * Gives the English home page its locale context, and creates one copy of it per translation.
 * English strings ship in the JS bundle (see src/i18n), so only translated pages carry `messages`.
 */
export function createLocalizedHomePages(page: Page, { createPage, deletePage }: Actions) {
    const locales = readLocales()
    const english = locales.find(({ code }) => code === 'en')
    if (!english) throw new Error('[i18n] src/i18n/locales/en.yml is missing')

    const translations = locales.filter(({ code }) => code !== 'en')
    const languageAlternates = [
        { hrefLang: 'en', href: '/' },
        // A regional translation is also listed under its bare code, so pt.yml (lang: pt-BR) serves every
        // Portuguese speaker in search, not only those in Brazil. Chinese is the exception: bare "zh" also
        // covers Traditional Chinese, which /zh does not serve, so zh.yml (lang: zh-CN) is listed as zh-CN only.
        ...translations.flatMap(({ code, lang }) =>
            (lang === code ? [code] : code === 'zh' ? [lang] : [code, lang]).map((hrefLang) => ({
                hrefLang,
                href: `/${code}`,
            }))
        ),
        { hrefLang: 'x-default', href: '/' },
    ]

    deletePage(page)
    createPage({
        ...page,
        context: { ...page.context, locale: 'en', lang: 'en', languageAlternates, ogImage: ogImage('en') },
    })

    translations.forEach(({ code, lang, messages }) => {
        Object.keys(messages)
            .filter((key) => !(key in english.messages))
            .forEach((key) => console.warn(`[i18n] ${code}.yml has a key that en.yml does not have: ${key}`))

        createPage({
            ...page,
            path: `/${code}`,
            context: { ...page.context, locale: code, lang, messages, languageAlternates, ogImage: ogImage(code) },
        })
    })
}
