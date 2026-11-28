import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconCheckCircle } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Panel from 'components/Docs/Panel'
import { questionsTagFilter, questionsTagForLabel } from 'components/Forum/questionTags'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { Progress } from 'components/UI/Progress'
import type { ColorName } from 'components/UI/colors'
import { useQuestions } from 'hooks/useQuestions'
import { useUser, User } from 'hooks/useUser'
import type { ForumTagData, StrapiRecord } from 'lib/strapi'
import { useApp } from '../../../context/App'
import { POCKET_GUIDE_VOLUMES, PocketGuideVolume, pocketGuideUrl } from '../../../constants/pocketGuides'
import { readChapterSlugs, ReadChapterSlugsByVolume } from '../../../lib/learnProgress'
import { learnChapterSlug, useBookPages } from '../PocketGuides/bookModel'
import { useReadChapterSlugs, useReadProgress } from '../PocketGuides/chapterProgress'

dayjs.extend(relativeTime)

const HELP_QUESTION_LIMIT = 5
const THANKS_LIMIT = 5

const PROGRESS_COLOR_BY_TOKEN: Record<PocketGuideVolume['token'], ColorName> = {
    blue: 'blue',
    purple: 'purple',
    yellow: 'lemon',
    seagreen: 'teal',
    orange: 'tangerine',
    red: 'coral',
}

const EmptyLine = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <p className="m-0 rounded border border-dashed border-primary p-4 text-sm text-secondary">{children}</p>
)

function volumesWithSavedProgress(progress: ReadChapterSlugsByVolume): PocketGuideVolume[] {
    return POCKET_GUIDE_VOLUMES.filter(
        (volume) => !volume.comingSoon && readChapterSlugs(progress, volume.id).length > 0
    )
}

function GuideProgressRow({ volume }: { volume: PocketGuideVolume }): JSX.Element | null {
    const chapters = useBookPages(volume.id).filter((page) => page.page)
    const readSlugs = useReadChapterSlugs(volume.id)
    const readChapterCount = chapters.filter((chapter) => readSlugs.has(learnChapterSlug(chapter))).length
    if (readChapterCount === 0) return null
    return (
        <li className="py-2">
            <Link
                to={pocketGuideUrl(volume)}
                state={{ newWindow: true }}
                className="block text-[15px] font-bold !text-primary"
            >
                {volume.title}
            </Link>
            <Progress.Root
                value={readChapterCount}
                max={chapters.length}
                color={PROGRESS_COLOR_BY_TOKEN[volume.token]}
                className="mt-1.5"
                aria-label={`${volume.title} chapters read`}
            >
                <Progress.Track>
                    <Progress.Indicator />
                </Progress.Track>
            </Progress.Root>
            <p className="m-0 mt-1 text-sm text-secondary tabular-nums">
                {readChapterCount} of {chapters.length} chapters
            </p>
        </li>
    )
}

function GuideProgress({ volumes, isSignedIn }: { volumes: PocketGuideVolume[]; isSignedIn: boolean }): JSX.Element {
    return (
        <Panel
            eyebrow="Your guides"
            description={
                isSignedIn
                    ? 'Chapters you read in each guide you started.'
                    : 'Saved in this browser. Sign in to keep it on every device.'
            }
        >
            <ul className="peer m-0 list-none p-0">
                {volumes.map((volume) => (
                    <GuideProgressRow key={volume.id} volume={volume} />
                ))}
            </ul>
            <div className="hidden peer-empty:block">
                <EmptyLine>
                    You have not started a guide yet.{' '}
                    <Link to="/learn" className="font-bold">
                        Browse pocket guides
                    </Link>
                </EmptyLine>
            </div>
            <div className="mt-3 peer-empty:hidden">
                <Link to="/learn" className="text-sm font-semibold !text-primary hover:underline">
                    All pocket guides &rarr;
                </Link>
            </div>
        </Panel>
    )
}

const notArchivedOrResolved = [
    { $or: [{ resolved: { $null: true } }, { resolved: { $eq: false } }] },
    { $or: [{ archived: { $null: true } }, { archived: { $eq: false } }] },
]

type VolumeWithForumTag = { volume: PocketGuideVolume; forumTag: string }

function volumesWithForumTags(volumes: PocketGuideVolume[]): VolumeWithForumTag[] {
    return volumes.flatMap((volume) => {
        const forumTag = questionsTagForLabel(volume.docsProduct?.replace(/-/g, ' '))
        return forumTag ? [{ volume, forumTag }] : []
    })
}

function replyCountLabel(replyCount: number): string {
    if (replyCount === 0) return 'no reply yet'
    return `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`
}

function OpenQuestionList({
    profileId,
    taggedVolumes,
}: {
    profileId: number
    taggedVolumes: VolumeWithForumTag[]
}): JSX.Element {
    const { questions, isLoading } = useQuestions({
        limit: HELP_QUESTION_LIMIT,
        sort: ['createdAt:desc'],
        fields: ['subject', 'permalink', 'numReplies', 'createdAt'],
        populate: { profile: { fields: ['firstName'] }, forumTags: { fields: ['slug'] } },
        filters: {
            profile: { id: { $ne: profileId } },
            subject: { $ne: '' },
            $and: [
                ...notArchivedOrResolved,
                { $or: taggedVolumes.map(({ forumTag }) => questionsTagFilter(forumTag)) },
            ],
        },
    })
    const unansweredFirst = [...questions.data].sort(
        (first, second) =>
            Number((first.attributes.numReplies ?? 0) > 0) - Number((second.attributes.numReplies ?? 0) > 0)
    )
    const productTitle = (forumTags: StrapiRecord<ForumTagData>[] = []) =>
        taggedVolumes.find(({ forumTag }) => forumTags.some((tag) => tag.attributes.slug === forumTag))?.volume.title

    if (!isLoading && unansweredFirst.length === 0) return <EmptyLine>No open questions right now.</EmptyLine>

    return (
        <ul className="m-0 list-none p-0">
            {unansweredFirst.map(({ id, attributes }) => {
                const threadUrl = `/forum/p/${attributes.permalink}`
                return (
                    <li
                        key={id}
                        className="flex items-center gap-3 border-t border-primary py-3 first:border-t-0 first:pt-0"
                    >
                        <div className="min-w-0 flex-1">
                            <Link to={threadUrl} className="block truncate text-[15px] font-bold !text-primary">
                                {attributes.subject}
                            </Link>
                            <p className="m-0 truncate text-sm text-secondary">
                                {[
                                    attributes.profile?.data?.attributes?.firstName,
                                    productTitle(attributes.forumTags?.data),
                                    dayjs(attributes.createdAt).fromNow(),
                                    replyCountLabel(attributes.numReplies ?? 0),
                                ]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                        </div>
                        <OSButton asLink to={threadUrl} variant="secondary" size="sm" className="shrink-0">
                            Answer
                        </OSButton>
                    </li>
                )
            })}
        </ul>
    )
}

function QuestionsToHelp({
    profileId,
    startedVolumes,
}: {
    profileId: number
    startedVolumes: PocketGuideVolume[]
}): JSX.Element {
    const taggedVolumes = volumesWithForumTags(startedVolumes)
    return (
        <Panel
            eyebrow="Questions you can help with"
            description="Open forum questions about the products in guides you started."
        >
            {taggedVolumes.length === 0 && (
                <EmptyLine>Start a pocket guide and questions about its product show here.</EmptyLine>
            )}
            {taggedVolumes.length > 0 && <OpenQuestionList profileId={profileId} taggedVolumes={taggedVolumes} />}
        </Panel>
    )
}

function askerLabel(askerFirstName?: string | null): string {
    return askerFirstName ? `Asked by ${askerFirstName}` : ''
}

function Thanks({ profileId }: { profileId: number }): JSX.Element {
    const { questions, total, isLoading } = useQuestions({
        limit: THANKS_LIMIT,
        sortBy: 'activity',
        fields: ['subject', 'permalink', 'activeAt'],
        populate: { profile: { fields: ['firstName'] } },
        filters: {
            resolved: { $eq: true },
            resolvedBy: { profile: { id: { $eq: profileId } } },
            profile: { id: { $ne: profileId } },
        },
    })
    const solvedThreads = questions.data
    const hasSolved = solvedThreads.length > 0

    return (
        <Panel
            eyebrow="Thanks you received"
            description={
                hasSolved && total
                    ? `${total} of your answers ${total === 1 ? 'was' : 'were'} marked as the solution.`
                    : 'Answers of yours that someone marked as the solution.'
            }
        >
            {!isLoading && !hasSolved && (
                <EmptyLine>None yet. When someone marks your answer as the solution, it shows here.</EmptyLine>
            )}
            <ul className="m-0 list-none p-0">
                {solvedThreads.map(({ id, attributes }) => (
                    <li
                        key={id}
                        className="flex items-start gap-3 border-t border-primary py-3 first:border-t-0 first:pt-0"
                    >
                        <IconCheckCircle className="mt-0.5 size-5 shrink-0 text-green" />
                        <div className="min-w-0 flex-1">
                            <Link
                                to={`/forum/p/${attributes.permalink}`}
                                className="block truncate text-[15px] font-bold !text-primary"
                            >
                                {attributes.subject}
                            </Link>
                            <p className="m-0 text-sm text-secondary">
                                {[
                                    askerLabel(attributes.profile?.data?.attributes?.firstName),
                                    dayjs(attributes.activeAt).fromNow(),
                                ]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </Panel>
    )
}

type AchievementTier = {
    id: number
    attributes: {
        title: string
        description: string
        icon?: { data?: { attributes?: { url?: `https://res.cloudinary.com/${string}` } } }
    }
}

type TieredAchievementGroups = {
    allAchievementGroup: { nodes: { achievements?: { data?: AchievementTier[] } }[] }
}

type ProfileWithAchievements = User['profile'] & { achievements?: { achievement?: { id: number } | null }[] }

function achievementIdsHeldBy(profile: ProfileWithAchievements): number[] {
    return (profile.achievements ?? []).flatMap((profileAchievement) =>
        profileAchievement.achievement ? [profileAchievement.achievement.id] : []
    )
}

function HelperAchievements({ heldAchievementIds }: { heldAchievementIds: number[] }): JSX.Element | null {
    const { allAchievementGroup } = useStaticQuery<TieredAchievementGroups>(graphql`
        query YourLearningAchievementLadders {
            allAchievementGroup(filter: { tiered: { eq: true } }) {
                nodes {
                    achievements {
                        data {
                            id
                            attributes {
                                title
                                description
                                icon {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const isHeld = (tier: AchievementTier) => heldAchievementIds.includes(Number(tier.id))
    const nextTiers = allAchievementGroup.nodes.flatMap((group) => {
        const nextTier = (group.achievements?.data ?? []).find((tier) => !isHeld(tier))
        return nextTier ? [nextTier] : []
    })
    const shownTiers = allAchievementGroup.nodes.flatMap((group) =>
        (group.achievements?.data ?? []).filter((tier) => isHeld(tier) || nextTiers.includes(tier))
    )
    if (shownTiers.length === 0) return null

    return (
        <Panel
            eyebrow={
                <Link to="/community/achievements" className="!text-primary hover:underline">
                    Achievements
                </Link>
            }
            description="The tiers you hold, and the next one to earn."
        >
            <ul className="m-0 list-none p-0">
                {shownTiers.map((tier) => {
                    const isNext = nextTiers.includes(tier)
                    const iconUrl = tier.attributes.icon?.data?.attributes?.url
                    return (
                        <li key={tier.id} className={`flex items-center gap-3 py-2 ${isNext ? 'opacity-60' : ''}`}>
                            <span className={`size-9 shrink-0 ${isNext ? 'grayscale' : ''}`}>
                                {iconUrl && <CloudinaryImage width={36} height={36} src={iconUrl} />}
                            </span>
                            <div className="min-w-0">
                                <p className="m-0 text-[15px] font-bold text-primary">
                                    {isNext ? 'Next: ' : ''}
                                    {tier.attributes.title}
                                </p>
                                <p className="m-0 text-sm text-secondary">{tier.attributes.description}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </Panel>
    )
}

function SignInPanel(): JSX.Element {
    const { openSignIn } = useApp()
    return (
        <Panel
            eyebrow="Help others learn"
            description="Sign in to see questions you can answer, thanks you received, and your achievements."
        >
            <div>
                <OSButton variant="secondary" size="md" onClick={() => openSignIn()}>
                    Sign in
                </OSButton>
            </div>
        </Panel>
    )
}

export default function YourLearning(): JSX.Element {
    const { user, isValidating } = useUser()
    const profileId = user?.profile?.id
    const isSignedIn = Boolean(profileId)
    const volumes = volumesWithSavedProgress(useReadProgress())

    return (
        <div className="@container not-prose">
            <h1 className="m-0 text-3xl font-bold !leading-tight">Your learning</h1>
            <p className="m-0 mt-1 text-secondary">
                {isSignedIn || isValidating ? 'Only you see this page.' : 'Your reading progress in this browser.'}
            </p>
            <div className="mt-6 flex flex-col gap-4 @3xl:flex-row @3xl:gap-6">
                <div className="contents @3xl:flex @3xl:w-2/3 @3xl:flex-col @3xl:gap-4">
                    {!isValidating && !isSignedIn && (
                        <div className="order-2">
                            <SignInPanel />
                        </div>
                    )}
                    {profileId && (
                        <>
                            <div className="order-2">
                                <QuestionsToHelp profileId={profileId} startedVolumes={volumes} />
                            </div>
                            <div className="order-3">
                                <Thanks profileId={profileId} />
                            </div>
                        </>
                    )}
                </div>
                <aside className="contents @3xl:flex @3xl:w-1/3 @3xl:shrink-0 @3xl:flex-col @3xl:gap-4">
                    <div className="order-1">
                        <GuideProgress volumes={volumes} isSignedIn={isSignedIn} />
                    </div>
                    {user?.profile && (
                        <div className="order-4">
                            <HelperAchievements heldAchievementIds={achievementIdsHeldBy(user.profile)} />
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}
