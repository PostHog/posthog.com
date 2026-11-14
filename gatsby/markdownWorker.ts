import fs from 'node:fs'
import path from 'node:path'
import { parentPort, workerData } from 'node:worker_threads'
import { convertHtmlToAgentMarkdown, extractTitleFromHtml } from './turndownService.ts'
const { nodes, publicPath } = workerData
const pages: Array<{ slug: string; title: string; markdown: string }> = []
for (const node of nodes) {
    try {
        const { slug } = node.fields
        const html = fs.readFileSync(path.join(publicPath, slug, 'index.html'), 'utf8')
        const title = extractTitleFromHtml(html) || node.frontmatter.title || 'Untitled'
        pages.push({ slug, title, markdown: convertHtmlToAgentMarkdown(html, title, slug) })
    } catch {
        continue
    }
}
parentPort!.postMessage(pages)
