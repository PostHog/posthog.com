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
import { SparksJoyItems } from '../../components/TaskBarMenu/menuData'

export default function SparkJoy(): JSX.Element {
    const { isListLayout, setLayoutValue, currentLayout } = useExplorerLayout('grid')

    return (
        <>
            <SEO
                title="Sparks joy - PostHog"
                description="Because we're not all work and no play"
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="spark-joy"
                // title="Sparks joy"
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
                <div className="@container">
                    <div
                        className={`@md:pl-4 grid ${
                            isListLayout
                                ? '@lg:grid-cols-2 @3xl:grid-cols-3 gap-y-4'
                                : explorerGridColumns + ' gap-y-4 items-start justify-items-center'
                        } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center pt-4`}
                    >
                        {SparksJoyItems.filter((item) => item.icon).map((item) => (
                            <Link
                                key={item.link}
                                to={item.link}
                                state={{ newWindow: true }}
                                className={`${
                                    isListLayout
                                        ? 'flex flex-row items-center space-x-3 w-full text-left'
                                        : 'flex flex-col justify-center items-center space-y-1 w-28 text-center'
                                } text-primary hover:text-primary !no-underline`}
                            >
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Explorer>
        </>
    )
}
