import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import { IconSparksJoy } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'
import { explorerGridColumns } from '../../constants'
import { explorerLayoutOptions } from '../../constants/explorerLayoutOptions'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useExplorerLayout } from '../../hooks/useExplorerLayout'
import { SparksJoyItems, useMenuSelectOptions } from '../../components/TaskBarMenu/menuData'
import { AppLink, AppIcon, AppIconName } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'

const VideoLibraryItems = {
    products: [
        {
            label: 'How PostHog uses Experiments',
            link: '#',
            iconName: 'hedgehog_mode' as AppIconName,
            customIcon: null,
        },
    ],
    changelog: [
        {
            label: 'Changelog 001',
            link: '#',
            iconName: 'photobooth' as AppIconName,
            customIcon: null,
        },
    ],
}

export default function VideoLibrary(): JSX.Element {
    const { isListLayout, setLayoutValue, currentLayout } = useExplorerLayout('grid')
    const selectOptions = useMenuSelectOptions()

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
                    {/* Products Section */}
                    <Accordion
                        skin={false}
                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                        items={[
                            {
                                value: 'products',
                                trigger: (
                                    <span className="bg-primary pr-2 relative z-10 select-none">
                                        Products (
                                        {
                                            VideoLibraryItems.products.filter(
                                                (item) => item.iconName || item.customIcon
                                            ).length
                                        }
                                        )
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
                                        {VideoLibraryItems.products
                                            .filter((item) => item.iconName || item.customIcon)
                                            .map((item) => (
                                                <ZoomHover
                                                    key={item.link}
                                                    className={
                                                        isListLayout ? 'w-full justify-start' : 'w-28 justify-center'
                                                    }
                                                >
                                                    <AppLink
                                                        label={item.label}
                                                        url={item.link}
                                                        Icon={
                                                            item.iconName ? (
                                                                <AppIcon name={item.iconName} />
                                                            ) : (
                                                                item.customIcon
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
                        defaultValue="games"
                    />

                    {/* Not games Section */}
                    <Accordion
                        skin={false}
                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                        items={[
                            {
                                value: 'changelog',
                                trigger: (
                                    <span className="bg-primary pr-2 relative z-10 select-none">
                                        Changelog (
                                        {
                                            VideoLibraryItems.changelog.filter(
                                                (item) => item.iconName || item.customIcon
                                            ).length
                                        }
                                        )
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
                                        {SparksJoyItems.notGames
                                            .filter((item) => item.iconName || item.customIcon)
                                            .map((item) => (
                                                <ZoomHover
                                                    key={item.link}
                                                    className={
                                                        isListLayout ? 'w-full justify-start' : 'w-28 justify-center'
                                                    }
                                                >
                                                    <AppLink
                                                        label={item.label}
                                                        url={item.link}
                                                        Icon={
                                                            item.iconName ? (
                                                                <AppIcon name={item.iconName} />
                                                            ) : (
                                                                item.customIcon
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
                        defaultValue="grab-bag"
                    />
                </div>
            </Explorer>
        </>
    )
}
