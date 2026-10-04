import sourcePlatformsJson from '@data/products-source-platforms.json'
import type { SourcePlatforms } from '~/data-layer/queries/products'

/** Released managed sources, A to Z, as `{ label, url, image }`. */
export default function useSourcePlatforms(): SourcePlatforms {
    return sourcePlatformsJson as SourcePlatforms
}
