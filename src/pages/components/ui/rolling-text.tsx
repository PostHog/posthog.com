import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/rolling-text'

export default function RollingTextDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
