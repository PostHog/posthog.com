import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import { explorerGridColumns } from '../../constants'
import { SparksJoyItems } from '../../components/TaskBarMenu/menuData'
import { AppLink, AppIcon } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/shared/animation/ZoomHover'

export default function SparkJoy(): JSX.Element {
    return (
        <>
            <SEO
                title="Sparks joy - PostHog"
                description="Because we're not all work and no play"
                image={`/images/og/default.png`}
            />
            <ReaderView
                className="border-t border-primary"
                hideAppOptions
                hideRightSidebar
                hideLeftSidebar
                showQuestions={false}
            >
                <div className="@container not-prose space-y-2">
                    {/* Games Section */}
                    <Accordion
                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:gap-2 [&>span]:after:h-0.5 [&>span]:after:flex-1 [&>span]:after:bg-border [&>span]:after:content-['']"
                        items={[
                            {
                                value: 'games',
                                trigger: (
                                    <span>
                                        Games (
                                        {SparksJoyItems.games.filter((item) => item.iconName || item.customIcon).length}
                                        )
                                    </span>
                                ),
                                content: (
                                    <div
                                        className={`@md:pl-4 grid ${explorerGridColumns} gap-y-4 items-start justify-items-center gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                    >
                                        {SparksJoyItems.games
                                            .filter((item) => item.iconName || item.customIcon)
                                            .map((item) => (
                                                <ZoomHover key={item.link} className="w-28 justify-center">
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
                                                        className="size-12"
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
                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:gap-2 [&>span]:after:h-0.5 [&>span]:after:flex-1 [&>span]:after:bg-border [&>span]:after:content-['']"
                        items={[
                            {
                                value: 'grab-bag',
                                trigger: (
                                    <span>
                                        Grab bag (
                                        {
                                            SparksJoyItems.notGames.filter((item) => item.iconName || item.customIcon)
                                                .length
                                        }
                                        )
                                    </span>
                                ),
                                content: (
                                    <div
                                        className={`@md:pl-4 grid ${explorerGridColumns} gap-y-4 items-start justify-items-center gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                    >
                                        {SparksJoyItems.notGames
                                            .filter((item) => item.iconName || item.customIcon)
                                            .map((item) => (
                                                <ZoomHover key={item.link} className="w-28 justify-center">
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
                                                        className="size-12"
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
            </ReaderView>
        </>
    )
}
