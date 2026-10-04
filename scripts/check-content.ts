// Validates every content entry against its collection schema (src/content/schemas.ts) and lists
// all mismatches at once. Astro's sync stops at the first one.
// Usage: tsx scripts/check-content.ts
import fg from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import { definitions } from '../src/content/schemas'
import { splitFrontmatter } from '../src/lib/mdx/frontmatter.mjs'

let failures = 0
let total = 0
for (const [name, { base, pattern, schema }] of Object.entries(definitions)) {
    for (const file of fg.sync(pattern, { cwd: base })) {
        total++
        const { data } = splitFrontmatter(fs.readFileSync(path.join(base, file), 'utf8'))
        const result = schema.safeParse(data)
        if (!result.success) {
            failures++
            const issues = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
            console.log(`${name} ${path.join(base, file)}: ${issues}`)
        }
    }
}
console.log(`\n${total - failures}/${total} entries match their schema`)
process.exitCode = failures ? 1 : 0
