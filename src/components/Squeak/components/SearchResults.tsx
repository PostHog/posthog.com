import algoliasearch from 'algoliasearch'
import Link from 'components/Link'
import React, { useEffect } from 'react'
import { InstantSearch, useHits, useSearchBox } from 'react-instantsearch'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID as string,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY as string
)

const Skeleton = () => {
    return (
        <li className="p-1 space-y-1 dark:opacity-20">
            <div className="h-[18px] animate-pulse bg-accent rounded-md w-2/3" />
            <div className="h-[14px] animate-pulse bg-accent rounded-md" />
            <div className="h-[14px] animate-pulse bg-accent rounded-md" />
        </li>
    )
}

const Results = ({ query = '', className = '' }) => {
    const { hits } = useHits()
    const { refine } = useSearchBox()

    useEffect(() => {
        refine(query)
    }, [query])

    return (
        <ul
            className={`list-none m-0 p-0 divide-y divide-border dark:divide-border-dark max-h-40 overflow-auto bg-white dark:bg-accent-dark ${className}`}
        >
            {hits.length > 0
                ? hits.map((hit) => (
                      <li className="p-1" key={hit.objectID}>
                          <Link
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 inline-block hover:bg-accent dark:hover:bg-dark rounded-sm text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit"
                              to={`/${hit.slug}`}
                          >
                              <h5 className="text-sm m-0 line-clamp-1">{hit.title}</h5>
                              <p className="m-0 text-xs line-clamp-2">{hit.excerpt}</p>
                          </Link>
                      </li>
                  ))
                : new Array(3).fill(0).map((_, index) => <Skeleton key={index} />)}
        </ul>
    )
}

export default function SearchResults({ query = '', className = '' }) {
    return (
        <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}>
            <Results query={query} className={className} />
        </InstantSearch>
    )
}
