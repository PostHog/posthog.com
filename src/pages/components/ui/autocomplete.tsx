import React from 'react'
import DocsPage from 'components/UILibraryDocs/DocsPage'
import { doc } from 'components/UILibraryDocs/docs/autocomplete'

export default function AutocompleteDocsPage(): JSX.Element {
    return <DocsPage doc={doc} />
}
