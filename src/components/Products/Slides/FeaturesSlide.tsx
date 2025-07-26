import React, { useState } from 'react'
import Tabs from 'components/RadixUI/Tabs'
import ProductImage from './Image'
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
    images?: Array<{ src: string; alt: string; stylize: boolean; shadow: boolean }>
    imagesClasses?: string
    children?: React.ReactNode
}

interface FeaturesSlideProps {
    features: FeatureItem[]
}

export default function FeaturesSlide({ features }: FeaturesSlideProps) {
    const [currentTab, setCurrentTab] = useState(0)

    if (!features || features.length === 0) {
        return <div className="p-4">No features available</div>
    }

    return (
        <div className="h-full">
            <Tabs.Root
                className="flex w-full h-full items-start bg-accent text-primary"
                defaultValue={`tab-${currentTab}`}
                value={`tab-${currentTab}`}
                onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
                orientation="horizontal"
                size="lg"
            >
                <div data-scheme="secondary" className="w-64 h-full bg-primary">
                    <Tabs.List className="flex flex-col p-1 gap-0.5" aria-label="Features">
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
                </div>
                {features.map((item: FeatureItem, index: number) => (
                    <Tabs.Content
                        className="flex-1 bg-primary before:absolute before:inset-0 before:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/bg_replay_5775c24ad4.jpg')] before:bg-cover before:bg-center before:opacity-20 border-l border-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full relative"
                        key={index}
                        value={`tab-${index}`}
                    >
                        <div className="relative">
                            <div className={`${item.layout === 'columns' ? 'pt-4' : 'pt-12 px-4 pb-8'} pb-8`}>
                                <h2
                                    className={`text-5xl mb-0 ${
                                        item.layout === 'columns' ? 'text-left' : 'text-center'
                                    }`}
                                >
                                    {item.headline}
                                </h2>
                                {item.description && (
                                    <p
                                        className={`mt-4 text-xl [&_code]:text-xl ${
                                            item.layout === 'columns' ? 'text-left' : 'text-center'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                )}
                            </div>

                            {item.layout === 'columns' ? (
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
                                        {(item as any).children && <div className="p-4">{(item as any).children}</div>}
                                    </aside>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </div>
    )
}
