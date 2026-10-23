import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/select'

export default function SelectDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
