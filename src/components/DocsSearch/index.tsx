import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import './style.scss'
import 'docsearch.js/dist/cdn/docsearch.min.css/'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useValues } from 'kea'

interface DocsSearchProps {
    className: string
    backgroundColor: string
    theme: string
}

export const DocsSearch = ({ className = '', backgroundColor = '#ffffff', theme = 'light' }: DocsSearchProps) => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window) {
            import('docsearch.js').then(({ default: docsearch }) => {
                docsearch({
                    apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                    indexName: 'posthog',
                    inputSelector: '#doc-search',
                })
            })

            const doc = window.document
            const docSearchBarElement = doc.getElementById('doc-search-wrapper')
            const docSearchInputElement = doc.getElementById('doc-search') as HTMLInputElement

            docSearchInputElement.placeholder += window.navigator.platform.includes('Mac') ? ' (⌘K)' : ' (Ctrl + K)'

            // Add light yellow 'glow' if user has not tried the search bar before
            if (!window.localStorage['hasUsedSearchBar'])
                docSearchBarElement.style['box-shadow'] = 'rgb(236 191 11 / 50%) 0px 2px 10px'

            const handleSearchBarUsed = (openMethod) => {
                let isFirstUse = false
                if (!window.localStorage['hasUsedSearchBar']) {
                    window.localStorage['hasUsedSearchBar'] = 'true'
                    docSearchBarElement.style['box-shadow'] = ''
                    isFirstUse = true
                }

                // Track search bar usage
                posthog?.capture('docs_search_used', { is_first_use: isFirstUse, open_method: openMethod })
                if (isFirstUse) posthog?.people.set({ used_docs_search: true })
            }

            docSearchBarElement.addEventListener('click', () => handleSearchBarUsed('click'))

            doc.addEventListener('keydown', (e) => {
                // ⌘K opens bar on Mac and Ctrl + K opens it on everything else
                if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                    docSearchInputElement.focus()
                    handleSearchBarUsed('shortcut')
                }
            })
        }
    }, [])

    return (
        <div
            className={className + ` ${theme}`}
            id="docs-search-container"
            style={{ backgroundColor: backgroundColor }}
        >
            <div className="flex-row-reverse docs-search-box">
                <form className="docSearchWrapper" id="doc-search-wrapper">
                    <input placeholder="Search our Docs" id="doc-search" />
                    <SearchOutlined className="docSearchIcon" type="submit" />
                </form>
            </div>
        </div>
    )
}
