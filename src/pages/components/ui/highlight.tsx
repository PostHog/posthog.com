import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/highlight'

export default function HighlightDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
