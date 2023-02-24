import React, { useEffect, useState } from 'react'
import { graphql, navigate, PageProps } from 'gatsby'
import community from 'sidebars/community.json'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import Link from 'components/Link'
import { OrgProvider, UserProvider, useUser, Question } from 'squeak-react'
import Modal from 'components/Modal'
import EditProfile from 'components/Profiles/EditProfile'
import { SqueakProfile } from './profiles/[id]'
import { CallToAction } from 'components/CallToAction'
import { Login as SqueakLogin } from 'squeak-react'
import Spinner from 'components/Spinner'
import { useStaticQuery } from 'gatsby'
import Tooltip from 'components/Tooltip'
import GitHubTooltip, { Author } from 'components/GitHubTooltip'
import QuestionsTable from 'components/Questions/QuestionsTable'
import useSWRInfinite from 'swr/infinite'
import SidebarSection from 'components/PostLayout/SidebarSection'

export const Avatar = (props: { className?: string; src?: string }) => {
    return (
        <div className={`overflow-hidden rounded-full ${props.className}`}>
            {props.src ? (
                <img className="w-full h-full" alt="" src={props.src} />
            ) : (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            )}
        </div>
    )
}

export const Login = ({ onSubmit = () => undefined }: { onSubmit?: () => void }) => {
    const [login, setLogin] = useState<null | { type: 'login' | 'signup' }>(null)
    return login ? (
        <>
            <p className="m-0 text-sm font-bold dark:text-white">
                Note: PostHog.com authentication is separate from your PostHog app.
            </p>
            <p className="text-sm mt-2 dark:text-white">
                We suggest signing up with your personal email. Soon you'll be able to link your PostHog app account.
            </p>
            <SqueakLogin onSubmit={onSubmit} />
        </>
    ) : (
        <>
            <p className="m-0 text-sm dark:text-white">
                Your PostHog.com community profile lets you ask questions and get early access to beta features.
            </p>
            <p className="text-[13px] mt-2 dark:text-white p-2 bg-gray-accent-light dark:bg-gray-accent-dark rounded">
                <strong>Tip:</strong> If you've ever asked a question on PostHog.com, you already have an account!
            </p>
            <CallToAction onClick={() => setLogin({ type: 'login' })} width="full" size="sm">
                Login to posthog.com
            </CallToAction>
            <CallToAction
                onClick={() => setLogin({ type: 'signup' })}
                width="full"
                type="secondary"
                size="sm"
                className="mt-2"
            >
                Create an account
            </CallToAction>
        </>
    )
}

export const Profile = ({
    profile,
    setEditModalOpen,
}: {
    profile: SqueakProfile
    setEditModalOpen: (open: boolean) => void
}) => {
    const { avatar, id } = profile
    const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ')
    return (
        <div>
            <Link
                to={`/community/profiles/${id}`}
                className="flex items-center space-x-2 mt-2 mb-1 -mx-2 relative active:top-[1px] active:scale-[.99] hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark rounded p-2"
            >
                <Avatar src={avatar} className="w-[40px] h-[40px]" />
                <div>{name && <p className="m-0 font-bold">{name}</p>}</div>
            </Link>

            <CallToAction
                onClick={() => setEditModalOpen(true)}
                width="full"
                size="xs"
                type="secondary"
                className="mt-2"
            >
                Edit profile
            </CallToAction>
        </div>
    )
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="m-0 mb-6">{children}</h2>
}

const ListItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <li className="flex justify-between space-x-2 items-end text-lg pb-4 mb-4 border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed last:border-b-0 last:pb-0 last:mb-0">
            {children}
        </li>
    )
}

const Activity = ({ questions, questionsLoading }) => {
    const { user } = useUser()
    return (
        <div id="my-activity" className="mb-12">
            <SectionTitle>My activity</SectionTitle>
            {questionsLoading ? (
                <Spinner />
            ) : questions?.length > 0 ? (
                <ul className="m-0 p-0 list-none">
                    {questions.map((q) => {
                        const { question, numReplies, profile } = q
                        return (
                            <ListItem key={question?.id}>
                                <div className="flex-grow flex flex-col overflow-hidden">
                                    <p className="m-0 text-sm opacity-60">
                                        {profile?.id === user?.profile?.id ? 'You started a thread' : 'You replied to'}:
                                    </p>
                                    <Link
                                        className="font-bold text-ellipsis overflow-hidden whitespace-nowrap text-base"
                                        to={`/questions/${question?.permalink}`}
                                    >
                                        {question?.subject}
                                    </Link>
                                </div>
                                <p className="m-0 font-semibold opacity-60 flex-shrink-0 text-sm xl:w-[200px]">
                                    {numReplies} {numReplies === 1 ? 'reply' : 'replies'}
                                </p>
                            </ListItem>
                        )
                    })}
                </ul>
            ) : (
                <p>You haven't asked / answered any questions yet!</p>
            )}
        </div>
    )
}

const Issue = ({
    number,
    title,
    url,
    reactions,
    body,
    user,
    labels,
    preview = true,
    updated_at,
}: {
    number: number
    title: string
    url: string
}) => {
    return (
        <>
            <p className="m-0 text-base opacity-60 min-w-[50px] flex-shrink-0">#{number}</p>
            <Tooltip
                className="text-ellipsis overflow-hidden whitespace-nowrap flex-grow text-red"
                content={
                    <GitHubTooltip
                        reactions={reactions}
                        body={body}
                        user={user}
                        labels={labels}
                        updated_at={updated_at}
                        title={title}
                        url={url}
                    />
                }
            >
                <span className="relative">
                    <Link className="text-base font-bold" to={url}>
                        {title}
                    </Link>
                </span>
            </Tooltip>
        </>
    )
}

const ActiveIssues = ({ issues }) => {
    return (
        <div id="active-issues" className="mb-12">
            <SectionTitle>Most active issues</SectionTitle>
            <ul className="m-0 p-0 list-none mb-6">
                {issues.map((issue) => {
                    const { comments, ...other } = issue
                    return (
                        <ListItem key={issue?.id}>
                            <Issue {...other} />
                            <p className="m-0 text-ellipsis overflow-hidden whitespace-nowrap xl:w-[200px] flex-shrink-0 font-semibold opacity-60">
                                {comments} comment{comments.length === 1 ? '' : 's'}
                            </p>
                        </ListItem>
                    )
                })}
            </ul>
            <CallToAction width="full" type="secondary" to="https://github.com/PostHog/posthog/issues">
                See active issues on GitHub
            </CallToAction>
        </div>
    )
}

const RecentQuestions = () => {
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const { data, size, setSize, isLoading, mutate } = useSWRInfinite<any[]>(
        (offset) =>
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/v1/questions?organizationId=${
                process.env.GATSBY_SQUEAK_ORG_ID
            }&start=${offset * 5}&perPage=5&published=true&sortBy=${sortBy}`,
        (url: string) =>
            fetch(url)
                .then((r) => r.json())
                .then((r) => r.questions)
    )

    const questions = React.useMemo(() => {
        return data?.flat() || []
    }, [size, data])
    return (
        <div id="recent-questions" className="mb-12">
            <SectionTitle>Recent questions</SectionTitle>
            <QuestionsTable hideLoadMore questions={questions} size={size} setSize={setSize} isLoading={isLoading} />
            <CallToAction className="mt-4" type="secondary" width="full" to="/questions">
                Browse all questions
            </CallToAction>
        </div>
    )
}

const ActiveUsers = () => {
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/leaderboard?organizationId=${process.env.GATSBY_SQUEAK_ORG_ID}`
        )
            .then((res) => res.json())
            .then((profiles) => setProfiles(profiles))
    })

    return (
        <div id="active-users" className="mb-12">
            <SectionTitle>Most active users</SectionTitle>
            <ul className="m-0 p-0 list-none mb-6">
                {profiles.map((profile) => {
                    return (
                        <ListItem key={profile?.id}>
                            <Link
                                className="flex items-center space-x-2 group text-ellipsis overflow-hidden whitespace-nowrap flex-grow text-red"
                                to={`/community/profiles/${profile?.id}`}
                            >
                                <Avatar className="w-[50px] h-[50px] flex-shrink-0" src={profile.avatar} />
                                <p className="m-0 font-semibold">
                                    {profile.first_name} {profile.last_name}
                                </p>
                            </Link>
                            <div className="flex-shrink-0">
                                <div>
                                    <p className="m-0 flex-shrink-0 font-semibold opacity-60">
                                        {profile.replies} repl{profile.replies?.length === 1 ? 'y' : 'ies'}
                                    </p>
                                </div>
                                <div>
                                    <p className="m-0 flex-shrink-0 font-semibold opacity-60">
                                        {profile.resolutions} resolution{profile.resolutions?.length === 1 ? '' : 's'}
                                    </p>
                                </div>
                            </div>
                        </ListItem>
                    )
                })}
            </ul>
        </div>
    )
}

const ActivePulls = ({ pulls }) => {
    return (
        <div id="active-pulls" className="mb-12">
            <SectionTitle>Most active PRs</SectionTitle>
            <ul className="m-0 p-0 list-none mb-6">
                {pulls.map((pull) => {
                    return (
                        <ListItem key={pull?.id}>
                            <Issue preview={false} {...pull} />
                            <Author url={pull?.user?.url} avatar={pull?.user?.avatar} username={pull?.user?.username} />
                        </ListItem>
                    )
                })}
            </ul>
            <CallToAction width="full" type="secondary" to="https://github.com/PostHog/posthog/pulls">
                See active PRs on GitHub
            </CallToAction>
        </div>
    )
}

export default function CommunityPage({ params }: PageProps) {
    const [profile, setProfile] = useState<SqueakProfile | undefined>(undefined)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [questions, setQuestions] = useState([])
    const [questionsLoading, setQuestionsLoading] = useState(true)
    const { issues, pulls, postHogStats, postHogComStats } = useStaticQuery(query)

    useEffect(() => {
        if (profile) {
            setQuestionsLoading(true)
            fetch(`https://squeak.cloud/api/questions`, {
                method: 'POST',
                body: JSON.stringify({
                    organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626',
                    profileId: profile?.id,
                    published: true,
                    perPage: 5,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    if (res.status === 404) {
                        throw new Error('not found')
                    }

                    return res.json()
                })
                .then((questions) => {
                    setQuestions(questions?.questions)
                    setQuestionsLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setQuestionsLoading(false)
                })
        }
    }, [profile])

    const handleEditProfile = (updatedProfile: SqueakProfile) => {
        setProfile({ ...profile, ...updatedProfile })
        setEditModalOpen(false)
    }

    return (
        <>
            <SEO title={`Community - PostHog`} />
            <OrgProvider
                value={{ organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626', apiHost: 'https://squeak.cloud' }}
            >
                <Layout>
                    <UserProvider>
                        <Modal setOpen={setEditModalOpen} open={editModalOpen}>
                            <div
                                onClick={() => setEditModalOpen(false)}
                                className="flex flex-start justify-center absolute w-full p-4"
                            >
                                <div
                                    className="max-w-xl bg-white dark:bg-black rounded-md relative w-full p-5"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <EditProfile onSubmit={handleEditProfile} profile={profile} />
                                </div>
                            </div>
                        </Modal>
                        <PostLayout
                            menuWidth={{ right: 320 }}
                            title="Profile"
                            menu={community}
                            sidebar={
                                <ProfileSidebar
                                    setProfile={setProfile}
                                    setEditModalOpen={setEditModalOpen}
                                    profile={profile}
                                    postHogStats={postHogStats}
                                    postHogComStats={postHogComStats}
                                />
                            }
                            tableOfContents={[
                                ...(profile ? [{ url: 'my-activity', value: 'My activity', depth: 0 }] : []),
                                { url: 'recent-questions', value: 'Recent questions', depth: 0 },
                                { url: 'active-issues', value: 'Most active issues', depth: 0 },
                                { url: 'active-pulls', value: 'Most active PRs', depth: 0 },
                                { url: 'active-users', value: 'Most active users', depth: 0 },
                            ]}
                            hideSurvey
                        >
                            {profile && <Activity questionsLoading={questionsLoading} questions={questions} />}
                            <RecentQuestions />
                            <ActiveIssues issues={issues.nodes} />
                            <ActivePulls pulls={pulls.nodes} />
                            <ActiveUsers />
                        </PostLayout>
                    </UserProvider>
                </Layout>
            </OrgProvider>
        </>
    )
}

interface IGitHubStats {
    commits: number
    contributors: number
    forks: number
    stars: number
}

const Stat = ({ label, count }: { label: string; count: number }) => {
    return (
        <li className="flex flex-col flex-1">
            <h5 className="m-0 text-sm opacity-60 font-semibold">{label}</h5>
            <p className="m-0 text-sm font-semibold">{count.toLocaleString()}</p>
        </li>
    )
}

const Stats = ({
    owner,
    repo,
    description,
    stats,
}: {
    owner: string
    repo: string
    description: React.ReactNode
    stats: IGitHubStats
}) => {
    return (
        <div className="mb-6">
            <Link to={`https://github.com/${owner}/${repo}`} external className="font-semibold">
                {owner}/{repo}
            </Link>
            <p className="m-0 text-sm">{description}</p>
            <ul className="m-0 p-0 list-none flex space-x-3 mt-2">
                <Stat label="Stars" count={stats?.stars} />
                <Stat label="Contributors" count={stats?.contributors} />
                <Stat label="Forks" count={stats?.forks} />
                <Stat label="Commits" count={stats?.commits} />
            </ul>
        </div>
    )
}

const ProfileSidebar = ({
    profile,
    setProfile,
    setEditModalOpen,
    postHogStats,
    postHogComStats,
}: {
    profile?: SqueakProfile
    setProfile: (profile: SqueakProfile) => void
    setEditModalOpen: (open: boolean) => void
    postHogStats: IGitHubStats
    postHogComStats: IGitHubStats
}) => {
    const { user, setUser } = useUser()
    useEffect(() => {
        setProfile(user?.profile)
    }, [user])

    const handleSignOut = async () => {
        await fetch('https://squeak.cloud/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        setUser(null)
    }

    return (
        <>
            <SidebarSection>
                <div className="mb-2 flex items-baseline justify-between">
                    <h4 className="m-0">My profile</h4>
                    {profile && (
                        <button onClick={handleSignOut} className="text-red font-bold text-sm">
                            Logout
                        </button>
                    )}
                </div>
                {profile ? <Profile setEditModalOpen={setEditModalOpen} profile={profile} /> : <Login />}
            </SidebarSection>
            <SidebarSection title="Stats for our popular repos">
                <Stats
                    stats={postHogStats}
                    owner="posthog"
                    repo="posthog"
                    description="The app you're here to learn about"
                />
                <Stats
                    stats={postHogComStats}
                    owner="posthog"
                    repo="posthog.com"
                    description={
                        <>
                            The very website you're on <i>right now</i>!
                        </>
                    }
                />
            </SidebarSection>
        </>
    )
}

export const query = graphql`
    {
        issues: allPostHogIssue {
            nodes {
                id
                number
                title
                url
                comments
                user {
                    avatar
                    url
                    username
                }
                reactions {
                    hooray
                    heart
                    eyes
                    plus1
                }
                body
                labels {
                    name
                }
                updated_at(formatString: "MMMM DD, YYYY")
            }
        }
        pulls: allPostHogPull {
            nodes {
                id
                number
                title
                url
                user {
                    avatar
                    url
                    username
                }
                body
                updated_at(formatString: "MMMM DD, YYYY")
            }
        }
        postHogComStats: gitHubStats(repo: { eq: "posthog.com" }) {
            commits
            contributors
            forks
            stars
        }
        postHogStats: gitHubStats(repo: { eq: "posthog" }) {
            commits
            contributors
            forks
            stars
        }
    }
`
