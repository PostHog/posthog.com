import assert from 'node:assert/strict'
import { test } from 'node:test'

import { preferredTag } from '../../i18n/preferredLocale.ts'
import { localeFlag } from './localeFlag.ts'

// What the component does with `navigator.languages`.
const flag = (locale: string, languages: string[]) => localeFlag(locale, preferredTag(languages), languages)

test('has no flag on an English page', () => {
    assert.equal(flag('en', ['pt-BR']), undefined)
    assert.equal(flag('en', ['en-US']), undefined)
})

test('has no flag when the browser does not pick the page', () => {
    assert.equal(flag('ja', ['en-US']), undefined)
    assert.equal(flag('es', ['pt-BR']), undefined)
    assert.equal(flag('es', []), undefined)
    // English ranks above Portuguese, so the middleware would not send this visitor to /pt.
    assert.equal(flag('pt', ['en-US', 'pt-BR']), undefined)
    // /zh is Simplified Chinese, so the middleware sends Traditional Chinese readers to English.
    assert.equal(flag('zh', ['zh-TW']), undefined)
    assert.equal(flag('zh', ['zh-Hant']), undefined)
})

test('skips languages without a translation, as the middleware does', () => {
    assert.equal(flag('de', ['nl-NL', 'de-DE']), 'germany')
})

test('takes the country from the region of the visitor', () => {
    assert.equal(flag('pt', ['pt-BR']), 'brazil')
    assert.equal(flag('zh', ['zh-CN']), 'china')
    assert.equal(flag('zh', ['zh-Hans-CN']), 'china')
    assert.equal(flag('es', ['es-ES']), 'spain')
    assert.equal(flag('es', ['es_mx']), 'mexico')
    assert.equal(flag('it', ['it-IT']), 'italy')
})

test('takes the country from any region where the language is spoken', () => {
    assert.equal(flag('pt', ['pt-PT']), 'portugal')
    assert.equal(flag('es', ['es-AR']), 'argentina')
    assert.equal(flag('de', ['de-AT']), 'austria')
    assert.equal(flag('it', ['it-CH']), 'switzerland')
    assert.equal(flag('fr', ['fr-CA']), 'canada')
    assert.equal(flag('ar', ['ar-SA']), 'saudi-arabia')
    assert.equal(flag('ar', ['ar-PS']), 'palestine')
    assert.equal(flag('tr', ['tr-XK']), 'kosovo')
})

test('takes the region from a later tag when the preferred tag has none', () => {
    assert.equal(flag('pt', ['pt', 'pt-PT']), 'portugal')
    assert.equal(flag('de', ['de', 'en-US', 'de-CH']), 'switzerland')
    // Only tags in the language of the page count.
    assert.equal(flag('pt', ['pt', 'es-MX']), 'earth')
})

test('gives the globe to a region without a flag', () => {
    assert.equal(flag('es', ['es-419']), 'earth')
    assert.equal(flag('ko', ['ko-KP']), 'earth')
})

test('shows the flag of China only for mainland China', () => {
    assert.equal(flag('zh', ['zh-CN']), 'china')
    assert.equal(flag('zh', ['zh-Hans-CN']), 'china')
    assert.equal(flag('zh', ['zh-SG']), 'earth')
    assert.equal(flag('zh', ['zh-Hans-HK']), 'earth')
    // The first Chinese region decides, so a visitor who ranks zh-TW first never gets China.
    assert.equal(flag('zh', ['zh-TW', 'zh-CN']), 'earth')
    assert.equal(flag('zh', ['zh', 'zh-HK']), 'earth')
})

test('uses the first tag that picks the page', () => {
    assert.equal(flag('pt', ['pt-BR', 'pt-PT']), 'brazil')
    assert.equal(flag('es', ['es-MX', 'es-ES']), 'mexico')
})

test('falls back to the language without a region', () => {
    assert.equal(flag('it', ['it']), 'italy')
    assert.equal(flag('ja', ['ja']), 'japan')
    assert.equal(flag('pt', ['pt']), 'earth')
    assert.equal(flag('zh', ['zh-Hans']), 'earth')
    assert.equal(flag('fr', ['fr']), 'earth')
    assert.equal(flag('ar', ['ar']), 'earth')
})
