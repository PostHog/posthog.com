import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/context-menu'

export default function ContextMenuDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
