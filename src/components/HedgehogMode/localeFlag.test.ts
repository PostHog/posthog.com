import assert from 'node:assert/strict'
import { test } from 'node:test'

import { localeFlag } from './localeFlag.ts'

test('has no flag on an English page', () => {
    assert.equal(localeFlag('en', ['pt-BR']), undefined)
})

test('takes the country from the region of the visitor', () => {
    assert.equal(localeFlag('pt', ['pt-BR']), 'brazil')
    assert.equal(localeFlag('zh', ['zh-CN']), 'china')
    assert.equal(localeFlag('zh', ['zh-Hans-CN']), 'china')
    assert.equal(localeFlag('es', ['es-ES']), 'spain')
    assert.equal(localeFlag('es', ['es_mx']), 'mexico')
    assert.equal(localeFlag('it', ['it-IT']), 'italy')
})

test('gives the globe to a region without a flag', () => {
    assert.equal(localeFlag('pt', ['pt-PT']), 'earth')
    assert.equal(localeFlag('zh', ['zh-TW']), 'earth')
    assert.equal(localeFlag('zh', ['zh-HK']), 'earth')
    assert.equal(localeFlag('es', ['es-AR']), 'earth')
    assert.equal(localeFlag('es', ['es-419']), 'earth')
    assert.equal(localeFlag('de', ['de-AT']), 'earth')
    assert.equal(localeFlag('it', ['it-CH']), 'earth')
    assert.equal(localeFlag('ar', ['ar-SA']), 'earth')
})

test('uses the first tag in the language of the page', () => {
    assert.equal(localeFlag('pt', ['en-US', 'pt-BR', 'pt-PT']), 'brazil')
    assert.equal(localeFlag('es', ['es-MX', 'es-ES']), 'mexico')
})

test('falls back to the language without a region', () => {
    assert.equal(localeFlag('it', ['it']), 'italy')
    assert.equal(localeFlag('ja', ['en-US']), 'japan')
    assert.equal(localeFlag('pt', ['pt']), 'earth')
    assert.equal(localeFlag('zh', ['zh-Hans']), 'earth')
    assert.equal(localeFlag('es', []), 'earth')
    assert.equal(localeFlag('fr', ['fr']), 'earth')
    assert.equal(localeFlag('ar', ['ar']), 'earth')
})
