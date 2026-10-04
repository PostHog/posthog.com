import algoliasearch from 'algoliasearch/lite'

export const algoliaSearchClient = algoliasearch(
    import.meta.env.PUBLIC_ALGOLIA_APP_ID as string,
    import.meta.env.PUBLIC_ALGOLIA_SEARCH_API_KEY as string
)

export const algoliaIndexName = import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME as string
