import React, { useState } from 'react'
import { HedgehogCodingGroup } from '@posthog/brand/hoggies'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { AVATAR_FALLBACK_URL } from 'constants/index'
import { useApp } from '../context/App'

type Author = {
    handle: string
    name: string
    profile_id: number | null
    profile: { avatar: { url: string } | null } | null
}
type Article = {
    excerpt: string
    fields: { slug: string }
    frontmatter: { title: string; date: string; authors: Author[] | null }
}
type Section = { totalCount: number; nodes: Article[] }
type Member = { squeakId: number; firstName: string | null; lastName: string | null }
type Forum = {
    id: string
    name: string
    description: string
    url: string
    section: Section
}

const TOPICS_PER_PAGE = 20

const SIGNATURE = 'I ♥ funnels. Please do not ask me about my bounce rate.'

const Folder = ({ isNew = false, isLocked = false }: { isNew?: boolean; isLocked?: boolean }) => (
    <span
        aria-hidden="true"
        className={`relative mx-auto mt-1 block h-[18px] w-[22px] rounded-[2px] border border-[#7a6a2c] ${
            isNew ? 'bg-[#ffa34f]' : 'bg-[#f2dc8c]'
        } before:absolute before:-top-[4px] before:left-[2px] before:h-[4px] before:w-[8px] before:rounded-t-[2px] before:border before:border-b-0 before:border-[#7a6a2c] before:bg-inherit`}
    >
        {isLocked && (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold leading-none text-[#7a1f1f]">
                ×
            </span>
        )}
    </span>
)

const RowCell = ({
    children,
    className = '',
    row = 1,
    valign = 'middle',
}: {
    children: React.ReactNode
    className?: string
    row?: 1 | 2 | 3
    valign?: 'top' | 'middle'
}) => (
    <td
        className={`border-b border-r border-white px-1.5 py-1 ${valign === 'top' ? '!align-top' : '!align-middle'} ${
            row === 1 ? 'bg-[#efefef]' : row === 2 ? 'bg-[#dee3e7]' : 'bg-[#d1d7dc]'
        } ${className}`}
    >
        {children}
    </td>
)

const HeadCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <th
        className={`whitespace-nowrap border-b border-[#004c75] bg-gradient-to-b from-[#3d8bb8] to-[#006699] px-2 py-1 text-[11px] font-bold text-[#ffa34f] ${className}`}
    >
        {children}
    </th>
)

const ForumLine = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <table aria-label={label} className="w-full border-separate border-spacing-0 border border-[#006699] bg-white">
        {children}
    </table>
)

const Button = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
        to={to}
        className="inline-block border border-[#000] bg-[#fafafa] px-2 py-0.5 text-[11px] font-bold !text-[#000] !no-underline hover:bg-white"
    >
        {children}
    </Link>
)

const authorName = (article: Article) => article.frontmatter.authors?.[0]?.name || 'Anonymous'

const AuthorLink = ({ author }: { author?: Author }) =>
    author?.profile_id ? (
        <Link to={`/community/profiles/${author.profile_id}`} className="font-bold">
            {author.name}
        </Link>
    ) : (
        <span className="font-bold">{author?.name || 'Anonymous'}</span>
    )

export default function HogBB(): JSX.Element {
    const { openSearch } = useApp()
    const {
        blog,
        newsletter,
        tutorials,
        team,
    }: {
        blog: Section
        newsletter: Section
        tutorials: Section
        team: { nodes: Member[] }
    } = useStaticQuery(graphql`
        query HogBBQuery {
            blog: allMdx(
                filter: {
                    isFuture: { eq: false }
                    fields: { slug: { regex: "/^/blog/" } }
                    frontmatter: { date: { ne: null } }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 20
            ) {
                ...HogBBSection
            }
            newsletter: allMdx(
                filter: {
                    isFuture: { eq: false }
                    fields: { slug: { regex: "/^/newsletter/" } }
                    frontmatter: { date: { ne: null } }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 20
            ) {
                ...HogBBSection
            }
            tutorials: allMdx(
                filter: {
                    isFuture: { eq: false }
                    fields: { slug: { regex: "/^/tutorials/" } }
                    frontmatter: { date: { ne: null } }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 20
            ) {
                ...HogBBSection
            }
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } }, squeakId: { ne: 28378 } }
                sort: { fields: [firstName], order: ASC }
            ) {
                nodes {
                    squeakId
                    firstName
                    lastName
                }
            }
        }

        fragment HogBBSection on MdxConnection {
            totalCount
            nodes {
                excerpt(pruneLength: 400)
                fields {
                    slug
                }
                frontmatter {
                    title
                    date(formatString: "ddd MMM DD, YYYY")
                    authors: authorData {
                        handle
                        name
                        profile_id
                        profile {
                            avatar {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)

    const forums: Forum[] = [
        {
            id: 'announcements',
            name: 'Announcements',
            description: 'News from HQ. Read before you post. Every two weeks, in your inbox.',
            url: '/newsletter',
            section: newsletter,
        },
        {
            id: 'blog',
            name: 'The blog',
            description: 'Long posts about product engineering, startups, and how we work.',
            url: '/blog',
            section: blog,
        },
        {
            id: 'tutorials',
            name: 'Tutorials',
            description: 'Step-by-step guides. n00bs welcome. Please search before you ask.',
            url: '/tutorials',
            section: tutorials,
        },
    ]

    const [forumId, setForumId] = useState<string | null>(null)
    const [topicSlug, setTopicSlug] = useState<string | null>(null)
    const forum = forums.find((item) => item.id === forumId)
    const topic = forum?.section.nodes.find((article) => article.fields.slug === topicSlug)

    const showIndex = () => {
        setForumId(null)
        setTopicSlug(null)
    }
    const showForum = (id: string) => {
        setForumId(id)
        setTopicSlug(null)
    }

    const members = team.nodes.filter((member) => member.firstName || member.lastName)
    const newestMember = members.reduce<Member | undefined>(
        (newest, member) => (!newest || member.squeakId > newest.squeakId ? member : newest),
        undefined
    )
    const memberName = (member: Member) => [member.firstName, member.lastName].filter(Boolean).join(' ')
    const totalArticles = forums.reduce((total, item) => total + item.section.totalCount, 0)

    const breadcrumb = (
        <nav aria-label="Breadcrumb" className="mb-1 text-[11px] font-bold">
            <button onClick={showIndex} className="font-bold text-[#006699] hover:text-[#dd6900] hover:underline">
                hogBB Forum Index
            </button>
            {forum && (
                <>
                    {' -> '}
                    <button
                        onClick={() => showForum(forum.id)}
                        className="font-bold text-[#006699] hover:text-[#dd6900] hover:underline"
                    >
                        {forum.name}
                    </button>
                </>
            )}
        </nav>
    )

    return (
        <>
            <SEO
                title="hogBB - PostHog"
                description="An old-school forum board in the PostHog Time machine."
                image="/images/og/default.png"
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideAppOptions
                hideMarkdownActions
                showQuestions={false}
                padding={false}
                className="bg-[#e5e5e5] [&_.reader-view-content-container>div]:!pt-0"
            >
                <div className="not-prose @container min-h-screen bg-[#e5e5e5] px-2 py-3 font-[Verdana,Arial,Helvetica,sans-serif] text-[12px] text-[#000] [color-scheme:light] @lg:px-4 [&_a:hover]:text-[#dd6900] [&_a:hover]:underline [&_a]:text-[#006699] [&_a]:no-underline">
                    <div className="mx-auto max-w-[60rem] border border-[#98aab1] bg-white p-2 @lg:p-3">
                        <header className="mb-3 flex flex-col items-center gap-3 @xl:flex-row @xl:items-start">
                            <button onClick={showIndex} aria-label="hogBB Forum Index" className="shrink-0">
                                <HedgehogCodingGroup className="h-20 w-auto" />
                            </button>
                            <div className="flex-1 text-center">
                                <h1 className="m-0 font-['Trebuchet_MS',Verdana,sans-serif] text-[22px] font-bold leading-tight">
                                    <button onClick={showIndex} className="text-[#000] hover:text-[#dd6900]">
                                        hogBB
                                    </button>
                                </h1>
                                <p className="m-0 mb-2 text-[11px]">
                                    The official PostHog discussion board. Est. 2002, probably.
                                </p>
                                <nav
                                    aria-label="hogBB navigation"
                                    className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-bold"
                                >
                                    <Link to="/docs">FAQ</Link>
                                    <button
                                        onClick={() => openSearch()}
                                        className="font-bold text-[#006699] hover:text-[#dd6900] hover:underline"
                                    >
                                        Search
                                    </button>
                                    <Link to="/people">Memberlist</Link>
                                    <Link to="/teams">Usergroups</Link>
                                    <Link to="https://app.posthog.com/signup">Register</Link>
                                    <Link to="/community/dashboard">Profile</Link>
                                    <Link to="https://app.posthog.com/login">Log in</Link>
                                </nav>
                            </div>
                        </header>

                        {!forum && (
                            <>
                                <div className="mb-1 flex flex-wrap items-end justify-between gap-2 text-[11px]">
                                    {breadcrumb}
                                    <Link to="/sparks-joy" className="mb-1">
                                        Back to Time machine
                                    </Link>
                                </div>
                                <ForumLine label="Forums">
                                    <thead>
                                        <tr>
                                            <HeadCell className="hidden w-8 @xl:table-cell">&nbsp;</HeadCell>
                                            <HeadCell>Forum</HeadCell>
                                            <HeadCell className="hidden w-16 @xl:table-cell">Topics</HeadCell>
                                            <HeadCell className="hidden w-48 @2xl:table-cell">Last Post</HeadCell>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="border-b border-white bg-gradient-to-b from-[#eef1f3] to-[#d1d7dc] px-2 py-1 text-[12px] font-bold"
                                            >
                                                PostHog HQ
                                            </td>
                                        </tr>
                                        {forums.map((item) => {
                                            const latest = item.section.nodes[0]
                                            return (
                                                <tr key={item.id}>
                                                    <RowCell className="hidden w-8 text-center @xl:table-cell">
                                                        <Folder isNew />
                                                    </RowCell>
                                                    <RowCell>
                                                        <button
                                                            onClick={() => showForum(item.id)}
                                                            className="text-left text-[12px] font-bold text-[#006699] hover:text-[#dd6900] hover:underline"
                                                        >
                                                            {item.name}
                                                        </button>
                                                        <p className="m-0 text-[11px]">{item.description}</p>
                                                        <p className="m-0 text-[10px] @xl:hidden">
                                                            Topics: {item.section.totalCount}
                                                        </p>
                                                    </RowCell>
                                                    <RowCell
                                                        row={2}
                                                        className="hidden text-center text-[10px] @xl:table-cell"
                                                    >
                                                        {item.section.totalCount}
                                                    </RowCell>
                                                    <RowCell
                                                        row={2}
                                                        className="hidden text-center text-[10px] leading-snug @2xl:table-cell"
                                                    >
                                                        {latest ? (
                                                            <>
                                                                {latest.frontmatter.date}
                                                                <br />
                                                                <AuthorLink
                                                                    author={latest.frontmatter.authors?.[0]}
                                                                />{' '}
                                                                <button
                                                                    onClick={() => {
                                                                        setForumId(item.id)
                                                                        setTopicSlug(latest.fields.slug)
                                                                    }}
                                                                    aria-label={`Last post: ${latest.frontmatter.title}`}
                                                                    className="text-[#006699] hover:text-[#dd6900]"
                                                                >
                                                                    -&gt;
                                                                </button>
                                                            </>
                                                        ) : (
                                                            'No Posts'
                                                        )}
                                                    </RowCell>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="border-b border-white bg-gradient-to-b from-[#eef1f3] to-[#d1d7dc] px-2 py-1 text-[12px] font-bold"
                                            >
                                                Off-topic
                                            </td>
                                        </tr>
                                        <tr>
                                            <RowCell className="hidden w-8 text-center @xl:table-cell">
                                                <Folder isLocked />
                                            </RowCell>
                                            <RowCell>
                                                <Link
                                                    to="https://github.com/PostHog/posthog/issues"
                                                    className="text-[12px] font-bold"
                                                >
                                                    Bug reports
                                                </Link>
                                                <p className="m-0 text-[11px]">
                                                    This forum is locked. Bugs moved to GitHub in 2020 and never came
                                                    back.
                                                </p>
                                            </RowCell>
                                            <RowCell row={2} className="hidden @xl:table-cell">
                                                &nbsp;
                                            </RowCell>
                                            <RowCell row={2} className="hidden @2xl:table-cell">
                                                &nbsp;
                                            </RowCell>
                                        </tr>
                                        <tr>
                                            <RowCell className="hidden w-8 text-center @xl:table-cell">
                                                <Folder />
                                            </RowCell>
                                            <RowCell>
                                                <Link to="/questions" className="text-[12px] font-bold">
                                                    Questions and help
                                                </Link>
                                                <p className="m-0 text-[11px]">
                                                    The real forum. It has a different skin, but the people are just as
                                                    nice.
                                                </p>
                                            </RowCell>
                                            <RowCell row={2} className="hidden @xl:table-cell">
                                                &nbsp;
                                            </RowCell>
                                            <RowCell row={2} className="hidden @2xl:table-cell">
                                                &nbsp;
                                            </RowCell>
                                        </tr>
                                    </tbody>
                                </ForumLine>

                                <p className="my-1 text-right text-[10px]">All times are GMT</p>

                                <div className="mt-3">
                                    <ForumLine label="Who is Online">
                                        <thead>
                                            <tr>
                                                <td
                                                    colSpan={2}
                                                    className="bg-gradient-to-b from-[#eef1f3] to-[#d1d7dc] px-2 py-1 text-[12px] font-bold"
                                                >
                                                    Who is Online
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <RowCell row={2} className="hidden w-12 text-center @xl:table-cell">
                                                    <HedgehogCodingGroup className="mx-auto h-8 w-auto" />
                                                </RowCell>
                                                <RowCell className="text-[11px] leading-relaxed">
                                                    Our users have posted a total of <b>{totalArticles}</b> articles
                                                    <br />
                                                    We have <b>{members.length}</b> registered users
                                                    {newestMember && (
                                                        <>
                                                            <br />
                                                            The newest registered user is{' '}
                                                            <Link
                                                                to={`/community/profiles/${newestMember.squeakId}`}
                                                                className="font-bold"
                                                            >
                                                                {memberName(newestMember)}
                                                            </Link>
                                                        </>
                                                    )}
                                                </RowCell>
                                            </tr>
                                            <tr>
                                                <RowCell row={2} className="hidden w-12 @xl:table-cell">
                                                    &nbsp;
                                                </RowCell>
                                                <RowCell className="text-[11px] leading-relaxed">
                                                    Registered Users:{' '}
                                                    {members.map((member, index) => (
                                                        <React.Fragment key={member.squeakId}>
                                                            {index > 0 && ', '}
                                                            <Link to={`/community/profiles/${member.squeakId}`}>
                                                                {memberName(member)}
                                                            </Link>
                                                        </React.Fragment>
                                                    ))}
                                                </RowCell>
                                            </tr>
                                        </tbody>
                                    </ForumLine>
                                </div>

                                <ul className="m-0 mt-3 flex list-none flex-wrap justify-center gap-x-6 gap-y-2 p-0 text-[10px]">
                                    <li className="flex items-center gap-1.5">
                                        <Folder isNew /> New posts
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <Folder /> No new posts
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <Folder isLocked /> Forum is locked
                                    </li>
                                </ul>
                            </>
                        )}

                        {forum && !topic && (
                            <>
                                <h2 className="m-0 mb-1 text-[18px] font-bold">
                                    <Link to={forum.url}>{forum.name}</Link>
                                </h2>
                                <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
                                    {breadcrumb}
                                    <Button to="/questions">new topic</Button>
                                </div>
                                <ForumLine label={`${forum.name} topics`}>
                                    <thead>
                                        <tr>
                                            <HeadCell className="hidden w-8 @xl:table-cell">&nbsp;</HeadCell>
                                            <HeadCell className="text-left">
                                                <span className="pl-1">Topics</span>
                                            </HeadCell>
                                            <HeadCell className="hidden w-32 @xl:table-cell">Author</HeadCell>
                                            <HeadCell className="hidden w-40 @2xl:table-cell">Posted</HeadCell>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forum.section.nodes.map((article, index) => (
                                            <tr key={article.fields.slug}>
                                                <RowCell className="hidden w-8 text-center @xl:table-cell">
                                                    <Folder isNew={index === 0} />
                                                </RowCell>
                                                <RowCell>
                                                    {index === 0 && <b className="text-[11px]">Sticky: </b>}
                                                    <button
                                                        onClick={() => setTopicSlug(article.fields.slug)}
                                                        className="text-left text-[11px] font-bold text-[#006699] hover:text-[#dd6900] hover:underline"
                                                    >
                                                        {article.frontmatter.title}
                                                    </button>
                                                    <span className="block text-[10px] @xl:hidden">
                                                        {authorName(article)} · {article.frontmatter.date}
                                                    </span>
                                                </RowCell>
                                                <RowCell
                                                    row={2}
                                                    className="hidden text-center text-[11px] @xl:table-cell"
                                                >
                                                    <AuthorLink author={article.frontmatter.authors?.[0]} />
                                                </RowCell>
                                                <RowCell
                                                    row={3}
                                                    className="hidden text-center text-[10px] @2xl:table-cell"
                                                >
                                                    {article.frontmatter.date}
                                                </RowCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </ForumLine>
                                <div className="mt-1 flex flex-wrap justify-between gap-2 text-[11px] font-bold">
                                    <span>
                                        Page 1 of {Math.max(1, Math.ceil(forum.section.totalCount / TOPICS_PER_PAGE))}
                                    </span>
                                    {forum.section.totalCount > TOPICS_PER_PAGE && <Link to={forum.url}>Next</Link>}
                                </div>
                            </>
                        )}

                        {forum && topic && (
                            <>
                                <h2 className="m-0 mb-1 text-[18px] font-bold">
                                    <Link to={topic.fields.slug}>{topic.frontmatter.title}</Link>
                                </h2>
                                <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
                                    {breadcrumb}
                                    <span className="flex gap-1">
                                        <Button to="/questions">new topic</Button>
                                        <Button to="/questions">post reply</Button>
                                    </span>
                                </div>
                                <ForumLine label={topic.frontmatter.title}>
                                    <thead>
                                        <tr>
                                            <HeadCell className="hidden w-40 @xl:table-cell">Author</HeadCell>
                                            <HeadCell>Message</HeadCell>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <RowCell valign="top" className="block @xl:table-cell @xl:w-40">
                                                {topic.frontmatter.authors?.length ? (
                                                    <div className="flex flex-wrap gap-4 @xl:flex-col">
                                                        {topic.frontmatter.authors.map((author) => (
                                                            <div key={author.handle} className="text-[10px]">
                                                                <AuthorLink author={author} />
                                                                <span className="block">Hog admin</span>
                                                                <img
                                                                    src={
                                                                        author.profile?.avatar?.url ||
                                                                        AVATAR_FALLBACK_URL
                                                                    }
                                                                    alt=""
                                                                    className="my-1 size-16 border border-[#98aab1] object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-[11px] font-bold">Anonymous</span>
                                                )}
                                            </RowCell>
                                            <RowCell valign="top" className="block @xl:table-cell">
                                                <p className="m-0 border-b border-[#98aab1] pb-1 text-[10px]">
                                                    Posted: {topic.frontmatter.date}
                                                    &nbsp;&nbsp;&nbsp;Post subject: {topic.frontmatter.title}
                                                </p>
                                                <p className="m-0 py-3 text-[12px] leading-[18px]">{topic.excerpt}</p>
                                                <p className="m-0 text-[12px] font-bold">
                                                    <Link to={topic.fields.slug}>Read the full post</Link>
                                                </p>
                                                <p className="m-0 mt-3 text-[11px]">
                                                    _________________
                                                    <br />
                                                    {SIGNATURE}
                                                </p>
                                            </RowCell>
                                        </tr>
                                        <tr>
                                            <RowCell row={2} className="hidden text-[10px] @xl:table-cell">
                                                &nbsp;
                                            </RowCell>
                                            <RowCell row={2} className="block @xl:table-cell">
                                                <span className="flex flex-wrap gap-1">
                                                    {topic.frontmatter.authors?.[0]?.profile_id && (
                                                        <Button
                                                            to={`/community/profiles/${topic.frontmatter.authors[0].profile_id}`}
                                                        >
                                                            profile
                                                        </Button>
                                                    )}
                                                    <Button to={topic.fields.slug}>www</Button>
                                                </span>
                                            </RowCell>
                                        </tr>
                                    </tbody>
                                </ForumLine>
                            </>
                        )}

                        <footer className="mt-4 text-center text-[10px]">
                            Powered by hogBB © 2001, 2002 hogBB Group
                            <br />
                            No hedgehogs were harmed in the making of this board.
                        </footer>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
