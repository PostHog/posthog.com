import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import SEO from 'components/seo'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import { Card } from 'components/UI/Card'
import { Heading, Text } from 'components/UI/Typography'
import { TreeMenu } from 'components/TreeMenu'
import { docSections, docUrl, entriesIn, filledCategories, libraryNav } from './catalog'
import { proseLinks } from './styles'

const categoryId = (category: string): string => category.toLowerCase().replace(/\s+/g, '-')

export default function Overview(): JSX.Element {
    const tableOfContents = docSections.flatMap((section) => [
        { value: section.name, url: categoryId(section.name), depth: 0 },
        ...filledCategories(section.categories).map((category) => ({
            value: category,
            url: categoryId(category),
            depth: 1,
        })),
    ])

    return (
        <>
            <SEO title="UI library - PostHog" description="Base UI components styled for PostHog.com" noindex />
            <ReaderView
                title="UI library"
                leftSidebar={<TreeMenu items={libraryNav} />}
                tableOfContents={tableOfContents}
                showQuestions={false}
                hideMobileTableOfContents
            >
                <div className="@container not-prose font-body text-body text-primary">
                    <div className="not-prose mb-3"></div>
                    <Text size="lg" color="secondary" className={`mb-4 ${proseLinks}`}>
                        Accessible components for PostHog.com, built on{' '}
                        <Link to="https://base-ui.com/react/overview/quick-start" externalNoIcon>
                            Base UI
                        </Link>{' '}
                        and styled for the site.
                    </Text>
                    <Text>
                        Each component keeps the Base UI part names and props, so the Base UI docs apply. Import one
                        component per path, for example{' '}
                        <Snippet.Inline>import {'{ Select }'} from 'components/UI/Select'</Snippet.Inline>. The
                        conventions are in <Snippet.Inline>src/components/UI/README.md</Snippet.Inline>.
                    </Text>
                    <div className="mt-10 flex flex-col gap-14">
                        {docSections.map((section) => (
                            <section key={section.name} id={categoryId(section.name)} className="flex flex-col gap-8">
                                <div>
                                    <Heading level={2} size="lg" className="mb-1">
                                        {section.name}
                                    </Heading>
                                    <Text color="secondary">{section.description}</Text>
                                </div>
                                {filledCategories(section.categories).map((category) => (
                                    <section key={category} id={categoryId(category)}>
                                        <Heading level={3} size="sm" className="mb-3">
                                            {category}
                                        </Heading>
                                        <ul className="not-prose m-0 grid list-none gap-3 p-0 @lg:grid-cols-2 @3xl:grid-cols-3">
                                            {entriesIn(category).map((entry) => (
                                                <li key={entry.slug}>
                                                    <Link
                                                        to={docUrl(entry.slug)}
                                                        className="group block h-full rounded-[8px] text-primary no-underline"
                                                        wrapperClassName="block h-full"
                                                    >
                                                        <Card.Root
                                                            padding="sm"
                                                            className="h-full gap-1 transition-colors duration-150 group-hover:border-[rgb(var(--text-primary)/0.24)] group-hover:bg-white/75 motion-reduce:transition-none dark:group-hover:bg-white/[0.09]"
                                                        >
                                                            <span className="font-heading text-heading-sm">
                                                                {entry.name}
                                                            </span>
                                                            <span className="text-body-sm text-secondary">
                                                                {entry.description}
                                                            </span>
                                                        </Card.Root>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
