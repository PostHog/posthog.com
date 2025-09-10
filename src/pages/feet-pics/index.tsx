import React from 'react'
import Explorer from 'components/Explorer'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { AppLink } from 'components/OSIcons/AppIcon'
import { explorerGridColumns } from '../../constants'
import { explorerLayoutOptions } from '../../constants/explorerLayoutOptions'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useExplorerLayout } from '../../hooks/useExplorerLayout'
import { useMenuSelectOptions } from 'components/TaskBarMenu/menuData'

export default function FeetPics(): JSX.Element {
    const { isListLayout, setLayoutValue, currentLayout } = useExplorerLayout('grid')
    const selectOptions = useMenuSelectOptions()

    return (
        <>
            <SEO
                title="Feet pics - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="feet-pics"
                title="Feet Pics"
                showTitle={false}
                selectOptions={selectOptions}
                selectedCategory="trash"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"

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
                leftSidebarContent={[
                    {
                        title: 'Feet pics',
                        content: (
                            <>
                                <p className="text-sm mb-0">
                                    PostHog, the only Silicon Valley-backed SaaS company that gives you free feet pics.
                                </p>
                            </>
                        ),
                    },
                    {
                        title: 'Legal notice',
                        content: (
                            <>
                                <p className="text-sm mb-0">
                                    &copy; 2025 PostHog, Inc. Do not redistribute without permission. Each image is
                                    protected with an invisible watermark. Violators will be prosecuted to the fullest
                                    extent of the law.
                                </p>
                            </>
                        ),
                    },
                ]}
            >
                <div
                    className={`@md:pl-4 grid ${
                        isListLayout
                            ? '@lg:grid-cols-2 @3xl:grid-cols-3 gap-y-4'
                            : explorerGridColumns + ' gap-y-4 items-start justify-items-center'
                    } gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                >
                    <AppLink
                        label="employee #30200.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/feet_closeup_tulum_f6092da65d.jpg"
                                alt="employee #30200.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        background="bg-primary"
                        className={`size-24`}
                        orientation={isListLayout ? 'row' : 'column'}
                    ></AppLink>

                    <AppLink
                        label="employee #30174.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/feet_closeup_mykonos_bd4fe1a4dc.jpg"
                                alt="employee #30174.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        background="bg-primary"
                        className={`size-24`}
                        orientation={isListLayout ? 'row' : 'column'}
                    ></AppLink>

                    <AppLink
                        label="plenty of feet.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/plenty_of_feet_49ae3ecedc.jpg"
                                alt="plenty of feet.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        background="bg-primary"
                        className={`size-24`}
                        orientation={isListLayout ? 'row' : 'column'}
                    ></AppLink>

                    <AppLink
                        label="questionable decisions.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/20220401_224015_ef582b00c1.jpg"
                                alt="questionable decisions.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        background="bg-primary"
                        className={`size-24`}
                        orientation={isListLayout ? 'row' : 'column'}
                    ></AppLink>

                    <AppLink
                        label="lobster toes.png"
                        url="#"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/image_8_b6c1a80c8d.png"
                                alt="lobster toes.png"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        background="bg-primary"
                        className={`size-24`}
                        orientation={isListLayout ? 'row' : 'column'}
                    ></AppLink>
                </div>
            </Explorer>
        </>
    )
}
