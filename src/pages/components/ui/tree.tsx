import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/tree'

export default function TreeDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
