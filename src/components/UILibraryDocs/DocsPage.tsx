import React from 'react'
import { IconArrowUpRight } from '@posthog/icons'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { ButtonLink } from 'components/UI/Button'
import { catalogEntry, libraryNav } from './catalog'
import Example from './Example'
import PropsTable from './PropsTable'
import type { ComponentDoc } from './types'

const repoTreeUrl = 'https://github.com/PostHog/posthog.com/tree/master/'

const NOTES_ID = 'things-to-know'

const API_ID = 'api'

const sectionHeading = 'mb-3 mt-0 text-lg'

const DEFAULT_API_NOTE = 'Props that the library adds. Every part also takes all the Base UI props.'

function importStatements({ importNames, importPath, imports = [] }: ComponentDoc): string[] {
    const primary = importPath && importNames?.length ? [{ path: importPath, names: importNames }] : []
    return [...primary, ...imports].map(({ path, names }) => `import { ${names.join(', ')} } from '${path}'`)
}

function sourceLinks({ sourcePath, sourcePaths = [] }: ComponentDoc): { label: string; path: string }[] {
    const paths = [...(sourcePath ? [sourcePath] : []), ...sourcePaths]
    return paths.map((path) => ({
        label: paths.length > 1 ? `${path.split('/').pop()} source` : 'Source',
        path,
    }))
}

export default function DocsPage({ doc }: { doc: ComponentDoc }): JSX.Element {
    const entry = catalogEntry(doc.slug)
    const statements = importStatements(doc)
    const sources = sourceLinks(doc)
    const tableOfContents = [
        ...doc.examples.map(({ id, title }) => ({ value: title, url: id, depth: 0 })),
        ...(doc.notes?.length ? [{ value: 'Things to know', url: NOTES_ID, depth: 0 }] : []),
        ...(doc.props?.length ? [{ value: 'API', url: API_ID, depth: 0 }] : []),
    ]

    return (
        <>
            <SEO title={`${entry.name} - UI library - PostHog`} description={entry.description} noindex />
            <ReaderView
                title={entry.name}
                leftSidebar={<TreeMenu items={libraryNav} />}
                tableOfContents={tableOfContents}
                showQuestions={false}
                hideMobileTableOfContents
            >
                <div className="@container text-primary">
                    <p className="mb-4 mt-0 text-lg text-secondary">{entry.description}</p>
                    <div className="not-prose flex flex-wrap items-center gap-2">
                        {statements.map((statement) => (
                            <code
                                key={statement}
                                className="max-w-full overflow-x-auto whitespace-nowrap rounded border border-primary px-2 py-1 font-code text-[13px]"
                            >
                                {statement}
                            </code>
                        ))}
                        {doc.baseUi?.map(({ label, url }) => (
                            <ButtonLink
                                key={url}
                                to={url}
                                external
                                size="sm"
                                icon={<IconArrowUpRight />}
                                iconPosition="end"
                            >
                                {label}
                            </ButtonLink>
                        ))}
                        {sources.map(({ label, path }) => (
                            <ButtonLink
                                key={path}
                                to={`${repoTreeUrl}${path}`}
                                external
                                size="sm"
                                icon={<IconArrowUpRight />}
                                iconPosition="end"
                            >
                                {label}
                            </ButtonLink>
                        ))}
                    </div>
                    <div className="mt-10 flex flex-col gap-12">
                        {doc.examples.map((example) => (
                            <Example key={example.id} {...example} />
                        ))}
                    </div>
                    {doc.notes?.length ? (
                        <section id={NOTES_ID} className="mt-12">
                            <h2 className={sectionHeading}>Things to know</h2>
                            <ul className="m-0 flex flex-col gap-2 pl-5 text-[15px]">
                                {doc.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                    {doc.props?.length ? (
                        <section id={API_ID} className="mt-12">
                            <h2 className={sectionHeading}>API</h2>
                            <p className="mb-4 mt-0 text-[15px] text-secondary">{doc.apiNote ?? DEFAULT_API_NOTE}</p>
                            <div className="flex flex-col gap-6">
                                {doc.props.map((group) => (
                                    <PropsTable key={group.component} {...group} />
                                ))}
                            </div>
                        </section>
                    ) : null}
                </div>
            </ReaderView>
        </>
    )
}
