// Compiles content MDX (and .md, which is also treated as MDX) to React modules.
//
// Astro ships its own `astro:markdown` plugin that claims every `.md` load, so this plugin moves
// itself in front of it. That keeps the real file path as the module id, which keeps HMR working.
import { compile } from '@mdx-js/mdx'
import fs from 'node:fs'
import path from 'node:path'
import { formatFor, mdxCompileOptions } from './options.mjs'

const MDX_FILE = /\.mdx?$/

/**
 * @param {{ roots: string[], bareImportRoots: string[], aliases: string[] }} options
 *   roots: directories whose .md/.mdx files are compiled as MDX.
 *   bareImportRoots: directories searched for bare imports such as `product-analytics/...`.
 *   aliases: import roots that win over bareImportRoots.
 */
export default function mdxContent({ roots, bareImportRoots, aliases }) {
    let development = false
    const isContent = (file) => MDX_FILE.test(file) && roots.some((root) => file.startsWith(root + path.sep))

    const plugin = {
        name: 'posthog:mdx-content',
        enforce: 'pre',
        configResolved(config) {
            development = config.command === 'serve'
            const plugins = /** @type {any[]} */ (config.plugins)
            const markdownIndex = plugins.findIndex((p) => p.name === 'astro:markdown')
            const selfIndex = plugins.indexOf(plugin)
            if (markdownIndex !== -1 && selfIndex > markdownIndex) {
                plugins.splice(selfIndex, 1)
                plugins.splice(markdownIndex, 0, plugin)
            }
        },
        async resolveId(source, importer, options) {
            if (!importer || source.startsWith('.') || source.startsWith('/') || source.startsWith('\0')) return
            if (!roots.some((root) => importer.startsWith(root + path.sep))) return
            const first = source.split('/')[0]
            if (aliases.includes(first)) return
            for (const root of bareImportRoots) {
                if (!fs.existsSync(path.join(root, first))) continue
                const resolved = await this.resolve(path.join(root, source), importer, { ...options, skipSelf: true })
                if (resolved) return resolved
            }
        },
        async load(id) {
            const [file, query] = id.split('?')
            if (query || !isContent(file)) return
            const value = await fs.promises.readFile(file, 'utf8')
            const result = await compile(
                { value, path: file },
                mdxCompileOptions({ development, format: formatFor(file) })
            )
            return { code: String(result.value), map: result.map, moduleType: 'js' }
        },
    }
    return plugin
}
