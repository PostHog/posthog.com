import React, { useState } from 'react'
import Tabs from 'components/RadixUI/Tabs'
import ProductImage, { Image } from './Image'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface Feature {
    title: string
    description: string
}

interface FeatureItem {
    layout?: string
    title: string
    headline: string
    description?: string
    icon?: any
    color?: string
    features?: Feature[]
    skills?: Array<{ name: string; description?: string; sticker?: React.ReactNode; percent?: number } | string>
    images?: Image[]
    imagesClasses?: string
    children?: React.ReactNode
}

interface FeaturesSlideProps {
    features: FeatureItem[]
    backgroundImage?: {
        url: string
        opacity?: number
        position?: string
        size?: string
    }
}

export default function FeaturesSlide({ features, backgroundImage }: FeaturesSlideProps) {
    const [currentTab, setCurrentTab] = useState(0)

    if (!features || features.length === 0) {
        return <div className="p-4">No features available</div>
    }

    return (
        <div className="h-full">
            <Tabs.Root
                className="h-full bg-accent text-primary @2xl:flex-row"
                defaultValue={`tab-${currentTab}`}
                value={`tab-${currentTab}`}
                onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
                orientation="horizontal"
                size="lg"
            >
                <div
                    data-scheme="secondary"
                    className="w-full @2xl:w-64 @2xl:h-full bg-primary border-b border-primary @2xl:border-b-0"
                >
                    <ScrollArea className="overflow-y-hidden @2xl:overflow-y-auto">
                        <Tabs.List className="flex @2xl:flex-col" aria-label="Features">
                            {features.map((item: FeatureItem, index: number) => (
                                <Tabs.Trigger
                                    key={index}
                                    value={`tab-${index}`}
                                    icon={(item as any).icon}
                                    color={(item as any).color}
                                    className="text-left"
                                >
                                    {item.title}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </ScrollArea>
                </div>
                {features.map((item: FeatureItem, index: number) => {
                    // AI Layout - completely different structure
                    if (item.layout === 'ai') {
                        return (
                            <Tabs.Content
                                className="flex-1 bg-primary @2xl:border-l border-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full relative [&_a]:underline [&_a]:font-semibold overflow-auto"
                                key={index}
                                value={`tab-${index}`}
                            >
                                {backgroundImage && (
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <img
                                            src={backgroundImage.url}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            style={{
                                                opacity: backgroundImage.opacity || 0.2,
                                                objectPosition: backgroundImage.position || 'center',
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="relative">
                                    <div className="flex flex-col @2xl:flex-row">
                                        <div className="pt-12 px-4 pb-8 flex-1">
                                            <h2 className="text-5xl mb-0 text-left">{item.headline}</h2>
                                            {item.description && (
                                                <p
                                                    className="mt-4 text-xl [&_code]:text-xl text-left"
                                                    {...(typeof item.description === 'string'
                                                        ? { dangerouslySetInnerHTML: { __html: item.description } }
                                                        : { children: item.description })}
                                                />
                                            )}
                                        </div>
                                        {item.images && item.images.length > 0 && (
                                            <aside>
                                                <div className="max-w-md mx-auto @2xl:ml-4 mb-4">
                                                    <ProductImage images={item.images} />
                                                </div>
                                            </aside>
                                        )}
                                    </div>

                                    <div className="px-4">
                                        {/* Features section */}
                                        {item.features && item.features.length > 0 && (
                                            <div className="mb-6">
                                                {item.features.map((feature: Feature, featureIndex: number) => (
                                                    <div key={featureIndex} className="mb-6">
                                                        <h3 className="text-2xl mb-1">{feature.title}</h3>
                                                        <p className="text-lg">{feature.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Skills section */}
                                        {item.skills && item.skills.length > 0 && (
                                            <div className="mt-6">
                                                <h3 className="text-2xl mb-4">Skills</h3>
                                                <div className="grid @2xl:grid-cols-2 gap-x-8 gap-y-4">
                                                    {item.skills.map((skill: any, skillIndex: number) => {
                                                        if (typeof skill === 'string') {
                                                            return (
                                                                <div key={skillIndex} className="text-xl">
                                                                    {skill}
                                                                </div>
                                                            )
                                                        }
                                                        return (
                                                            <div key={skillIndex}>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    {skill.sticker && (
                                                                        <div className="shrink-0">{skill.sticker}</div>
                                                                    )}
                                                                    <div className="text-lg font-medium">
                                                                        {skill.name}
                                                                    </div>
                                                                </div>
                                                                {skill.description && (
                                                                    <p className="text-base text-secondary mb-2">
                                                                        {skill.description}
                                                                    </p>
                                                                )}
                                                                {skill.percent !== undefined && (
                                                                    <div className="w-full h-2 bg-input rounded-full">
                                                                        <div
                                                                            className="h-2 rounded-full bg-red dark:bg-yellow"
                                                                            style={{ width: `${skill.percent}%` }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {(item as any).children && <div className="mt-8">{(item as any).children}</div>}
                                    </div>
                                </div>
                            </Tabs.Content>
                        )
                    }

                    // Columns Layout
                    if (item.layout === 'columns') {
                        return (
                            <Tabs.Content
                                className="flex-1 bg-primary @2xl:border-l border-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full relative [&_a]:underline [&_a]:font-semibold"
                                key={index}
                                value={`tab-${index}`}
                            >
                                {backgroundImage && (
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <img
                                            src={backgroundImage.url}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            style={{
                                                opacity: backgroundImage.opacity || 0.2,
                                                objectPosition: backgroundImage.position || 'center',
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="relative">
                                    <div className="pt-4 pb-8">
                                        <h2 className="text-5xl mb-0 text-left">{item.headline}</h2>
                                        {item.description && (
                                            <p
                                                className="mt-4 text-xl [&_code]:text-xl text-left"
                                                {...(typeof item.description === 'string'
                                                    ? { dangerouslySetInnerHTML: { __html: item.description } }
                                                    : { children: item.description })}
                                            />
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        <div>
                                            <ScrollArea className="h-full">
                                                {item.features &&
                                                    item.features.map((feature: Feature, featureIndex: number) => (
                                                        <div key={featureIndex}>
                                                            <h3 className="text-2xl mb-1">{feature.title}</h3>
                                                            <p className="text-lg">{feature.description}</p>
                                                        </div>
                                                    ))}
                                            </ScrollArea>
                                        </div>
                                        <aside className={item.imagesClasses || ''}>
                                            {item.images && item.images.length > 0 && (
                                                <div className="max-w-3xl mx-auto">
                                                    <ProductImage images={item.images} />
                                                </div>
                                            )}
                                            {(item as any).children && (
                                                <div className="p-4">{(item as any).children}</div>
                                            )}
                                        </aside>
                                    </div>
                                </div>
                            </Tabs.Content>
                        )
                    }

                    // Default Grid Layout
                    return (
                        <Tabs.Content
                            className="flex-1 bg-primary @2xl:border-l border-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full relative [&_a]:underline [&_a]:font-semibold"
                            key={index}
                            value={`tab-${index}`}
                        >
                            {backgroundImage && (
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <img
                                        src={backgroundImage.url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        style={{
                                            opacity: backgroundImage.opacity || 0.2,
                                            objectPosition: backgroundImage.position || 'center',
                                        }}
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <div className="pt-12 px-4 pb-8">
                                    <h2 className="text-5xl mb-0 text-center">{item.headline}</h2>
                                    {item.description && (
                                        <p
                                            className="mt-4 text-xl [&_code]:text-xl text-center"
                                            {...(typeof item.description === 'string'
                                                ? { dangerouslySetInnerHTML: { __html: item.description } }
                                                : { children: item.description })}
                                        />
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 px-4">
                                    {item.features &&
                                        item.features.map((feature: Feature, featureIndex: number) => (
                                            <div key={featureIndex}>
                                                <h3 className="text-2xl mb-1">{feature.title}</h3>
                                                <p className="text-lg">{feature.description}</p>
                                            </div>
                                        ))}
                                </div>
                                {item.images && item.images.length > 0 && (
                                    <div className="max-w-3xl mx-auto">
                                        <ProductImage images={item.images} />
                                    </div>
                                )}
                                {(item as any).children && <div className="p-4">{(item as any).children}</div>}
                            </div>
                        </Tabs.Content>
                    )
                })}
            </Tabs.Root>
        </div>
    )
}
