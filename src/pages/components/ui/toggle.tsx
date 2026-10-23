import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/toggle'

export default function ToggleDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
