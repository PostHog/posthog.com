import React, { useEffect, useRef } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import TeamMemberComponent, { FutureTeamMember } from 'components/TeamMember'
import SmallTeam from 'components/SmallTeam'

const TypedMDXProvider = MDXProvider as React.ComponentType<{
    components: Record<string, React.ComponentType<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
    children: React.ReactNode
}>

export function getCurrentQuarter(): { quarter: number; year: number } {
    const now = new Date()
    const quarter = Math.floor(now.getMonth() / 3) + 1
    return { quarter, year: now.getFullYear() }
}

/**
 * Renders a team's objectives.mdx body scoped to the current quarter. The MDX files are
 * freeform prose with quarter-labeled headings (e.g. "Q3 2026 Objectives", "Q2 2026 Recap"),
 * so after render this hides everything outside the section under the heading matching
 * `Q{quarter} {year}` and collapses any "recap" section into a native <details>.
 */
export function QuarterObjectives({
    body,
    quarter,
    year,
}: {
    body: string
    quarter: number
    year: number
}): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const container = ref.current
        const headings = container.querySelectorAll('h1, h2, h3')
        const qRegex = new RegExp(`Q${quarter}\\s+${year}`, 'i')
        const recapRegex = /recap/i

        let currentQHeading: Element | null = null
        let currentQLevel = 0

        for (const h of Array.from(headings)) {
            const text = h.textContent || ''
            if (qRegex.test(text) && !recapRegex.test(text)) {
                currentQHeading = h
                currentQLevel = parseInt(h.tagName[1])
                break
            }
        }

        if (!currentQHeading) return

        // Hide the quarter heading itself (the surrounding UI already shows the quarter)
        const qHeadEl = currentQHeading as HTMLElement
        qHeadEl.style.display = 'none'

        // Hide everything before the current quarter heading
        let el = container.firstElementChild
        while (el && el !== currentQHeading) {
            const next = el.nextElementSibling
            const elHtml = el as HTMLElement
            elHtml.style.display = 'none'
            el = next
        }

        // Process elements after the current quarter section
        let sibling = currentQHeading.nextElementSibling
        let pastCurrentSection = false

        while (sibling) {
            const next = sibling.nextElementSibling

            if (sibling.matches('h1, h2, h3') && parseInt(sibling.tagName[1]) <= currentQLevel) {
                pastCurrentSection = true
                const text = sibling.textContent || ''

                if (recapRegex.test(text)) {
                    // Wrap recap section in a collapsible <details>
                    const details = document.createElement('details')
                    details.className = 'my-3 border border-primary rounded'
                    const summary = document.createElement('summary')
                    summary.className =
                        'cursor-pointer px-3 py-2 text-sm font-semibold text-secondary hover:text-primary list-none flex items-center gap-1.5'
                    summary.textContent = text
                    details.appendChild(summary)

                    const wrapper = document.createElement('div')
                    wrapper.className = 'px-3 pb-3'

                    const sibHtml = sibling as HTMLElement
                    sibHtml.style.display = 'none'

                    let recapEl = next
                    while (recapEl) {
                        if (recapEl.matches('h1, h2, h3') && parseInt(recapEl.tagName[1]) <= currentQLevel) {
                            break
                        }
                        const recapNext = recapEl.nextElementSibling
                        wrapper.appendChild(recapEl)
                        recapEl = recapNext
                    }

                    details.appendChild(wrapper)
                    sibling.parentNode?.insertBefore(details, sibling.nextSibling)
                    sibling = recapEl
                    continue
                }
            }

            if (pastCurrentSection) {
                const pastSibHtml = sibling as HTMLElement
                pastSibHtml.style.display = 'none'
            }

            sibling = next
        }
    }, [body, quarter, year])

    return (
        <div ref={ref} className="prose prose-sm max-w-none dark:prose-invert">
            <TypedMDXProvider
                components={{
                    TeamMember: TeamMemberComponent,
                    FutureTeamMember,
                    SmallTeam,
                }}
            >
                <MDXRenderer>{body}</MDXRenderer>
            </TypedMDXProvider>
        </div>
    )
}
