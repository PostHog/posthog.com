import { renderDocsPage } from 'components/UILibraryDocs/DocsPage'
import { renderOverview } from 'components/UILibraryDocs/Overview'
import { docs } from 'components/UILibraryDocs/docs'
import { libraryRootUrl } from 'components/UILibraryDocs/catalog'

export default function UILibraryDocs({ location }: { location: { pathname: string } }): JSX.Element {
    const slug = location.pathname.slice(libraryRootUrl.length).replace(/^\/|\/$/g, '')
    const doc = docs[slug]
    return doc ? renderDocsPage(doc) : renderOverview()
}
