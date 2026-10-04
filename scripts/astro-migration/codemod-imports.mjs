#!/usr/bin/env node
// Moves named imports from Gatsby-era packages to their replacements.
// Usage: node scripts/astro-migration/codemod-imports.mjs [glob...]
import fg from 'fast-glob'
import fs from 'node:fs/promises'

// package -> { name -> replacement module } ; a null module drops the import (it was unused or is handled elsewhere).
const MOVES = {
    gatsby: { Link: 'lib/navigation', navigate: 'lib/navigation', PageProps: 'lib/navigation' },
    'gatsby-link': { Link: 'lib/navigation', navigate: 'lib/navigation' },
    '@reach/router': { useLocation: 'lib/navigation', navigate: 'lib/navigation' },
    '@gatsbyjs/reach-router': {
        useLocation: 'lib/navigation',
        useNavigate: 'lib/navigation',
        navigate: 'lib/navigation',
    },
    'gatsby-plugin-image': {
        GatsbyImage: 'components/Image',
        getImage: 'components/Image',
        getImageData: 'components/Image',
        IGatsbyImageData: 'components/Image',
        ImageDataLike: 'components/Image',
        IUrlBuilderArgs: 'components/Image',
        StaticImage: null,
    },
    'gatsby-plugin-mdx': { MDXRenderer: 'components/MDXRenderer' },
    'gatsby-plugin-breakpoints': { useBreakpoint: 'hooks/useBreakpoint' },
}

const patterns = process.argv.slice(2)
// Content files are left out on purpose: their code samples contain Gatsby imports that must stay as written.
const files = await fg(patterns.length ? patterns : ['src/**/*.{js,jsx,ts,tsx}', 'contents/**/*.{js,jsx,ts,tsx}'], {
    ignore: ['**/node_modules/**'],
})

const importRe = /import\s+(type\s+)?\{([^}]*)\}\s+from\s+(['"])([^'"]+)\3;?/g

function parseSpecifiers(list) {
    return list
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => {
            const typeOnly = s.startsWith('type ')
            const body = typeOnly ? s.slice(5).trim() : s
            const [imported, local] = body.split(/\s+as\s+/)
            return { imported: imported.trim(), local: (local || imported).trim(), typeOnly, text: s }
        })
}

let changedFiles = 0
for (const file of files) {
    const source = await fs.readFile(file, 'utf8')
    const added = new Map() // module -> Set(specifier text)
    let changed = false

    let result = source.replace(importRe, (whole, typeKeyword, list, quote, pkg) => {
        const moves = MOVES[pkg]
        if (!moves) return whole
        const keep = []
        for (const spec of parseSpecifiers(list)) {
            if (!(spec.imported in moves)) {
                keep.push(spec.text)
                continue
            }
            changed = true
            const target = moves[spec.imported]
            if (!target) continue
            const text = spec.local === spec.imported ? spec.imported : `${spec.imported} as ${spec.local}`
            if (!added.has(target)) added.set(target, new Set())
            added.get(target).add((typeKeyword || spec.typeOnly ? 'type ' : '') + text)
        }
        if (keep.length === parseSpecifiers(list).length) return whole
        return keep.length ? `import ${typeKeyword || ''}{ ${keep.join(', ')} } from ${quote}${pkg}${quote}` : ''
    })

    if (!changed) continue
    const lines = [...added].map(([module, specs]) => `import { ${[...specs].join(', ')} } from "${module}"`)
    if (lines.length) {
        // Put the new imports after the last top-level import statement.
        const lastImport = [...result.matchAll(/^import\s(?:[^;'"]*?from\s*)?['"][^'"]+['"];?[ \t]*$/gm)].pop()
        const at = lastImport ? lastImport.index + lastImport[0].length : 0
        result = result.slice(0, at) + (at ? '\n' : '') + lines.join('\n') + (at ? '' : '\n') + result.slice(at)
    }
    result = result.replace(/\n{3,}/g, '\n\n')
    await fs.writeFile(file, result)
    changedFiles++
}
console.log(`imports: rewrote ${changedFiles} files`)
