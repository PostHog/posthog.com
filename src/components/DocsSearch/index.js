import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import './style.css'
import 'docsearch.js/dist/cdn/docsearch.min.css/'

export const DocsSearch = ({className = '', backgroundColor = '#ffffff'}) => {
    useEffect(() => {
        if (window) {
            import('docsearch.js').then(({ default: docsearch }) => {
                docsearch({
                    apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                    indexName: 'posthog',
                    inputSelector: '#doc-search',
                })
            })
        }
    })

    return (
        <div className={className} id='docs-search-container' style={{backgroundColor: backgroundColor}}>
            <div className="flex-row-reverse docs-search-box">
                <form className="docSearchWrapper">
                    <input placeholder="Search our Docs" id="doc-search" />
                    <SearchOutlined className="docSearchIcon" type="submit" />
                </form>
            </div>
        </div>
    )
}
