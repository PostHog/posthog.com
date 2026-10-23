import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/preview-card'

export default function PreviewCardDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
