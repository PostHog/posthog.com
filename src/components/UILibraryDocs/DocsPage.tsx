import React from 'react'
import { IconArrowUpRight } from '@posthog/icons'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { ButtonLink } from 'components/UI/Button'
import { Snippet } from 'components/UI/Snippet'
import { catalogEntry, libraryNav } from './catalog'
import { ruleOfThumb } from './ChoiceGuide'
import Example from './Example'
import PropsTable from './PropsTable'
import type { ComponentDoc } from './types'

const repoTreeUrl = 'https://github.com/PostHog/posthog.com/tree/master/'

const NOTES_ID = 'usage'

const API_ID = 'api'

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

export function renderDocsPage(doc: ComponentDoc): JSX.Element {
    const entry = catalogEntry(doc.slug)
    const statements = importStatements(doc)
    const sources = sourceLinks(doc)
    const tableOfContents = [
        ...doc.examples.map(({ id, title }) => ({ value: title, url: id, depth: 0 })),
        ...(doc.notes?.length ? [{ value: 'Usage', url: NOTES_ID, depth: 0 }] : []),
        ...(doc.props?.length ? [{ value: 'API', url: API_ID, depth: 0 }] : []),
    ]

    return (
        <>
            <SEO title={`${entry.name} - UI library - PostHog`} description={entry.description} noindex />
            <ReaderView
                title={entry.name}
                leftSidebar={<TreeMenu items={libraryNav} expandOnly />}
                tableOfContents={tableOfContents}
                showQuestions={false}
                hideMobileTableOfContents
            >
                <div className="@container">
                    <p className="lead">{entry.description}</p>
                    <div className="not-prose flex flex-wrap items-center gap-2">
                        {statements.map((statement) => (
                            <Snippet key={statement} text={statement} prompt={false} className="max-w-full" />
                        ))}
                        {doc.baseUi?.map(({ label, url }) => (
                            <ButtonLink
                                appearance="flat"
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
                                appearance="flat"
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
                    {doc.examples.map((example) => (
                        <Example key={example.id} {...example} />
                    ))}
                    {doc.notes?.length ? (
                        <section id={NOTES_ID}>
                            <h2>Usage</h2>
                            <p>{ruleOfThumb}</p>
                            <ul>
                                {doc.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                    {doc.props?.length ? (
                        <section id={API_ID}>
                            <h2>API</h2>
                            <p>{doc.apiNote ?? DEFAULT_API_NOTE}</p>
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
