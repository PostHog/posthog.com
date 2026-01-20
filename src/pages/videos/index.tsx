import React, { useMemo } from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import { IconSparksJoy } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'
import { explorerGridColumns } from '../../constants'
import { explorerLayoutOptions } from '../../constants/explorerLayoutOptions'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useExplorerLayout } from '../../hooks/useExplorerLayout'
import { useMenuSelectOptions } from '../../components/TaskBarMenu/menuData'
import { AppLink, AppIcon, AppIconName } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'
import { Video } from '../../data/videos'
import { useVideos } from '../../hooks/useVideos'

// Map video source to icon name
const getIconForVideo = (video: Video): AppIconName => {
    // You can customize this based on video properties
    if (video.folder === 'changelog') {
        return 'photobooth'
    }
    if (video.tags?.includes('experiments')) {
        return 'hedgehog_mode'
    }
    if (video.tags?.includes('feature flags')) {
        return 'hedgehog_mode'
    }
    if (video.tags?.includes('demo')) {
        return 'video'
    }
    return 'video'
}

export default function VideoLibrary(): JSX.Element {
    const { isListLayout, setLayoutValue, currentLayout } = useExplorerLayout('grid')
    const selectOptions = useMenuSelectOptions()
    const videos = useVideos()

    // Group videos by folder
    const videosByFolder = useMemo(() => {
        const grouped: Record<string, Video[]> = {}
        if (Array.isArray(videos)) {
            videos.forEach((video) => {
                if (!grouped[video.folder]) {
                    grouped[video.folder] = []
                }
                grouped[video.folder].push(video)
            })
        }
        return grouped
    }, [videos])

    return (
        <>
            <SEO title="Video library - PostHog" description="PostHog on film" image={`/images/og/default.png`} />
            <Explorer
                template="generic"
                slug="videos"
                // title="Sparks joy"
                selectOptions={selectOptions}
                selectedCategory="videos"
                rightActionButtons={
                    <ToggleGroup
                        title="Layout"
                        hideTitle={true}
                        options={explorerLayoutOptions}
                        onValueChange={setLayoutValue}
                        value={currentLayout}
                        className="-my-1 ml-2"
                    />
                }
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                leftSidebarContent={
                    <>
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconSparksJoy className={`size-5 inline-block`} />
                                            <span className="flex-1">Why?</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <p className="text-sm mb-0">
                                                It's a reference to a book by Marie Kondo and is part of the{' '}
                                                <Link to="/handbook/company/lore" state={{ newWindow: true }}>
                                                    lore of PostHog
                                                </Link>
                                                .
                                            </p>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </>
                }
            >
                <div className="@container not-prose space-y-2 @md:-ml-3">
                    {/* Dynamically generated sections for each folder */}
                    {Object.entries(videosByFolder).map(([folder, folderVideos], index) => (
                        <Accordion
                            key={folder}
                            skin={false}
                            triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                            items={[
                                {
                                    value: folder,
                                    trigger: (
                                        <span className="bg-primary pr-2 relative z-10 select-none">
                                            {folder.charAt(0).toUpperCase() + folder.slice(1)} ({folderVideos.length})
                                        </span>
                                    ),
                                    content: (
                                        <div
                                            className={`@md:pl-4 grid ${
                                                isListLayout
                                                    ? '@lg:grid-cols-2 @3xl:grid-cols-3'
                                                    : explorerGridColumns + ' gap-y-4 items-start justify-items-center'
                                            } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                        >
                                            {folderVideos.map((video) => (
                                                <ZoomHover
                                                    key={`${video.source}-${video.videoId}`}
                                                    className={
                                                        isListLayout ? 'w-full justify-start' : 'w-28 justify-center'
                                                    }
                                                >
                                                    <AppLink
                                                        label={video.title}
                                                        url={`/videos/play?source=${video.source}&videoId=${video.videoId}`}
                                                        Icon={
                                                            video.thumbnail ? (
                                                                <img
                                                                    src={video.thumbnail}
                                                                    alt={video.title}
                                                                    className="w-full h-full object-cover rounded"
                                                                />
                                                            ) : (
                                                                <AppIcon name={getIconForVideo(video)} />
                                                            )
                                                        }
                                                        background="bg-primary"
                                                        className="size-12"
                                                        orientation={isListLayout ? 'row' : 'column'}
                                                    />
                                                </ZoomHover>
                                            ))}
                                        </div>
                                    ),
                                },
                            ]}
                            defaultValue={index === 0 ? folder : undefined}
                        />
                    ))}
                </div>
            </Explorer>
        </>
    )
}
