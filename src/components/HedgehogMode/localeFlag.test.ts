import assert from 'node:assert/strict'
import { test } from 'node:test'

import { preferredTag } from '../../i18n/preferredLocale.ts'
import { localeFlag } from './localeFlag.ts'

// What the component does with `navigator.languages`.
const flag = (locale: string, languages: string[]) => localeFlag(locale, preferredTag(languages))

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
    assert.equal(flag('zh', ['zh-TW', 'zh-CN']), 'china')
})

test('takes the country from the region of the visitor', () => {
    assert.equal(flag('pt', ['pt-BR']), 'brazil')
    assert.equal(flag('zh', ['zh-CN']), 'china')
    assert.equal(flag('zh', ['zh-Hans-CN']), 'china')
    assert.equal(flag('es', ['es-ES']), 'spain')
    assert.equal(flag('es', ['es_mx']), 'mexico')
    assert.equal(flag('it', ['it-IT']), 'italy')
})

test('gives the globe to a region without a flag', () => {
    assert.equal(flag('pt', ['pt-PT']), 'earth')
    assert.equal(flag('es', ['es-AR']), 'earth')
    assert.equal(flag('es', ['es-419']), 'earth')
    assert.equal(flag('de', ['de-AT']), 'earth')
    assert.equal(flag('it', ['it-CH']), 'earth')
    assert.equal(flag('ar', ['ar-SA']), 'earth')
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
