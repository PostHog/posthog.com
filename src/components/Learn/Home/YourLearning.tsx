import React from 'react'
import Panel from 'components/Docs/Panel'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { Progress } from 'components/UI/Progress'
import type { ColorName } from 'components/UI/colors'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../../context/App'
import { POCKET_GUIDE_VOLUMES, PocketGuideVolume, pocketGuideUrl } from '../../../constants/pocketGuides'
import { readChapterSlugs, ReadChapterSlugsByVolume } from '../../../lib/learnProgress'
import { learnChapterSlug, useBookPages } from '../PocketGuides/bookModel'
import { useReadChapterSlugs, useReadProgress } from '../PocketGuides/chapterProgress'

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
    const isSignedIn = Boolean(user?.profile?.id)
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
                </div>
                <aside className="contents @3xl:flex @3xl:w-1/3 @3xl:shrink-0 @3xl:flex-col @3xl:gap-4">
                    <div className="order-1">
                        <GuideProgress volumes={volumes} isSignedIn={isSignedIn} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
