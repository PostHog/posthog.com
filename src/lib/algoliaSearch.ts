import algoliasearch from 'algoliasearch/lite'

export const algoliaSearchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID as string,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY as string
)

export const algoliaIndexName = process.env.GATSBY_ALGOLIA_INDEX_NAME as string
