import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/code-block'

export default function CodeBlockDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
