import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/search-input'

export default function SearchInputDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
