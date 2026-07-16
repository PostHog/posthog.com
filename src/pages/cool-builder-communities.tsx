import React, { useEffect, useMemo, useState } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Select } from 'components/RadixUI/Select'
import Tooltip from 'components/RadixUI/Tooltip'
import { ZoomImage } from 'components/ZoomImage'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import CommunitiesMap from 'components/HogMap/CommunitiesMap'
import BuilderCommunityForm from 'components/BuilderCommunityForm'
import MobileDrawer from 'components/MobileDrawer'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'
import {
    BuilderCommunity,
    builderCommunities,
    communityStatusLabels,
    communityTypeLabels,
    CommunityStatus,
    CommunityType,
} from '../data/builderCommunities'

const statusDotColors: Record<CommunityStatus, string> = {
    active: 'bg-green',
    'inactive-seeking-support': 'bg-yellow',
    inactive: 'bg-red',
}

// Less active groups sink to the bottom of the list (they still show on the map)
const statusSortOrder: Record<CommunityStatus, number> = {
    active: 0,
    'inactive-seeking-support': 1,
    inactive: 2,
}

const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-block text-[11px] leading-tight border rounded px-1 py-0.5 ${className}`}>{children}</span>
)

const CommunityCard = ({
    children,
    onClose,
    title,
    isOpen,
}: {
    children: React.ReactNode
    onClose: () => void
    title: string
    isOpen: boolean
}) => {
    const { isMobile } = useApp()

    if (isMobile) {
        return (
            <MobileDrawer isOpen={isOpen} onClose={onClose} title={title}>
                {children}
            </MobileDrawer>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateX: '-50%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-50%' }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">{children}</ScrollArea>
        </motion.div>
    )
}

const AddACommunityWindow = () => {
    const { setWindowTitle, siteSettings } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        setWindowTitle(appWindow, 'Submit a community')
    }, [])

    return (
        <ScrollArea className="min-h-0 h-full [&>div>div]:h-full">
            <div
                data-scheme="secondary"
                className={`bg-primary text-primary ${
                    siteSettings.experience === 'boring' ? 'size-full' : 'min-h-full'
                }`}
            >
                <div className="p-4">
                    <BuilderCommunityForm />
                </div>
            </div>
        </ScrollArea>
    )
}

const CoolBuilderCommunitiesPage = () => {
    const { websiteMode, addWindow } = useApp()
    const [typeFilter, setTypeFilter] = useState<'all' | CommunityType>('all')
    const [selectedCommunity, setSelectedCommunity] = useState<BuilderCommunity | null>(null)

    const filteredCommunities = useMemo(
        () =>
            builderCommunities
                .filter((community) => typeFilter === 'all' || community.type === typeFilter)
                .sort((a, b) => statusSortOrder[a.status] - statusSortOrder[b.status]),
        [typeFilter]
    )

    const handleCommunityClick = (community: BuilderCommunity, updateUrl = true) => {
        setSelectedCommunity(community)

        if (updateUrl) {
            window.history.replaceState(null, '', `#communityId=${community.id}`)
        }
    }

    const handleMapCommunityClick = (id: number) => {
        const community = builderCommunities.find((c) => c.id === id)
        if (community) {
            handleCommunityClick(community)
        }
    }

    const handleCloseCommunity = () => {
        setSelectedCommunity(null)
        window.history.replaceState(null, '', window.location.pathname)
    }

    // Handle ESC key to close detail panel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedCommunity) {
                handleCloseCommunity()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedCommunity])

    // Initialize from URL hash on page load
    useEffect(() => {
        const match = window.location.hash.match(/#communityId=(\d+)/)
        if (match) {
            const community = builderCommunities.find((c) => c.id === parseInt(match[1], 10))
            if (community) {
                handleCommunityClick(community, false)
            }
        }
    }, [])

    const openAddACommunityWindow = () => {
        addWindow(
            <AddACommunityWindow
                newWindow
                location={{ pathname: `cool-builder-communities-add-a-community` }}
                key={`cool-builder-communities-add-a-community`}
            />
        )
    }

    return (
        <Explorer
            template="generic"
            slug="cool-builder-communities"
            title="Cool builder communities"
            fullScreen
            viewportClasses="[&>div>div]:h-full"
            showAddressBar={false}
        >
            <div
                data-scheme="primary"
                className={`flex flex-col @xl:flex-row text-primary ${websiteMode ? 'h-[calc(100vh-48px)]' : 'h-full'}`}
            >
                <aside
                    data-scheme="secondary"
                    className={`basis-3/5 @xl:basis-80 bg-primary @xl:border-r border-primary flex flex-col ${
                        websiteMode ? 'h-[calc(100vh-48px)]' : 'h-full'
                    }`}
                >
                    <div className="border-b border-primary px-4 pt-4 pb-4 space-y-3">
                        <p className="text-[13px] text-secondary m-0">
                            Builder groups, hacker houses, and builder collectives around the world. Find one near you,
                            or{' '}
                            <Link to="/community-incubator" state={{ newWindow: true }} className="underline">
                                start your own
                            </Link>
                            .
                        </p>
                        <OSButton variant="primary" width="full" size="md" onClick={openAddACommunityWindow}>
                            Submit a community
                        </OSButton>
                        <Select
                            value={typeFilter}
                            onValueChange={(value) => setTypeFilter(value as 'all' | CommunityType)}
                            ariaLabel="Filter by type"
                            className="w-full"
                            groups={[
                                {
                                    label: 'Type',
                                    items: [
                                        { value: 'all', label: 'All types' },
                                        ...Object.entries(communityTypeLabels).map(([value, label]) => ({
                                            value,
                                            label: `${label}s`,
                                        })),
                                    ],
                                },
                            ]}
                        />
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-4 h-96 @xl:h-full">
                            <div className="space-y-3">
                                {filteredCommunities.length === 0 && (
                                    <p className="text-[13px] text-secondary m-0">
                                        No communities match this filter (yet). Know one that should be here?
                                    </p>
                                )}
                                {filteredCommunities.map((community) => (
                                    <OSButton
                                        data-scheme="primary"
                                        key={community.id}
                                        onClick={() => handleCommunityClick(community)}
                                        align="left"
                                        width="full"
                                        zoomHover="md"
                                        className={`bg-primary border border-primary active:bg-primary ${
                                            selectedCommunity?.id === community.id
                                                ? 'border-primary outline outline-orange outline-2 outline-offset-1'
                                                : 'border-primary'
                                        }`}
                                    >
                                        <div className="w-full">
                                            {community.logo && (
                                                <div className="float-right ml-2 max-w-20">
                                                    <img
                                                        src={community.logo}
                                                        alt={`${community.name} logo`}
                                                        className="w-20 max-h-20 object-contain rounded"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5">
                                                <Tooltip
                                                    trigger={
                                                        <span
                                                            className={`block size-2 shrink-0 rounded-full ${
                                                                statusDotColors[community.status]
                                                            }`}
                                                        />
                                                    }
                                                    delay={0}
                                                >
                                                    {communityStatusLabels[community.status]}
                                                </Tooltip>
                                                <span className="font-semibold text-sm line-clamp-2">
                                                    {community.name}
                                                </span>
                                            </div>
                                            <div className="text-[13px] text-secondary">{community.location.label}</div>
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                <Badge className="border-primary text-secondary">
                                                    {communityTypeLabels[community.type]}
                                                </Badge>
                                                {community.posthogIncubator && (
                                                    <Badge className="border-orange text-orange">
                                                        PostHog incubator
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </OSButton>
                                ))}
                                <div className="pt-2 text-center">
                                    <img
                                        src="/images/coworking-hogs.png"
                                        alt="Hedgehogs coworking on laptops"
                                        className="max-w-48 mx-auto"
                                    />
                                    <p className="text-[13px] text-secondary m-0 mt-1">
                                        Your builder community could be here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </aside>

                <div className="flex-1 relative border-primary border-t @xl:border-t-0">
                    <AnimatePresence>
                        {selectedCommunity && (
                            <CommunityCard
                                isOpen={!!selectedCommunity}
                                title={selectedCommunity.name}
                                onClose={handleCloseCommunity}
                            >
                                <div className="p-4">
                                    {selectedCommunity.logo && (
                                        <img
                                            src={selectedCommunity.logo}
                                            alt={`${selectedCommunity.name} logo`}
                                            className="max-h-24 object-contain rounded mb-3"
                                        />
                                    )}
                                    <h2 className="text-xl font-bold mb-1 pr-12 @3xl:block hidden">
                                        {selectedCommunity.name}
                                    </h2>
                                    <div className="mb-2 flex flex-wrap gap-1">
                                        <Badge className="border-primary text-secondary">
                                            {communityTypeLabels[selectedCommunity.type]}
                                        </Badge>
                                        <Badge className="border-primary text-secondary">
                                            {communityStatusLabels[selectedCommunity.status]}
                                        </Badge>
                                        {selectedCommunity.posthogIncubator && (
                                            <Badge className="border-orange text-orange">PostHog incubator</Badge>
                                        )}
                                    </div>

                                    <div className="space-y-3 text-sm mb-4">
                                        {selectedCommunity.status === 'inactive-seeking-support' && (
                                            <div
                                                data-scheme="secondary"
                                                className="border border-primary bg-primary rounded p-2"
                                            >
                                                <div className="text-secondary text-[13px]">
                                                    This group is looking for new organizers. Want to help bring it
                                                    back? Use the "Submit a community" button to get in touch.
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="text-secondary text-[13px] mb-1">Location</div>
                                            <div>{selectedCommunity.location.label}</div>
                                        </div>

                                        {selectedCommunity.organizers && selectedCommunity.organizers.length > 0 && (
                                            <div>
                                                <div className="text-secondary text-[13px] mb-1">
                                                    Organizer{selectedCommunity.organizers.length > 1 ? 's' : ''}
                                                </div>
                                                <div className="flex flex-wrap gap-x-2 gap-y-1">
                                                    {selectedCommunity.organizers.map((organizer, i) =>
                                                        organizer.url ? (
                                                            <a
                                                                key={i}
                                                                href={organizer.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-orange hover:underline"
                                                            >
                                                                {organizer.name}
                                                            </a>
                                                        ) : (
                                                            <span key={i}>{organizer.name}</span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedCommunity.nextSession &&
                                            (selectedCommunity.nextSession.date ||
                                                selectedCommunity.nextSession.url) && (
                                                <div>
                                                    <div className="text-secondary text-[13px] mb-1">Next session</div>
                                                    {selectedCommunity.nextSession.date && (
                                                        <div>
                                                            {dayjs(selectedCommunity.nextSession.date).format(
                                                                'MMMM D, YYYY'
                                                            )}
                                                        </div>
                                                    )}
                                                    {selectedCommunity.nextSession.url && (
                                                        <a
                                                            href={selectedCommunity.nextSession.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-orange hover:underline"
                                                        >
                                                            View upcoming sessions →
                                                        </a>
                                                    )}
                                                </div>
                                            )}

                                        {selectedCommunity.photos && selectedCommunity.photos.length > 0 && (
                                            <div>
                                                <div className="text-secondary text-[13px] mb-1">Photos</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {selectedCommunity.photos.map((photo, i) => (
                                                        <ZoomImage key={i}>
                                                            <img
                                                                src={photo}
                                                                alt={`${selectedCommunity.name} photo ${i + 1}`}
                                                                className="w-full h-32 object-cover rounded"
                                                            />
                                                        </ZoomImage>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {selectedCommunity.posthogIncubator && (
                                            <div>
                                                <div className="text-secondary text-[13px] mb-1">
                                                    PostHog community incubator
                                                </div>
                                                <div className="text-sm leading-relaxed">
                                                    This group is part of the{' '}
                                                    <Link
                                                        to="/community-incubator"
                                                        state={{ newWindow: true }}
                                                        className="underline"
                                                    >
                                                        PostHog community incubator
                                                    </Link>{' '}
                                                    — a program that helps people start local builder communities.
                                                </div>
                                            </div>
                                        )}

                                        {selectedCommunity.url && (
                                            <div>
                                                <OSButton
                                                    asLink
                                                    to={selectedCommunity.url}
                                                    variant="primary"
                                                    width="full"
                                                    size="md"
                                                    external
                                                >
                                                    Visit website
                                                </OSButton>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CommunityCard>
                        )}
                    </AnimatePresence>

                    <CommunitiesMap
                        communities={filteredCommunities}
                        onCommunityClick={handleMapCommunityClick}
                        selectedCommunityId={selectedCommunity?.id || null}
                    />
                </div>
            </div>
        </Explorer>
    )
}

export default function CoolBuilderCommunities() {
    return (
        <>
            <SEO
                title="Cool builder communities - PostHog"
                description="A directory of builder groups, hacker houses, and builder collectives around the world"
                image={`/images/og/default.png`}
            />
            <CoolBuilderCommunitiesPage />
        </>
    )
}
