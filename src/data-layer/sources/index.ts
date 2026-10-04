// Every data source, in the order they start. A source with `after` waits for those sources.
import type { Source } from '../index'
import { apiEndpointSource } from './apiEndpoints'
import { ashbySource } from './ashby'
import { cloudinaryImageSource } from './cloudinary'
import { g2ReviewSource } from './g2'
import { githubSources } from './github'
import { localSources } from './local'
import { mapboxSource } from './mapbox'
import { posthogApiSources } from './posthogApi'
import { posthogSources } from './posthogSources'
import { shopifySource } from './shopify'
import { slackEmojiSource } from './slack'
import { squeakSource } from './squeak'
import { strapiSources } from './strapi'
import { changelogVideoSource } from './youtube'

export const sources: Source[] = [
    posthogSources,
    squeakSource,
    mapboxSource,
    ...strapiSources,
    ...posthogApiSources,
    apiEndpointSource,
    ashbySource,
    shopifySource,
    slackEmojiSource,
    g2ReviewSource,
    cloudinaryImageSource,
    changelogVideoSource,
    ...githubSources,
    ...localSources,
]
