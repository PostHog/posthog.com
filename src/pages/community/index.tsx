import React, { useEffect, useState } from 'react'
import { graphql, PageProps } from 'gatsby'
import { docs } from '../../sidebars/sidebars.json'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import PostLayout, { SidebarSection } from 'components/PostLayout'
import Link from 'components/Link'
import { OrgProvider, UserProvider, useUser, Question } from 'squeak-react'
import Modal from 'components/Modal'
import EditProfile from 'components/Profiles/EditProfile'
import { SqueakProfile } from './profiles/[id]'
import { CallToAction } from 'components/CallToAction'
import { Login as SqueakLogin } from 'squeak-react'
import Spinner from 'components/Spinner'
import { useStaticQuery } from 'gatsby'

const Avatar = (props: { className?: string; src?: string }) => {
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

const Login = () => {
    const [login, setLogin] = useState<null | { type: 'login' | 'signup' }>(null)
    return login ? (
        <>
            <p className="m-0 text-sm font-bold">Note: PostHog.com authentication is separate from your PostHog app.</p>
            <p className="text-sm mt-2">
                We suggest signing up with your personal email. Soon you'll be able to link your PostHog app account.
            </p>
            <SqueakLogin />
        </>
    ) : (
        <>
            <p className="m-0 text-base">
                Your PostHog.com community profile lets you ask questions and get early access to beta features.
            </p>
            <p className="text-sm mt-2">
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

const Profile = ({
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
            <div className="flex items-center space-x-2 mt-4 mb-6">
                <Avatar src={avatar} className="w-[40px] h-[40px]" />
                <div>{name && <p className="m-0 font-semibold">{name}</p>}</div>
            </div>
            <CallToAction to={`/community/profiles/${id}`} width="full" size="xs" type="secondary">
                Visit profile
            </CallToAction>
            <CallToAction
                onClick={() => setEditModalOpen(true)}
                width="full"
                size="xs"
                type="outline"
                className="mt-2 border-black/30"
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
        <div className="mb-12">
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
                                        className="font-bold text-ellipsis overflow-hidden whitespace-nowrap"
                                        to={`/question/${question?.permalink}`}
                                    >
                                        {question?.subject}
                                    </Link>
                                </div>
                                <p className="m-0 font-semibold opacity-60 flex-shrink-0 w-[200px]">
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

const Issue = ({ number, title, url }: { number: number; title: string; url: string }) => {
    return (
        <>
            <p className="m-0 text-base opacity-60 min-w-[50px] flex-shrink-0">#{number}</p>
            <Link className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap flex-grow" to={url}>
                {title}
            </Link>
        </>
    )
}

const ActiveIssues = ({ issues }) => {
    return (
        <div className="mb-12">
            <SectionTitle>Most active issues</SectionTitle>
            <ul className="m-0 p-0 list-none">
                {issues.map((issue) => {
                    const { comments, ...other } = issue
                    return (
                        <ListItem key={issue?.id}>
                            <Issue {...other} />
                            <p className="m-0 text-ellipsis overflow-hidden whitespace-nowrap w-[200px] flex-shrink-0 font-semibold opacity-60">
                                {comments} comment{comments.length === 1 ? '' : 's'}
                            </p>
                        </ListItem>
                    )
                })}
            </ul>
        </div>
    )
}

const ActivePulls = ({ pulls }) => {
    return (
        <div className="mb-12">
            <SectionTitle>Most active PRs</SectionTitle>
            <ul className="m-0 p-0 list-none">
                {pulls.map((pull) => {
                    return (
                        <ListItem key={pull?.id}>
                            <Issue {...pull} />
                            <Link to={pull?.user?.url} className="flex items-center space-x-2 flex-shrink-0 w-[200px]">
                                <img className="rounded-full w-[30px] h-[30px]" src={pull?.user?.avatar} />
                                <p className="m-0 text-ellipsis overflow-hidden whitespace-nowrap">
                                    {pull?.user?.username}
                                </p>
                            </Link>
                        </ListItem>
                    )
                })}
            </ul>
        </div>
    )
}

export default function CommunityPage({ params }: PageProps) {
    const [profile, setProfile] = useState<SqueakProfile | undefined>(undefined)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [questions, setQuestions] = useState([])
    const [questionsLoading, setQuestionsLoading] = useState(true)
    const { issues, pulls } = useStaticQuery(query)

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
                            title="Profile"
                            menu={docs}
                            sidebar={
                                <ProfileSidebar
                                    setProfile={setProfile}
                                    setEditModalOpen={setEditModalOpen}
                                    profile={profile}
                                />
                            }
                            hideSurvey
                        >
                            {profile && <Activity questionsLoading={questionsLoading} questions={questions} />}
                            <ActiveIssues issues={issues.nodes} />
                            <ActivePulls pulls={pulls.nodes} />
                        </PostLayout>
                    </UserProvider>
                </Layout>
            </OrgProvider>
        </>
    )
}

const ProfileSidebar = ({
    profile,
    setProfile,
    setEditModalOpen,
}: {
    profile?: SqueakProfile
    setProfile: (profile: SqueakProfile) => void
    setEditModalOpen: (open: boolean) => void
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
        <div>
            <SidebarSection>
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="m-0">My profile</h4>
                    {profile && (
                        <button onClick={handleSignOut} className="text-red font-semibold text-sm">
                            Sign out
                        </button>
                    )}
                </div>
                {profile ? <Profile setEditModalOpen={setEditModalOpen} profile={profile} /> : <Login />}
            </SidebarSection>
        </div>
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
            }
        }
    }
`
