import fs from 'node:fs/promises'
import { format } from 'prettier'

// Keep the tier-list inventory in sync with the official catalog, including every variant.
const source = 'https://brand.posthog.com/catalog.json'
const response = await fetch(source)
if (!response.ok) throw new Error(`Brand catalog returned ${response.status}`)
const catalog = await response.json()
const hoggies = catalog.hoggies.flatMap((hog) =>
    hog.images.map((image) => ({
        slug: new URL(image.png).pathname
            .split('/')
            .pop()
            .replace(/\.png$/, ''),
        name: `${hog.name}${image.variant ? ` (${image.variant})` : ''}`,
        tags: hog.tags,
    }))
)
const tierColors = ['coral', 'tangerine', 'lemon', 'green', 'blue'].map(
    (slug) => catalog.colors.find((color) => color.slug === slug).lighter
)
await fs.writeFile(
    new URL('../src/components/TierList/assets.json', import.meta.url),
    format(JSON.stringify({ source, version: catalog.package.version, tierColors, hoggies }), { parser: 'json' })
)
console.log(`Updated ${hoggies.length} hoggies from PostHog Brand ${catalog.package.version}`)
