import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeCatalog } from './catalog.ts'

const fixture = () => ({
    package: { version: '1.2.3' },
    hoggies: [
        { name: 'New hoggie', tags: ['new'], images: [{ png: 'https://brand.posthog.com/hoggies/new-hoggie.png' }] },
        {
            name: 'Climber',
            images: [
                { variant: '1', png: 'https://brand.posthog.com/hoggies/climber-1.png' },
                { variant: '2', png: 'https://brand.posthog.com/hoggies/climber-2.png' },
            ],
        },
    ],
    colors: ['coral', 'tangerine', 'lemon', 'green', 'blue'].map((slug) => ({ slug, lighter: '#abcdef' })),
})

test('new catalog releases include all illustrations, variants, names, and search tags', () => {
    const result = normalizeCatalog(fixture())
    assert.equal(result?.version, '1.2.3')
    assert.deepEqual(result?.hoggies, [
        { slug: 'new-hoggie', name: 'New hoggie', tags: ['new'] },
        { slug: 'climber-1', name: 'Climber (1)', tags: [] },
        { slug: 'climber-2', name: 'Climber (2)', tags: [] },
    ])
    assert.deepEqual(result?.tierColors, Array(5).fill('#abcdef'))
})

test('malformed or incomplete catalogs select the saved fallback', () => {
    for (const value of [null, {}, { ...fixture(), hoggies: [] }, { ...fixture(), colors: [] }]) {
        assert.equal(normalizeCatalog(value), null)
    }
    const duplicate = fixture()
    duplicate.hoggies.push(duplicate.hoggies[0])
    assert.equal(normalizeCatalog(duplicate), null)
    const invalidImage = fixture()
    invalidImage.hoggies[0].images[0].png = 'https://example.com/hoggies/new-hoggie.png'
    assert.equal(normalizeCatalog(invalidImage), null)
})
