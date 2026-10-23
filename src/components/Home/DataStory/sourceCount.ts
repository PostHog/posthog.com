import useSourcePlatforms from 'hooks/useSourcePlatforms'

const SOURCE_COUNT_ROUNDING = 100

export const SOURCES_DOCS_URL = '/docs/cdp/sources'

export const useSourceCountLabel = (): string =>
    `${Math.round(useSourcePlatforms().length / SOURCE_COUNT_ROUNDING) * SOURCE_COUNT_ROUNDING}+`
