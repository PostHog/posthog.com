import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/empty-state'

export default function EmptyStateDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
