import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconDictator, IconBrush } from 'components/OSIcons/Icons'
import { AppIcon } from 'components/OSIcons'
import { IconPencil, IconUser, IconArrowRight, IconInfo, IconSearch } from '@posthog/icons'
import { Accordion } from 'components/RadixUI/Accordion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'

export default function Components(): JSX.Element {
    return (
        <>
            <SEO
                title="Components - PostHog"
                description="Components for PostHog"
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="components"
                title="Components"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                // accentImage={
                //     <CloudinaryImage
                //         src="https://res.cloudinary.com/dmukukwp6/image/upload/party_mode_34c15751e4.png"
                //         alt="Screenshot of hedgehog mode's party mode"
                //         className="w-full"
                //         placeholder="none"
                //     />
                // }
            >
                <div className="@container">
                    <div className="space-y-12">
                        {/* OSButton Component Showcase */}
                        <section>
                            <h2 className="">
                                <code>&lt;OSButton /&gt;</code>
                            </h2>

                            {/* Common Usage */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Common usage</h3>
                                <div className="flex items-center gap-px flex-wrap">
                                    <OSButton variant="ghost" size="sm" icon={<IconSearch />}></OSButton>
                                    <OSButton variant="ghost" size="md" icon={<IconSearch />}></OSButton>
                                    <OSButton variant="primary">Get started – free</OSButton>
                                    <OSButton variant="secondary">Get started – free</OSButton>
                                </div>
                            </div>

                            {/* Variants with All Sizes */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Variants with all sizes</h3>
                                <ScrollArea className="h-96">
                                    <table className="w-full border-collapse border border-input">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-input px-4 py-2 text-left">Variant</th>
                                                <th className="border border-input px-4 py-2 text-left">Description</th>
                                                <th className="border border-input px-4 py-2 text-left">XS</th>
                                                <th className="border border-input px-4 py-2 text-left">SM</th>
                                                <th className="border border-input px-4 py-2 text-left">MD</th>
                                                <th className="border border-input px-4 py-2 text-left">LG</th>
                                                <th className="border border-input px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">default</td>
                                                <td className="border border-input px-4 py-2">
                                                    Black background with white text, standard button appearance
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs">Button</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm">Button</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md">Button</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg">Button</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl">Button</OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">primary</td>
                                                <td className="border border-input px-4 py-2">
                                                    Orange background with black text, primary action button
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="primary" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="primary" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="primary" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="primary" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="primary" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">secondary</td>
                                                <td className="border border-input px-4 py-2">
                                                    White background with primary text, secondary action button
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="secondary" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="secondary" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="secondary" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="secondary" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="secondary" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">underline</td>
                                                <td className="border border-input px-4 py-2">
                                                    Transparent background with underline on hover
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="underline" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="underline" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="underline" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="underline" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="underline" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">ghost</td>
                                                <td className="border border-input px-4 py-2">
                                                    Transparent background with subtle hover effects
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ScrollArea>
                            </div>

                            {/* Icon-Only Buttons */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Icon-only buttons</h3>
                                <ScrollArea className="h-96">
                                    <table className="w-full border-collapse border border-input">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-input px-4 py-2 text-left">Variant</th>
                                                <th className="border border-input px-4 py-2 text-left">Description</th>
                                                <th className="border border-input px-4 py-2 text-left">XS</th>
                                                <th className="border border-input px-4 py-2 text-left">SM</th>
                                                <th className="border border-input px-4 py-2 text-left">MD</th>
                                                <th className="border border-input px-4 py-2 text-left">LG</th>
                                                <th className="border border-input px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">default</td>
                                                <td className="border border-input px-4 py-2">
                                                    Icon-only button with default styling
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" icon={<IconSearch />}></OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">primary</td>
                                                <td className="border border-input px-4 py-2">
                                                    Icon-only button with primary styling
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="xs"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="sm"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="md"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="lg"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="xl"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">secondary</td>
                                                <td className="border border-input px-4 py-2">
                                                    Icon-only button with secondary styling
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="xs"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="sm"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="md"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="lg"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="xl"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">ghost</td>
                                                <td className="border border-input px-4 py-2">
                                                    Icon-only button with ghost styling
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="ghost"
                                                        size="xs"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="ghost"
                                                        size="sm"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="ghost"
                                                        size="md"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="ghost"
                                                        size="lg"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton
                                                        variant="ghost"
                                                        size="xl"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ScrollArea>
                            </div>

                            {/* States with All Sizes */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">States with all sizes</h3>
                                <ScrollArea className="h-96">
                                    <table className="w-full border-collapse border border-input">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-input px-4 py-2 text-left">State</th>
                                                <th className="border border-input px-4 py-2 text-left">Description</th>
                                                <th className="border border-input px-4 py-2 text-left">XS</th>
                                                <th className="border border-input px-4 py-2 text-left">SM</th>
                                                <th className="border border-input px-4 py-2 text-left">MD</th>
                                                <th className="border border-input px-4 py-2 text-left">LG</th>
                                                <th className="border border-input px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">normal</td>
                                                <td className="border border-input px-4 py-2">
                                                    Normal interactive state
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs">Normal</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm">Normal</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md">Normal</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg">Normal</OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl">Normal</OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">disabled</td>
                                                <td className="border border-input px-4 py-2">
                                                    Disabled state with reduced opacity and no interactions
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">
                                                    active (ghost)
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    Active state (for ghost variant)
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="xs" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="sm" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="md" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="lg" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton variant="ghost" size="xl" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ScrollArea>
                            </div>

                            {/* Features with All Sizes */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Features with all sizes</h3>
                                <ScrollArea className="h-96">
                                    <table className="w-full border-collapse border border-input">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-input px-4 py-2 text-left">Feature</th>
                                                <th className="border border-input px-4 py-2 text-left">Description</th>
                                                <th className="border border-input px-4 py-2 text-left">XS</th>
                                                <th className="border border-input px-4 py-2 text-left">SM</th>
                                                <th className="border border-input px-4 py-2 text-left">MD</th>
                                                <th className="border border-input px-4 py-2 text-left">LG</th>
                                                <th className="border border-input px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">icon (left)</td>
                                                <td className="border border-input px-4 py-2">
                                                    Icon positioned to the left of text
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">
                                                    icon (right)
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    Icon positioned to the right of text
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">label</td>
                                                <td className="border border-input px-4 py-2">
                                                    Additional label text with reduced opacity
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">tooltip</td>
                                                <td className="border border-input px-4 py-2">
                                                    Info icon with tooltip on hover
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">zoomHover</td>
                                                <td className="border border-input px-4 py-2">Zoom effect on hover</td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xs" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="sm" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="md" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="lg" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <OSButton size="xl" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ScrollArea>
                            </div>

                            {/* Full Width Examples */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Full width examples</h3>
                                <ScrollArea className="h-96">
                                    <table className="w-full border-collapse border border-input">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-input px-4 py-2 text-left">Variant</th>
                                                <th className="border border-input px-4 py-2 text-left">XS</th>
                                                <th className="border border-input px-4 py-2 text-left">SM</th>
                                                <th className="border border-input px-4 py-2 text-left">MD</th>
                                                <th className="border border-input px-4 py-2 text-left">LG</th>
                                                <th className="border border-input px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">default</td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="xs" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="sm" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="md" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="lg" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="xl" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">primary</td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="xs" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="sm" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="md" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="lg" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="xl" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-input px-4 py-2 font-mono">secondary</td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="xs" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="sm" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="md" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="lg" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-input px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="xl" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ScrollArea>
                            </div>

                            {/* Complex Examples with All Sizes */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Complex examples with all sizes</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="border border-input p-4 rounded">
                                        <h4 className="font-semibold mb-4">Primary with icon & label</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-mono">XS:</span>{' '}
                                                <OSButton variant="primary" size="xs" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">SM:</span>{' '}
                                                <OSButton variant="primary" size="sm" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">MD:</span>{' '}
                                                <OSButton variant="primary" size="md" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">LG:</span>{' '}
                                                <OSButton variant="primary" size="lg" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">XL:</span>{' '}
                                                <OSButton variant="primary" size="xl" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-input p-4 rounded">
                                        <h4 className="font-semibold mb-4">Secondary with right icon</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-mono">XS:</span>{' '}
                                                <OSButton
                                                    variant="secondary"
                                                    size="xs"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                >
                                                    Next
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">SM:</span>{' '}
                                                <OSButton
                                                    variant="secondary"
                                                    size="sm"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                >
                                                    Next
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">MD:</span>{' '}
                                                <OSButton
                                                    variant="secondary"
                                                    size="md"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                >
                                                    Next
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">LG:</span>{' '}
                                                <OSButton
                                                    variant="secondary"
                                                    size="lg"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                >
                                                    Next
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">XL:</span>{' '}
                                                <OSButton
                                                    variant="secondary"
                                                    size="xl"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                >
                                                    Next
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-input p-4 rounded">
                                        <h4 className="font-semibold mb-4">Ghost with tooltip</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-mono">XS:</span>{' '}
                                                <OSButton
                                                    variant="ghost"
                                                    size="xs"
                                                    tooltip="This action cannot be undone"
                                                >
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">SM:</span>{' '}
                                                <OSButton
                                                    variant="ghost"
                                                    size="sm"
                                                    tooltip="This action cannot be undone"
                                                >
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">MD:</span>{' '}
                                                <OSButton
                                                    variant="ghost"
                                                    size="md"
                                                    tooltip="This action cannot be undone"
                                                >
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">LG:</span>{' '}
                                                <OSButton
                                                    variant="ghost"
                                                    size="lg"
                                                    tooltip="This action cannot be undone"
                                                >
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">XL:</span>{' '}
                                                <OSButton
                                                    variant="ghost"
                                                    size="xl"
                                                    tooltip="This action cannot be undone"
                                                >
                                                    Delete
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-input p-4 rounded">
                                        <h4 className="font-semibold mb-4">Disabled primary</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-mono">XS:</span>{' '}
                                                <OSButton variant="primary" size="xs" disabled>
                                                    Loading...
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">SM:</span>{' '}
                                                <OSButton variant="primary" size="sm" disabled>
                                                    Loading...
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">MD:</span>{' '}
                                                <OSButton variant="primary" size="md" disabled>
                                                    Loading...
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">LG:</span>{' '}
                                                <OSButton variant="primary" size="lg" disabled>
                                                    Loading...
                                                </OSButton>
                                            </div>
                                            <div>
                                                <span className="text-sm font-mono">XL:</span>{' '}
                                                <OSButton variant="primary" size="xl" disabled>
                                                    Loading...
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
