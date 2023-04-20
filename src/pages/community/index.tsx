import React, { useEffect, useRef, useState } from 'react'
import { graphql, PageProps } from 'gatsby'
import community from 'sidebars/community.json'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import Link from 'components/Link'
import { Authentication, EditProfile, useQuestion } from 'components/Squeak'
import { useUser } from 'hooks/useUser'
import Modal from 'components/Modal'
import { CallToAction } from 'components/CallToAction'
import Spinner from 'components/Spinner'
import { useStaticQuery } from 'gatsby'
import Tooltip from 'components/Tooltip'
import GitHubTooltip, { Author } from 'components/GitHubTooltip'
import QuestionsTable from 'components/Questions/QuestionsTable'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { QuestionData } from 'lib/strapi'
import { useQuestions } from 'hooks/useQuestions'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { User } from '../../hooks/useUser'

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
    const [state, setState] = useState<null | 'login' | 'signup'>(null)

    return state === 'login' ? (
        <>
            <p className="m-0 text-sm font-bold dark:text-white">
                Note: PostHog.com authentication is separate from your PostHog app.
            </p>
            <p className="text-sm my-2 dark:text-white">
                We suggest signing up with your personal email. Soon you'll be able to link your PostHog app account.
            </p>
            <Authentication showBanner={false} showProfile={false} />
        </>
    ) : state === 'signup' ? (
        <>
            <p className="m-0 text-sm font-bold dark:text-white">
                Note: PostHog.com authentication is separate from your PostHog app.
            </p>
            <p className="text-sm my-2 dark:text-white">
                We suggest signing up with your personal email. Soon you'll be able to link your PostHog app account.
            </p>
            <Authentication initialView="sign-up" showBanner={false} showProfile={false} />
        </>
    ) : (
        <>
            <p className="m-0 text-sm dark:text-white">
                Your PostHog.com community profile lets you ask questions and get early access to beta features.
            </p>
            <p className="text-[13px] my-2 dark:text-white p-2 bg-gray-accent-light dark:bg-gray-accent-dark rounded">
                <strong>Tip:</strong> If you've ever asked a question on PostHog.com, you already have an account!
            </p>
            <CallToAction onClick={() => setState('login')} width="full" size="sm">
                Login to posthog.com
            </CallToAction>
            <CallToAction onClick={() => setState('signup')} width="full" type="secondary" size="sm" className="mt-2">
                Create an account
            </CallToAction>
        </>
    )
}

export const Profile = ({ user, setEditModalOpen }: { user: User; setEditModalOpen: (open: boolean) => void }) => {
    const { profile, email } = user
    const { id } = profile
    const name = [profile.firstName, profile.lastName].filter(Boolean).join(' ')

    return (
        <div>
            <Link
                to={`/community/profiles/${id}`}
                className="flex items-center space-x-2 mt-2 mb-1 -mx-2 relative active:top-[1px] active:scale-[.99] hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark rounded p-2"
            >
                <Avatar src={getAvatarURL(user?.profile)} className="w-[40px] h-[40px]" />
                <div>
                    {name && <p className="m-0 font-bold">{name}</p>}
                    {email && (
                        <p className="m-0 font-normal text-sm text-primary/60 dark:text-primary-dark/60">{email}</p>
                    )}
                </div>
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

const Subscription = ({ question }: { question: QuestionData }) => {
    const { permalink, numReplies, id, subject } = question
    const { setSubscription } = useUser()

    return (
        <ListItem>
            <div className="flex-grow flex flex-col overflow-hidden">
                <Link
                    className="font-bold text-ellipsis overflow-hidden whitespace-nowrap text-base"
                    to={`/questions/${permalink}`}
                >
                    {subject}
                </Link>
            </div>
            <p className={`m-0 font-semibold opacity-60 flex-shrink-0 text-sm xl:w-[200px] flex space-x-1`}>
                <span>
                    {numReplies || 0} {numReplies === 1 ? 'reply' : 'replies'}
                </span>
            </p>
            <div className="flex">
                <button className="text-red font-bold text-sm" onClick={() => setSubscription('question', id, false)}>
                    Unsubscribe
                </button>
            </div>
        </ListItem>
    )
}

const Subscriptions = () => {
    const { user, fetchUser } = useUser()
    const subscriptions = user?.profile?.questionSubscriptions

    useEffect(() => {
        if (user) fetchUser()
    }, [])

    if (!subscriptions) return null
    return (
        <div id="my-activity" className="mb-12">
            <SectionTitle>My subscriptions</SectionTitle>
            {subscriptions?.length > 0 ? (
                subscriptions.map((question) => {
                    return <Subscription key={question.id} user={user} question={question} />
                })
            ) : (
                <p>You're not subscribed to any questions yet</p>
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
                content={() => (
                    <GitHubTooltip
                        reactions={reactions}
                        body={body}
                        user={user}
                        labels={labels}
                        updated_at={updated_at}
                        title={title}
                        url={url}
                    />
                )}
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

const RecentQuestions = () => {
    // const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const { questions, fetchMore, isLoading } = useQuestions({ limit: 3 })

    return (
        <div id="recent-questions" className="mb-12">
            <SectionTitle>Recent questions</SectionTitle>
            <QuestionsTable hideLoadMore questions={questions} fetchMore={fetchMore} isLoading={isLoading} />
            <CallToAction className="mt-4" type="secondary" width="full" to="/questions">
                Browse all questions
            </CallToAction>
        </div>
    )
}

export default function CommunityPage({ params }: PageProps) {
    return (
        <>
            <SEO title={`Community - PostHog`} />
            <Layout>
                <PostLayout
                    menuWidth={{ right: 320 }}
                    title="Profile"
                    menu={community}
                    sidebar={<ProfileSidebar />}
                    tableOfContents={[
                        { url: 'recent-questions', value: 'Recent questions', depth: 0 },
                        { url: 'active-issues', value: 'Most active issues', depth: 0 },
                        { url: 'active-pulls', value: 'Most active PRs', depth: 0 },
                    ]}
                    hideSurvey
                >
                    <Subscriptions />
                    <RecentQuestions />
                </PostLayout>
            </Layout>
        </>
    )
}

const ProfileSidebar = () => {
    const { user, logout } = useUser()

    const [editModalOpen, setEditModalOpen] = useState(false)

    return (
        <>
            <Modal setOpen={setEditModalOpen} open={editModalOpen}>
                <div
                    onClick={() => setEditModalOpen(false)}
                    className="flex flex-start justify-center absolute w-full p-4"
                >
                    <div
                        className="max-w-xl bg-white dark:bg-black rounded-md relative w-full p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <EditProfile onSubmit={() => setEditModalOpen(false)} />
                    </div>
                </div>
            </Modal>
            <SidebarSection>
                <div className="mb-2 flex items-baseline justify-between">
                    <h4 className="m-0">My profile</h4>
                    {user?.profile && (
                        <button onClick={logout} className="text-red font-bold text-sm">
                            Logout
                        </button>
                    )}
                </div>
                {user?.profile ? <Profile setEditModalOpen={setEditModalOpen} user={user} /> : <Login />}
            </SidebarSection>
            <SidebarSection title="Subscribed topics">123</SidebarSection>
        </>
    )
}
