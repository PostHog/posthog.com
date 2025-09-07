import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import { IconDice, IconDictator } from 'components/OSIcons/Icons'
import { AppIcon } from 'components/OSIcons'
import { IconBookmarkSolid, IconDocument } from '@posthog/icons'
import { Accordion } from 'components/RadixUI/Accordion'
import { explorerGridColumns } from '../../constants'
import { explorerLayoutOptions } from '../../constants/explorerLayoutOptions'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useExplorerLayout } from '../../hooks/useExplorerLayout'

export default function SparkJoy(): JSX.Element {
    const { isListLayout, setLayoutValue, currentLayout } = useExplorerLayout('grid')

    return (
        <>
            <SEO
                title="Fun stuff - PostHog"
                description="Because we're not all work and no play"
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="spark-joy"
                title="Fun stuff"
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
                                            <IconDice className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">Fun stuff</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <p className="text-sm mb-0">Because we're not all work and no play.</p>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </>
                }
            >
                <div className="@container">
                    <div
                        className={`@md:pl-4 grid ${
                            isListLayout
                                ? '@lg:grid-cols-2 @3xl:grid-cols-3 gap-y-4'
                                : explorerGridColumns + ' gap-y-4 items-start justify-items-center'
                        } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center pt-4`}
                    >
                        <Link
                            to="/sparks-joy/hedgehog-mode"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <AppIcon name="hedgehog_mode" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Hedgehog mode</p>
                        </Link>
                        <Link
                            to="/sparks-joy/hog-wars"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <AppIcon name="hog_wars" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">HogWars</p>
                        </Link>
                        <Link
                            to="/sparks-joy/dictator-or-tech-bro"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary relative top-0`}
                        >
                            <IconDictator className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Dictator or tech bro?</p>
                        </Link>
                        <Link
                            to="/paint"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <AppIcon name="hogpaint" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">HogPaint</p>
                        </Link>
                        <Link
                            to="/photobooth"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <AppIcon name="photobooth" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Photobooth</p>
                        </Link>
                        <Link
                            to="/merch"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <AppIcon name="shoppingBag" className="!size-10 -mt-2" />
                            <p className="text-sm font-medium">Store</p>
                        </Link>
                        <Link
                            to="/bookmarks"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <IconBookmarkSolid className="!size-10 -mt-2 text-blue" />
                            <p className="text-sm font-medium">Bookmarks</p>
                        </Link>
                        <Link
                            to="/coloring-book.pdf"
                            state={{ newWindow: true }}
                            className={`${
                                isListLayout
                                    ? 'flex flex-row items-center space-x-3 w-full text-left'
                                    : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                            } text-primary hover:text-primary`}
                        >
                            <IconDocument className="!size-10 -mt-2 text-red" />
                            <p className="text-sm font-medium">Coloring book.pdf</p>
                        </Link>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
