/**
 * useFrameworkList - Auto-populates framework cards from MDX files
 *
 * Similar to usePlatformList but specifically for framework guides.
 * Reads from /docs/libraries/ and uses the Frameworks nav section for ordering.
 *
 * FRONTMATTER:
 * - title: Framework name (e.g., "Next.js")
 * - platformLogo: Key from `src/constants/logos.ts` (e.g., "nextjs", "react")
 * - platformIconName: Icon like "IconCode" (fallback if no logo)
 *
 * USAGE:
 * const frameworks = useFrameworkList()
 */

import frameworkListJson from '@data/content-framework-list.json'
import type { DocsCards } from '~/data-layer/queries/content'

/** Framework cards in the order of the docs nav's Frameworks section. */
export default function useFrameworkList(): DocsCards {
    return frameworkListJson as DocsCards
}
