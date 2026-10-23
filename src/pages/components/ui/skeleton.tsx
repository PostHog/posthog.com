import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/skeleton'

export default function SkeletonDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
