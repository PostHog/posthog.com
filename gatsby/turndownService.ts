import TurndownService from 'turndown'
import { JSDOM } from 'jsdom'

// One shared document for every page. A new JSDOM per page leaks through the
// selector engine's cache (about 18 MB per page across thousands of pages).
let sharedDom: JSDOM | null = null

export const preprocessHtmlForTabs = (html: string, transformDocument?: (document: Document) => void): string => {
    sharedDom ??= new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')
    const doc = sharedDom.window.document
    doc.documentElement.innerHTML = html
    doc.querySelectorAll(
        'button[aria-label="Copy this page as Markdown"], button[aria-label="More Markdown actions"], .ask-posthog-ai-code-snippet, [data-md-export="skip"]'
    ).forEach((control) => control.remove())
    transformDocument?.(doc)

    const tabContainers = Array.from(doc.querySelectorAll('div.my-4')) as HTMLElement[]
    tabContainers.forEach((container) => {
        const ul = container.querySelector('ul')
        let tabs: HTMLElement[] = []

        if (ul) {
            tabs = Array.from(ul.querySelectorAll('button[role="tab"]')) as HTMLElement[]
        } else {
            tabs = Array.from(container.querySelectorAll('button[role="tab"]')) as HTMLElement[]
        }

        const panels = Array.from(container.querySelectorAll('[role="tabpanel"]')) as HTMLElement[]

        panels.forEach((panel, index) => {
            if (tabs[index]) {
                const tabLabel = tabs[index].textContent?.trim() || tabs[index].innerText?.trim() || ''
                if (tabLabel) {
                    panel.setAttribute('data-tab-label', tabLabel)
                }
            }
        })
    })

    const codeBlockContainers = Array.from(doc.querySelectorAll('div.code-block')) as HTMLElement[]
    codeBlockContainers.forEach((container) => {
        const tablist = container.querySelector('[role="tablist"]')
        if (tablist) {
            const tabs = Array.from(tablist.querySelectorAll('button[role="tab"]')) as HTMLElement[]
            const codeBlocks = Array.from(container.querySelectorAll('pre')) as HTMLElement[]

            codeBlocks.forEach((codeBlock, index) => {
                if (tabs[index]) {
                    const languageLabel = tabs[index].textContent?.trim() || tabs[index].innerText?.trim() || ''
                    if (languageLabel) {
                        codeBlock.setAttribute('data-language-label', languageLabel)
                    }
                }
            })
        }
    })

    // ProductScreenshot renders both themes. Keep one image without hiding other tab content.
    doc.querySelectorAll('img[class~="dark:hidden"] + img[class~="dark:block"]').forEach((image) => {
        if (image.previousElementSibling?.getAttribute('alt') === image.getAttribute('alt')) {
            image.remove()
        }
    })

    return doc.documentElement.outerHTML
}

export const extractTitleFromHtml = (html: string): string => {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch) {
        const title = titleMatch[1].trim().replace(/(?: - (?:Docs|PostHog))+$/, '')
        if (title) return title
    }

    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    if (h1Match) {
        return h1Match[1].trim() || 'Untitled'
    }

    return 'Untitled'
}

export const extractMainContent = (html: string): string => {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    if (mainMatch) {
        return mainMatch[1]
    }

    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    if (articleMatch) {
        return articleMatch[1]
    }

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch) {
        return bodyMatch[1]
    }

    return html
}

export const createTurndownService = (title: string) => {
    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        emDelimiter: '*',
        strongDelimiter: '**',
        fence: '```',
    })

    turndownService.addRule('removeScriptsAndStyles', {
        filter: ['script', 'style'],
        replacement: () => '',
    })

    turndownService.addRule('removeComments', {
        filter: (node) => {
            return node.nodeType === 8
        },
        replacement: () => '',
    })

    turndownService.addRule('removeEmptyParagraphs', {
        filter: (node) => {
            return node.nodeName === 'P' && (!node.textContent || node.textContent.trim() === '')
        },
        replacement: () => '',
    })

    turndownService.addRule('handleTabPanels', {
        filter: (node) => {
            return node.nodeName === 'DIV' && node.getAttribute('role') === 'tabpanel'
        },
        replacement: (content, node) => {
            const panelContent = content.trim()
            if (!panelContent) return ''

            const tabLabel = node.getAttribute('data-tab-label') || 'Tab'

            return `## ${tabLabel}\n\n${panelContent}\n\n`
        },
    })

    turndownService.addRule('removeTabLists', {
        filter: (node) => {
            if (node.nodeName === 'UL' && node.querySelector('button[role="tab"]')) {
                return true
            }
            return node.nodeName === 'DIV' && node.getAttribute('role') === 'tablist'
        },
        replacement: () => '',
    })

    turndownService.addRule('removeStyleAttributes', {
        filter: (node) => {
            return node.nodeName === 'STYLE' || (node.nodeType === 1 && node.getAttribute('style'))
        },
        replacement: (content, node) => {
            if (node.nodeName === 'STYLE') {
                return ''
            }
            return content
        },
    })

    turndownService.addRule('cleanCodeBlocks', {
        filter: (node) => node.nodeName === 'PRE',
        replacement: (content, node) => {
            const codeElement = node.querySelector('code') || node

            const styleTags = Array.from(codeElement.querySelectorAll('style')) as HTMLElement[]
            styleTags.forEach((style) => style.remove())

            const scrollViewports = Array.from(
                codeElement.querySelectorAll('[data-radix-scroll-area-viewport]')
            ) as HTMLElement[]
            scrollViewports.forEach((viewport) => {
                while (viewport.firstChild) {
                    viewport.parentNode?.insertBefore(viewport.firstChild, viewport)
                }
                viewport.remove()
            })

            const tokenLines = codeElement.querySelectorAll('.token-line')
            let code = ''
            if (tokenLines.length > 0) {
                code = Array.from(tokenLines)
                    .map((line) => {
                        const text = (line as HTMLElement).textContent || ''
                        return text.trimEnd()
                    })
                    .join('\n')
            } else {
                code = (codeElement as HTMLElement).textContent || ''
            }

            if (!code.trim()) return ''

            const classAttr = codeElement.getAttribute('class') || node.getAttribute('class') || ''
            const languageMatch = classAttr.match(/language-(\w+)/)
            const language = languageMatch ? languageMatch[1] : ''

            const languageLabel = node.getAttribute('data-language-label')

            const codeBlock = language ? `\`\`\`${language}\n${code}\n\`\`\`` : `\`\`\`\n${code}\n\`\`\``

            if (languageLabel) {
                return `\n### ${languageLabel}\n\n${codeBlock}\n\n`
            }

            return `\n${codeBlock}\n\n`
        },
    })

    let hasH1 = false
    turndownService.addRule('normalizeH1', {
        filter: (node) => {
            return node.nodeName === 'H1'
        },
        replacement: (content, node) => {
            if (!hasH1) {
                hasH1 = true
                return `# ${title}\n\n`
            }
            return `## ${content}\n\n`
        },
    })

    const formatHrefForMarkdown = (href: string): string => {
        if (href.startsWith('/') && !href.startsWith('//')) {
            const [pathPart, hash] = href.replace(/\.html$/, '').split('#')
            const pathWithMd = pathPart && !pathPart.endsWith('.md') ? `${pathPart}.md` : pathPart
            return hash ? `${pathWithMd}#${hash}` : pathWithMd
        }
        return href
    }

    turndownService.addRule('processLinks', {
        filter: (node) => {
            return node.nodeName === 'A' && node.getAttribute('href')
        },
        replacement: (content, node) => {
            const href = node.getAttribute('href') || ''
            const markdownHref = formatHrefForMarkdown(href)
            return `[${content}](${markdownHref})`
        },
    })

    turndownService.addRule('removeScrollViewports', {
        filter: (node) => {
            return (
                node.nodeName === 'DIV' &&
                (node.getAttribute('data-radix-scroll-area-viewport') !== null ||
                    node.className?.includes('scroll-area'))
            )
        },
        replacement: (content) => content,
    })

    turndownService.addRule('removeTableOfContents', {
        filter: (node) => {
            const id = node.getAttribute && node.getAttribute('id')
            return id === 'toc' || id === 'mobile-toc'
        },
        replacement: () => '',
    })

    turndownService.addRule('handleHorizontalRules', {
        filter: (node) => {
            return node.nodeName === 'HR'
        },
        replacement: () => {
            return '\n\n---\n\n'
        },
    })

    const getTableCellMarkdown = (cell: HTMLElement): string =>
        turndownService
            .turndown(cell.innerHTML)
            .replace(/(\\*)\|/g, (_, slashes) => `${slashes}${slashes.length % 2 ? '' : '\\'}|`)
            .replace(/\s+/g, ' ')
            .trim()

    turndownService.addRule('handleTables', {
        filter: (node) => {
            return node.nodeName === 'TABLE'
        },
        replacement: (content, node) => {
            const thead = node.querySelector('thead')
            const tbody = node.querySelector('tbody') || node
            const rows: string[] = []

            if (thead) {
                const headerRow = thead.querySelector('tr')
                if (headerRow) {
                    const headers = Array.from(headerRow.querySelectorAll('th, td')).map((cell) =>
                        getTableCellMarkdown(cell as HTMLElement)
                    )

                    if (headers.length > 0) {
                        rows.push('| ' + headers.join(' | ') + ' |')
                        rows.push('| ' + headers.map(() => '---').join(' | ') + ' |')
                    }
                }
            }

            const bodyRows = Array.from(tbody.querySelectorAll('tr'))
            bodyRows.forEach((row) => {
                const cells = Array.from(row.querySelectorAll('td, th')).map((cell) =>
                    getTableCellMarkdown(cell as HTMLElement)
                )

                if (cells.length > 0) {
                    rows.push('| ' + cells.join(' | ') + ' |')
                }
            })

            if (rows.length > 0) {
                return '\n\n' + rows.join('\n') + '\n\n'
            }

            return '\n\n' + content.trim() + '\n\n'
        },
    })

    turndownService.addRule('formatQuestItems', {
        filter: (node) => {
            if (node.nodeName === 'A') {
                const href = node.getAttribute('href') || ''
                return href.startsWith('#quest-item-')
            }
            return false
        },
        replacement: (content, node) => {
            const href = node.getAttribute('href') || ''
            const text = content.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ')
            if (text) {
                return `[${text}](${href})`
            }
            return ''
        },
    })

    return turndownService
}

export const postProcessMarkdown = (markdown: string, title: string): string => {
    let result = markdown

    result = result.replace(/^---\n[\s\S]*?\n---\n*/, '')

    const lines = result.split('\n')
    const cleanedLines: string[] = []
    let inCodeBlock = false

    for (const line of lines) {
        const isCodeBlockStart = line.trim().startsWith('```')

        if (isCodeBlockStart) {
            inCodeBlock = !inCodeBlock
            cleanedLines.push(line)
        } else if (inCodeBlock) {
            cleanedLines.push(line)
        } else {
            if (line.includes('[data-') && line.includes(']{')) {
                continue
            }

            if (line.match(/^\[data-radix-scroll-area-viewport\]/)) {
                continue
            }

            if (/^\s*-\s*$/.test(line)) continue

            const cleaned = line.replace(/[ \t]+$/, '')
            if (cleaned || cleanedLines.length === 0 || cleanedLines[cleanedLines.length - 1]) {
                cleanedLines.push(cleaned)
            }
        }
    }

    result = cleanedLines.join('\n')

    if (!result.trim().startsWith('# ')) {
        result = `# ${title}\n\n${result}`
    }

    return result.trim()
}

const SITE_ORIGIN = 'https://posthog.com'
const PAGE_FEEDBACK_HEADINGS = new Set(['Still have questions?', 'Was this page useful?', 'Community questions'])
const MIN_TABLE_OF_CONTENTS_SECTIONS = 3

function removePageFeedback(document: Document) {
    document.querySelectorAll('h3').forEach((heading) => {
        if (!PAGE_FEEDBACK_HEADINGS.has((heading.textContent ?? '').trim())) return
        heading.parentElement?.remove()
    })
}

function inlineRecommendedBadges(document: Document) {
    const badges = Array.from(document.querySelectorAll('h2, h3, h4'))
        .flatMap((heading) => Array.from(heading.querySelectorAll('span')))
        .filter((span) => span.children.length === 0 && (span.textContent ?? '').trim() === 'Recommended')
    badges.forEach((badge) => badge.replaceWith(document.createTextNode('(recommended)')))
}

function removeTabCountBadges(document: Document) {
    const countBadges = Array.from(document.querySelectorAll('[role="tab"]'))
        .flatMap((tab) => Array.from(tab.querySelectorAll('span')))
        .filter((span) => /^\d+$/.test((span.textContent ?? '').trim()))
    countBadges.forEach((badge) => badge.remove())
}

function convertCollapsiblesToSections(document: Document) {
    const collapsibles = Array.from(document.querySelectorAll('details'))
    collapsibles.forEach((collapsible) => {
        const summary = collapsible.querySelector(':scope > summary')
        if (summary) {
            const summaryHeading = document.createElement('p')
            const summaryText = document.createElement('strong')
            summaryText.textContent = (summary.textContent ?? '').trim()
            summaryHeading.append(summaryText)
            summary.replaceWith(summaryHeading)
        }
        collapsible.replaceWith(...collapsible.childNodes)
    })
}

function flattenBlockLinks(document: Document) {
    const blockLinks = Array.from(document.querySelectorAll('a[href]')).filter(
        (link) =>
            !(link.getAttribute('href') ?? '').startsWith('#quest-item-') &&
            link.querySelector('h1, h2, h3, h4, h5, h6, p, div')
    )
    blockLinks.forEach((link) => {
        const blockTexts = Array.from(link.querySelectorAll('h1, h2, h3, h4, h5, h6, p'))
            .map((block) => (block.textContent ?? '').trim())
            .filter(Boolean)
        const flatLink = document.createElement('a')
        flatLink.setAttribute('href', link.getAttribute('href') ?? '')
        flatLink.textContent = blockTexts.length > 0 ? blockTexts.join(': ') : (link.textContent ?? '').trim()
        const linkParagraph = document.createElement('p')
        linkParagraph.append(flatLink)
        link.replaceWith(linkParagraph)
    })
}

function removeClientOnlyToggles(document: Document) {
    document.querySelectorAll('[role="group"], [role="radiogroup"]').forEach((group) => {
        if (!group.querySelector('[role="radio"]')) return
        group.remove()
    })
}

function headingSlug(headingText: string) {
    return headingText
        .toLowerCase()
        .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '')
        .replace(/ /g, '-')
}

// Markdown renderers make heading anchors from the heading text (GitHub slugger), not from the HTML ids.
function collectSectionAnchors(document: Document) {
    const headingCountsBySlug = new Map<string, number>()
    return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).flatMap((heading) => {
        const text = (heading.textContent ?? '').trim()
        const baseSlug = headingSlug(text)
        const earlierHeadingCount = headingCountsBySlug.get(baseSlug) ?? 0
        headingCountsBySlug.set(baseSlug, earlierHeadingCount + 1)
        if (heading.tagName !== 'H2' || !text || PAGE_FEEDBACK_HEADINGS.has(text)) return []
        return [{ id: earlierHeadingCount === 0 ? baseSlug : `${baseSlug}-${earlierHeadingCount}`, text }]
    })
}

function rewriteProseLines(markdown: string, rewriteLine: (line: string) => string) {
    let isInsideFence = false
    return markdown
        .split('\n')
        .map((line) => {
            if (/^\s*(```|~~~)/.test(line)) {
                isInsideFence = !isInsideFence
                return line
            }
            if (isInsideFence) return line
            return rewriteLine(line)
        })
        .join('\n')
}

function unescapeLiteralCodeSpans(line: string) {
    return line.replace(
        /\\`([^`\n]+?)\\`/g,
        (_, escapedCode: string) => `\`${escapedCode.replace(/\\([\\`*_{}[\]()#+\-.!>~])/g, '$1')}\``
    )
}

function absolutizeRootRelativeLinks(line: string) {
    return line.replace(/\]\(\/(?!\/)/g, `](${SITE_ORIGIN}/`)
}

const US_TO_EU_HOST_SWAPS = [
    { usHost: 'us.i.posthog.com', euHost: 'eu.i.posthog.com', role: 'ingestion host' },
    { usHost: 'us-assets.i.posthog.com', euHost: 'eu-assets.i.posthog.com', role: 'assets host' },
    { usHost: 'webhooks.us.posthog.com', euHost: 'webhooks.eu.posthog.com', role: 'webhooks host' },
    { usHost: 'us.posthog.com', euHost: 'eu.posthog.com', role: 'app host for links' },
    { usHost: 'app.posthog.com', euHost: 'eu.posthog.com', role: 'app host for links' },
]

function mentionsHost(markdown: string, host: string) {
    return new RegExp(`(?<![\\w.-])${host.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`).test(markdown)
}

function findUsOnlyHostSwaps(markdown: string) {
    return US_TO_EU_HOST_SWAPS.filter(
        ({ usHost, euHost }) => mentionsHost(markdown, usHost) && !mentionsHost(markdown, euHost)
    )
}

function buildRegionNote(hostSwaps: typeof US_TO_EU_HOST_SWAPS) {
    const usHostsByEuHost = new Map<string, { role: string; usHosts: string[] }>()
    hostSwaps.forEach(({ usHost, euHost, role }) => {
        const swap = usHostsByEuHost.get(euHost) ?? { role, usHosts: [] }
        swap.usHosts.push(`\`https://${usHost}\``)
        usHostsByEuHost.set(euHost, swap)
    })
    const swapPhrases = Array.from(usHostsByEuHost, ([euHost, { role, usHosts }]) => {
        return `use \`https://${euHost}\` instead of ${usHosts.join(' or ')} (${role})`
    })
    return `> **Cloud region:** This page uses US Cloud hosts. For an EU Cloud project, ${swapPhrases.join(', and ')}.`
}

function buildPageHeader({
    docsPath,
    sectionAnchors,
    usOnlyHostSwaps,
}: {
    docsPath: string
    sectionAnchors: ReturnType<typeof collectSectionAnchors>
    usOnlyHostSwaps: typeof US_TO_EU_HOST_SWAPS
}) {
    const headerBlocks = [`Canonical URL: ${SITE_ORIGIN}${docsPath}`]
    if (usOnlyHostSwaps.length > 0) headerBlocks.push(buildRegionNote(usOnlyHostSwaps))
    if (sectionAnchors.length >= MIN_TABLE_OF_CONTENTS_SECTIONS) {
        const tableOfContents = sectionAnchors.map((section) => `- [${section.text}](#${section.id})`)
        headerBlocks.push(['## On this page', '', ...tableOfContents].join('\n'))
    }
    return headerBlocks.join('\n\n')
}

function insertAfterTitle(markdown: string, block: string) {
    const titleEnd = markdown.indexOf('\n')
    if (titleEnd === -1) return `${markdown}\n\n${block}`
    return `${markdown.slice(0, titleEnd)}\n\n${block}\n\n${markdown.slice(titleEnd).trimStart()}`
}

export const convertHtmlToAgentMarkdown = (html: string, title: string, docsPath: string): string => {
    let sectionAnchors: ReturnType<typeof collectSectionAnchors> = []
    const preprocessedContent = preprocessHtmlForTabs(extractMainContent(html), (document) => {
        removePageFeedback(document)
        inlineRecommendedBadges(document)
        removeTabCountBadges(document)
        convertCollapsiblesToSections(document)
        flattenBlockLinks(document)
        removeClientOnlyToggles(document)
        sectionAnchors = collectSectionAnchors(document)
    })
    const bodyMarkdown = rewriteProseLines(
        postProcessMarkdown(createTurndownService(title).turndown(preprocessedContent), title),
        (line) => absolutizeRootRelativeLinks(unescapeLiteralCodeSpans(line))
    )
    const header = buildPageHeader({
        docsPath,
        sectionAnchors,
        usOnlyHostSwaps: findUsOnlyHostSwaps(bodyMarkdown),
    })
    return `${insertAfterTitle(bodyMarkdown, header)}\n`
}
