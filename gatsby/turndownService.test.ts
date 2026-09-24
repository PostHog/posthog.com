import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
    createTurndownService,
    extractTitleFromHtml,
    postProcessMarkdown,
    preprocessHtmlForTabs,
} from './turndownService.ts'

const convert = (html: string) =>
    postProcessMarkdown(createTurndownService('MCP Analytics').turndown(preprocessHtmlForTabs(html)), 'MCP Analytics')

test('exports one title without page and code actions', () => {
    const markdown = convert(`<button aria-label="Copy this page as Markdown">Copy page</button>
        <h1>MCP Analytics</h1><p>Call <code>instrument()</code>.</p>
        <div class="not-prose"><button><code>npx @posthog/wizard</code></button>
        <a href="/wizard" data-export="skip">Learn more</a></div>
        <div class="code-block"><button class="ask-posthog-ai-code-snippet">PostHog AI</button>
        <pre><code class="language-python">instrument(server, posthog)</code></pre></div>`)
    assert.equal(
        markdown,
        '# MCP Analytics\n\nCall `instrument()`.\n\n`npx @posthog/wizard`\n\n```python\ninstrument(server, posthog)\n```'
    )
    assert.equal(extractTitleFromHtml('<title>MCP Analytics - Docs - PostHog</title>'), 'MCP Analytics')
})

test('keeps empty table cells and inline formatting in their columns', () => {
    const markdown = convert(`<table><thead><tr><th>Option</th><th></th><th>Default</th></tr></thead>
        <tbody><tr><td><code>capture_model</code></td><td></td><td><strong>True</strong></td></tr>
        <tr><td><a href="/docs/mcp-analytics/privacy"><code>before_send</code></a></td>
        <td><code>str | None</code></td><td></td></tr>
        <tr><td><code>str \\| None</code></td><td></td><td></td></tr></tbody></table>`)
    assert.ok(markdown.includes('| Option |  | Default |\n| --- | --- | --- |'))
    assert.ok(markdown.includes('| `capture_model` |  | **True** |'))
    assert.ok(markdown.includes('| `str \\| None` |  |  |'))
    assert.ok(markdown.includes('| [`before_send`](/docs/mcp-analytics/privacy.md) | `str \\| None` |  |'))
})

test('keeps both code tabs and closed compatibility notes', () => {
    const markdown = convert(`<div class="code-block"><div role="tablist">
        <button role="tab">TypeScript</button><button role="tab">Python</button></div>
        <pre><code class="language-typescript">instrument(server, posthog)</code></pre>
        <div hidden><pre><code class="language-python">instrument(server, posthog)</code></pre></div></div>
        <details><summary>Compatibility</summary><p>Use a supported server.</p></details>`)
    assert.ok(markdown.includes('### TypeScript\n\n```typescript'))
    assert.ok(markdown.includes('### Python\n\n```python'))
    assert.ok(markdown.includes('Compatibility'))
    assert.ok(markdown.includes('Use a supported server.'))
})

test('exports one image for a light/dark pair but keeps unrelated images', () => {
    const markdown = convert(`<span><img src="light.png" alt="Tool calls" class="dark:hidden" />
        <img src="dark.png" alt="Tool calls" class="hidden dark:block" /></span>
        <img src="other.png" alt="Other view" class="hidden dark:block" />`)
    assert.ok(markdown.includes('![Tool calls](light.png)'))
    assert.ok(!markdown.includes('dark.png'))
    assert.ok(markdown.includes('![Other view](other.png)'))
})

test('preserves blank lines and indentation in highlighted code', () => {
    const code = '    text = """first\n\n\n\nlast"""\n    return text'
    const highlighted = code
        .split('\n')
        .map((line) => `<div class="token-line">${line}</div>`)
        .join('')
    assert.ok(convert(`<pre><code class="language-python">${highlighted}</code></pre>`).includes(code))
})
