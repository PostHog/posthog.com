import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
    convertHtmlToAgentMarkdown,
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
        <a href="/wizard" data-md-export="skip">Learn more</a></div>
        <div class="code-block"><button class="ask-posthog-ai-code-snippet">PostHog AI</button>
        <pre><code class="language-python">instrument(server, posthog)</code></pre></div>`)
    assert.equal(
        markdown,
        '# MCP Analytics\n\nCall `instrument()`.\n\n`npx @posthog/wizard`\n\n```python\ninstrument(server, posthog)\n```'
    )
    assert.equal(extractTitleFromHtml('<title>MCP Analytics - Docs - PostHog</title>'), 'MCP Analytics')
})

test('keeps empty table cells and inline formatting in their columns', () => {
    const markdown = convertHtmlToAgentMarkdown(
        `<table><thead><tr><th>Option</th><th></th><th>Default</th></tr></thead>
        <tbody><tr><td><code>capture_model</code></td><td></td><td><strong>True</strong></td></tr>
        <tr><td><a href="/docs/mcp-analytics/privacy"><code>before_send</code></a></td>
        <td><code>str | None</code></td><td></td></tr>
        <tr><td><code>str \\| None</code></td><td></td><td></td></tr></tbody></table>`,
        'MCP Analytics',
        '/docs/mcp-analytics'
    )
    assert.ok(markdown.includes('| Option |  | Default |\n| --- | --- | --- |'))
    assert.ok(markdown.includes('| `capture_model` |  | **True** |'))
    assert.ok(markdown.includes('| `str \\| None` |  |  |'))
    assert.ok(
        markdown.includes('| [`before_send`](https://posthog.com/docs/mcp-analytics/privacy.md) | `str \\| None` |  |')
    )
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

test('exports agent sections, code labels, and region metadata without page controls', () => {
    const html = `<main><h1>Agent docs</h1>
        <h2 id="install">Install <span>Recommended</span></h2>
        <div class="code-block"><div class="bg-accent"><div data-md-export="skip"><span>Terminal</span></div></div>
        <pre><code class="language-bash">npm install posthog-js</code></pre></div>
        <div class="code-block"><div class="bg-accent"><div><span>vite.config.ts</span></div></div>
        <pre><code class="language-typescript">const client = posthog</code></pre></div>
        <pre><code>curl https://us.i.posthog.com https://webhooks.us.posthog.com</code></pre>
        <h2 id="configure">Configure</h2>
        <div class="my-4"><ul><li><button role="tab">Cloud<span>2</span></button></li></ul>
        <div role="tabpanel"><p>Cloud instructions</p></div></div>
        <div class="code-block"><div class="bg-accent"><div role="tablist">
        <button role="tab">TypeScript<span>1</span></button></div></div>
        <pre><code class="language-typescript">posthog.init()</code></pre></div>
        <details><summary>Compatibility</summary><p>Use a supported server.</p></details>
        <a href="/docs/libraries"><div><h3>SDKs</h3><p>Choose a library</p></div></a>
        <div role="group"><button role="radio" aria-checked="true">Selected mode</button>
        <button role="radio" aria-checked="false">Other mode</button></div>
        <div role="radiogroup"><button role="radio">Another mode</button></div>
        <h2 id="connect">Connect</h2><p><a href="https://us.posthog.com">US app</a>
        or <a href="https://app.posthog.com">Legacy app</a>.</p>
        <section><h3>Still have questions?</h3><p>Ask the community.</p></section>
        <section><h3>Was this page useful?</h3><p>Rate this page.</p></section>
        <section><h3>Community questions</h3><p>Comments</p></section></main>`
    const markdown = convertHtmlToAgentMarkdown(html, 'Agent docs', '/docs/agent-test')
    assert.ok(markdown.startsWith('# Agent docs\n\nCanonical URL: https://posthog.com/docs/agent-test'))
    assert.ok(markdown.includes('> **Cloud region:**'))
    assert.ok(markdown.includes('`https://eu.i.posthog.com`'))
    assert.ok(markdown.includes('`https://webhooks.eu.posthog.com` instead of `https://webhooks.us.posthog.com`'))
    assert.ok(
        markdown.includes(
            '## On this page\n\n- [Install (recommended)](#install-recommended)\n- [Configure](#configure)\n- [Connect](#connect)'
        )
    )
    assert.ok(markdown.includes('```bash\nnpm install posthog-js\n```'))
    assert.ok(markdown.includes('vite.config.ts\n\n```typescript\nconst client = posthog\n```'))
    assert.ok(markdown.includes('## Cloud\n\nCloud instructions'))
    assert.ok(markdown.includes('### TypeScript\n\n```typescript'))
    assert.ok(markdown.includes('**Compatibility**\n\nUse a supported server.'))
    assert.ok(markdown.includes('[SDKs: Choose a library](https://posthog.com/docs/libraries.md)'))
    assert.doesNotMatch(
        markdown,
        /Terminal|Cloud2|TypeScript1|Selected mode|Other mode|Another mode|Still have questions|Was this page useful|Community questions|Ask the community|Rate this page|Comments/
    )
})

test('rewrites agent prose while preserving fenced examples and omitting unnecessary header blocks', () => {
    const code = 'npm install example\n\\`literal\\` [example](/docs/example.md)'
    const html = `<h1>Agent docs</h1><h2 id="links">Links</h2>
        <p>Use &#96;instrument()&#96; with <a href="/docs/example#privacy">privacy</a>,
        <a href="//example.com">external</a>, and <a href="#links">this section</a>.</p>
        <p>https://us.i.posthog.com and https://eu.i.posthog.com;
        https://us.posthog.com, https://app.posthog.com, and https://eu.posthog.com</p>
        <pre><code class="language-bash">${code}</code></pre>`
    const markdown = convertHtmlToAgentMarkdown(html, 'Agent docs', '/docs/agent-test')
    assert.ok(markdown.includes('Use `instrument()` with [privacy](https://posthog.com/docs/example.md#privacy)'))
    assert.ok(markdown.includes('[external](//example.com)'))
    assert.ok(markdown.includes('[this section](#links)'))
    assert.ok(markdown.includes('```bash\n' + code + '\n```'))
    assert.doesNotMatch(markdown, /Cloud region:|## On this page/)
})
