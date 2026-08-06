import { MDXProvider } from '@mdx-js/react'
import { IconExternal, IconGithub, IconPencil } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'
import {
    Creator,
    SideProjectGraphic,
    findCreatorProfile,
    getEditProjectUrl,
    useCreatorProfiles,
    type SideProjectFrontmatter,
} from 'components/SideProjects'
import { TreeMenu } from 'components/TreeMenu'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useUser } from 'hooks/useUser'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'

type SideProjectData = {
    pageData: {
        body: string
        excerpt: string
        fields: { slug: string }
        parent?: { relativePath?: string }
        frontmatter: SideProjectFrontmatter & {
            featuredImage?: { publicURL?: string; childImageSharp?: { gatsbyImageData?: unknown } }
        }
    }
    sideProjects: {
        nodes: { fields: { slug: string }; frontmatter: { title: string } }[]
    }
}

export default function SideProject({ data }: { data: SideProjectData }): JSX.Element {
    const { pageData, sideProjects } = data
    const { body, excerpt } = pageData
    const {
        title,
        description,
        featuredImage,
        projectThumbnail,
        projectAuthor,
        authorGitHub,
        teamLink,
        githubUrl,
        liveUrl,
        filters,
    } = pageData.frontmatter
    const profiles = useCreatorProfiles()
    const { isModerator } = useUser()

    const tags = filters?.tags || []
    const relativePath = pageData.parent?.relativePath

    const projectsMenu = [
        {
            name: 'Side projects',
            url: '/side-projects',
            children: sideProjects.nodes.map(({ frontmatter: { title }, fields: { slug } }) => ({
                name: title,
                url: slug,
            })),
        },
    ]

    return (
        <>
            <SEO
                image={featuredImage?.publicURL}
                title={`${title} - PostHog side projects`}
                description={description || excerpt}
            />
            <ReaderView
                body={{ type: 'plain' }}
                title={title}
                filePath={relativePath}
                leftSidebar={<TreeMenu items={projectsMenu} />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
            >
                <div className="max-w-3xl mx-auto">
                    <header className="not-prose mb-8">
                        <h1 className="m-0 mb-2 text-3xl @2xl:text-4xl">{title}</h1>
                        {description && <p className="m-0 mb-4 text-lg text-secondary">{description}</p>}

                        {tags.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-1.5">
                                {tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        to={`/side-projects?tag=${encodeURIComponent(tag)}`}
                                        state={{ newWindow: true }}
                                        className="rounded-full border border-primary px-2.5 py-0.5 text-[13px] text-secondary hover:text-primary"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div
                            data-scheme="secondary"
                            className="flex flex-wrap items-center gap-4 rounded border border-primary bg-primary p-4"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 text-[13px] text-secondary">Made by</div>
                                <Creator
                                    projectAuthor={projectAuthor}
                                    authorGitHub={authorGitHub}
                                    teamLink={teamLink}
                                    profiles={profiles}
                                    size="lg"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {liveUrl && (
                                    <OSButton
                                        asLink
                                        to={liveUrl}
                                        external
                                        variant="primary"
                                        size="md"
                                        icon={<IconExternal />}
                                    >
                                        Try it
                                    </OSButton>
                                )}
                                {githubUrl && (
                                    <OSButton
                                        asLink
                                        to={githubUrl}
                                        external
                                        variant="secondary"
                                        size="md"
                                        icon={<IconGithub />}
                                    >
                                        View source
                                    </OSButton>
                                )}
                                {isModerator && relativePath && (
                                    <OSButton
                                        asLink
                                        to={getEditProjectUrl(relativePath)}
                                        external
                                        size="md"
                                        icon={<IconPencil />}
                                        tooltip="Edit this project on GitHub"
                                    >
                                        Edit
                                    </OSButton>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="not-prose mb-8 overflow-hidden rounded-md border border-primary">
                        {featuredImage?.childImageSharp ? (
                            <GatsbyImage image={getImage(featuredImage)} alt={title} />
                        ) : projectThumbnail ? (
                            <img src={projectThumbnail} alt={title} className="w-full object-cover" />
                        ) : (
                            (() => {
                                const profile = findCreatorProfile(profiles, { projectAuthor, authorGitHub })
                                return (
                                    <SideProjectGraphic
                                        title={title}
                                        creatorName={projectAuthor}
                                        creatorRole={profile?.companyRole}
                                        avatarUrl={
                                            profile?.avatar?.url ||
                                            profile?.avatar?.formats?.thumbnail?.url ||
                                            (authorGitHub
                                                ? `https://github.com/${authorGitHub}.png?size=256`
                                                : undefined)
                                        }
                                        color={profile?.color}
                                    />
                                )
                            })()
                        )}
                    </div>

                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query SideProject($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            parent {
                ... on File {
                    relativePath
                }
            }
            frontmatter {
                title
                description
                projectThumbnail
                projectAuthor
                authorGitHub
                teamLink
                githubUrl
                liveUrl
                filters {
                    tags
                }
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        sideProjects: allMdx(
            filter: {
                fields: { slug: { regex: "/^/side-projects/(?!_)/" } }
                frontmatter: { projectAuthor: { ne: null } }
            }
            sort: { fields: frontmatter___title, order: ASC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
    }
`
