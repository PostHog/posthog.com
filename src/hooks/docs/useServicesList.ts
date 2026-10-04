/**
 * useServicesList - Auto-populates service integration cards from MDX files
 *
 * Similar to useFrameworkList but for service integrations (no-code builders,
 * e-commerce platforms, automation tools, data pipelines, etc.).
 * Reads from /docs/libraries/ and uses the Services nav section for ordering.
 *
 * FRONTMATTER:
 * - title: Service name (e.g., "Zapier")
 * - icon: URL to logo (e.g., "https://res.cloudinary.com/.../zapier.svg")
 *
 * USAGE:
 * const services = useServicesList()
 */

import servicesListJson from '@data/content-services-list.json'
import type { DocsCards } from '~/data-layer/queries/content'

/** Service cards in the order of the docs nav's Services section. */
export default function useServicesList(): DocsCards {
    return servicesListJson as DocsCards
}
