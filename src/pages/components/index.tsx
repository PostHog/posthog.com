import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconDictator, IconBrush } from 'components/OSIcons/Icons'
import { AppIcon } from 'components/OSIcons'
import { IconPencil, IconUser, IconArrowRight, IconInfo, IconSearch } from '@posthog/icons'
import { Accordion } from 'components/RadixUI/Accordion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { useCustomers } from 'hooks/useCustomers'
import { OSInput, OSTextarea, OSSelect, Combobox, TeamMemberMultiSelect, SelectedMember } from 'components/OSForm'
import { Fieldset } from 'components/OSFieldset'
import { Checkbox } from 'components/RadixUI/Checkbox'
import ProductComparisonTable from 'components/ProductComparisonTable'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'

// Create table of contents for right sidebar
const tableOfContents = [
    {
        value: 'Open graph image templates',
        url: 'og-templates',
        depth: 0,
    },
    {
        value: 'OSButton',
        url: 'osbutton',
        depth: 0,
    },
    {
        value: 'Form elements',
        url: 'form-elements',
        depth: 0,
    },
    {
        value: 'OSInput',
        url: 'osinput',
        depth: 1,
    },
    {
        value: 'OSTextarea',
        url: 'ostextarea',
        depth: 1,
    },
    {
        value: 'Fieldset',
        url: 'fieldset',
        depth: 1,
    },
    {
        value: 'OSSelect',
        url: 'osselect',
        depth: 0,
    },
    {
        value: 'Combobox',
        url: 'combobox',
        depth: 1,
    },
    {
        value: 'Checkbox',
        url: 'checkbox',
        depth: 1,
    },
    {
        value: 'TeamMemberMultiSelect',
        url: 'teammembermultiselect',
        depth: 1,
    },
    {
        value: 'Competitor feature matrix',
        url: 'competitor-matrix',
        depth: 0,
    },
    {
        value: 'useCustomers',
        url: 'usecustomers',
        depth: 0,
    },
]

export default function Components(): JSX.Element {
    const { customers } = useCustomers()

    // Fetch real teams and profiles data
    const data = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(
                filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }
                sort: { fields: name, order: ASC }
            ) {
                nodes {
                    id
                    name
                    slug
                    miniCrest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    profiles {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                color
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            allProfiles: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            ) {
                nodes {
                    id
                    squeakId
                }
            }
        }
    `)

    // Build a map of profile id -> squeakId
    const profileIdToSqueakId = React.useMemo(() => {
        const map = new Map<string, string>()
        data.allProfiles.nodes.forEach((profile: any) => {
            map.set(profile.id, profile.squeakId)
        })
        return map
    }, [data.allProfiles.nodes])

    // Use teams with squeakId added to each profile
    const teams = React.useMemo(() => {
        return data.allTeams.nodes.map((team: any) => ({
            ...team,
            profiles: {
                data: team.profiles.data.map((profile: any) => ({
                    ...profile,
                    attributes: {
                        ...profile.attributes,
                        squeakId: profileIdToSqueakId.get(profile.id) || profile.id,
                    },
                })),
            },
        }))
    }, [data.allTeams.nodes, profileIdToSqueakId])

    // State for Combobox examples
    const [comboboxTags, setComboboxTags] = useState<any[]>([])
    const [comboboxMembers, setComboboxMembers] = useState<any[]>([])
    const [comboboxCategories, setComboboxCategories] = useState<any[]>([])

    // State for Checkbox examples
    const [checkboxBasic, setCheckboxBasic] = useState(false)
    const [checkboxChecked, setCheckboxChecked] = useState(true)
    const [checkboxDisabled, setCheckboxDisabled] = useState(false)

    // State for TeamMemberMultiSelect examples
    const [teamMemberSelection, setTeamMemberSelection] = useState<SelectedMember[]>([])
    const [teamMemberError, setTeamMemberError] = useState<SelectedMember[]>([])

    // Logo rendering logic from customers page
    const renderCustomerLogo = (customer: any) => {
        if (!customer.logo) {
            return <span className="text-sm text-muted">{customer.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height}` : ''
            const className = `w-full fill-current object-contain ${heightClass}`.trim()

            return <LogoComponent className={className} />
        }

        // Otherwise, it's the existing light/dark object format
        const heightClass = customer.height ? `max-h-${customer.height}` : 'max-h-10'

        return (
            <>
                <img
                    src={customer.logo.light}
                    alt={customer.name}
                    className={`w-auto object-contain dark:hidden ${heightClass}`}
                />
                <img
                    src={customer.logo.dark}
                    alt={customer.name}
                    className={`w-auto object-contain hidden dark:block ${heightClass}`}
                />
            </>
        )
    }

    return (
        <>
            <SEO title="Components - PostHog" description="Components for PostHog" image={`/images/og/default.png`} />
            <ReaderView
                title="Components"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                tableOfContents={tableOfContents}
                description="Component showcase and internal tooling for PostHog development"
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="space-y-12">
                        <section>
                            <div className="bg-accent p-4 rounded border border-primary mt-4">
                                <p className="mt-0">This is an internal playground for some React components that are used throughout the site.</p>
                                <p className="mb-0">If you're looking for components to be used in articles (like blog posts and docs), check out the <Link to="/handbook/engineering/posthog-com/markdown" state={{ newWindow: true }}>MDX components handbook page</Link>.</p>
                            </div>
                        </section>
                        <section id="og-templates">
                            <h2>Open graph image templates</h2>

                            <div className="inline-block w-[600px] h-[315px] border border-primary bg-accent">
                                hello
                            </div>
                        </section>
                        {/* OSButton Component Showcase */}
                        <section id="osbutton">
                            <h2 className="">
                                <code>&lt;OSButton /&gt;</code>
                            </h2>

                            {/* Common Usage */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Common usage</h3>
                                <div className="flex items-center gap-px flex-wrap">
                                    <OSButton size="sm" icon={<IconSearch />}></OSButton>
                                    <OSButton size="sm" icon={<IconSearch />}></OSButton>
                                    <OSButton size="sm" icon={<IconSearch />}></OSButton>
                                    <OSButton size="md" icon={<IconSearch />}></OSButton>
                                    <OSButton size="md" icon={<IconSearch />}></OSButton>
                                    <OSButton size="md" icon={<IconSearch />}></OSButton>
                                    <OSButton variant="primary">Get started – free</OSButton>
                                    <OSButton variant="secondary">Get started – free</OSButton>
                                </div>
                            </div>

                            {/* Hover Styles Comparison */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Hover styles comparison</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <OSButton>Default (border hover)</OSButton>
                                        <span className="text-sm text-muted">Hover shows border</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <OSButton hover="background">Background hover</OSButton>
                                        <span className="text-sm text-muted">Hover shows background color</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <OSButton active>Active state (border hover)</OSButton>
                                        <span className="text-sm text-muted">Active with opacity</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <OSButton hover="background" active>
                                            Active state (background hover)
                                        </OSButton>
                                        <span className="text-sm text-muted">Active with full color</span>
                                    </div>
                                </div>
                            </div>

                            {/* Variants with All Sizes */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Variants with all sizes</h3>
                                <ScrollArea className="h-96">
                                    <table className="w-full border-collapse border border-primary">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-primary px-4 py-2 text-left">Variant</th>
                                                <th className="border border-primary px-4 py-2 text-left">
                                                    Description
                                                </th>
                                                <th className="border border-primary px-4 py-2 text-left">XS</th>
                                                <th className="border border-primary px-4 py-2 text-left">SM</th>
                                                <th className="border border-primary px-4 py-2 text-left">MD</th>
                                                <th className="border border-primary px-4 py-2 text-left">LG</th>
                                                <th className="border border-primary px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">default</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Transparent background with subtle hover effects (formerly ghost)
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs">Button</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm">Button</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md">Button</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg">Button</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl">Button</OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">primary</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Orange background with black text, primary action button
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="primary" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="primary" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="primary" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="primary" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="primary" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">secondary</td>
                                                <td className="border border-primary px-4 py-2">
                                                    White background with primary text, secondary action button
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="secondary" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="secondary" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="secondary" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="secondary" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="secondary" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">underline</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Always shows underline, removes on hover
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underline" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underline" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underline" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underline" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underline" size="xl">
                                                        Button
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">
                                                    underlineOnHover
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    Transparent background with underline on hover
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underlineOnHover" size="xs">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underlineOnHover" size="sm">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underlineOnHover" size="md">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underlineOnHover" size="lg">
                                                        Button
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton variant="underlineOnHover" size="xl">
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
                                    <table className="w-full border-collapse border border-primary">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-primary px-4 py-2 text-left">Variant</th>
                                                <th className="border border-primary px-4 py-2 text-left">
                                                    Description
                                                </th>
                                                <th className="border border-primary px-4 py-2 text-left">XS</th>
                                                <th className="border border-primary px-4 py-2 text-left">SM</th>
                                                <th className="border border-primary px-4 py-2 text-left">MD</th>
                                                <th className="border border-primary px-4 py-2 text-left">LG</th>
                                                <th className="border border-primary px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">default</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Icon-only button with default styling
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" icon={<IconSearch />}></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" icon={<IconSearch />}></OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">primary</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Icon-only button with primary styling
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="xs"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="sm"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="md"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="lg"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="primary"
                                                        size="xl"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">secondary</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Icon-only button with secondary styling
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="xs"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="sm"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="md"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
                                                        size="lg"
                                                        icon={<IconSearch />}
                                                    ></OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton
                                                        variant="secondary"
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
                                    <table className="w-full border-collapse border border-primary">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-primary px-4 py-2 text-left">State</th>
                                                <th className="border border-primary px-4 py-2 text-left">
                                                    Description
                                                </th>
                                                <th className="border border-primary px-4 py-2 text-left">XS</th>
                                                <th className="border border-primary px-4 py-2 text-left">SM</th>
                                                <th className="border border-primary px-4 py-2 text-left">MD</th>
                                                <th className="border border-primary px-4 py-2 text-left">LG</th>
                                                <th className="border border-primary px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">normal</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Normal interactive state
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs">Normal</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm">Normal</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md">Normal</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg">Normal</OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl">Normal</OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">disabled</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Disabled state with reduced opacity and no interactions
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" disabled>
                                                        Disabled
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">active</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Active state (for default variant)
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" active>
                                                        Active
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" active>
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
                                    <table className="w-full border-collapse border border-primary">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-primary px-4 py-2 text-left">Feature</th>
                                                <th className="border border-primary px-4 py-2 text-left">
                                                    Description
                                                </th>
                                                <th className="border border-primary px-4 py-2 text-left">XS</th>
                                                <th className="border border-primary px-4 py-2 text-left">SM</th>
                                                <th className="border border-primary px-4 py-2 text-left">MD</th>
                                                <th className="border border-primary px-4 py-2 text-left">LG</th>
                                                <th className="border border-primary px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">
                                                    icon (left)
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    Icon positioned to the left of text
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" icon={<IconUser />}>
                                                        Icon
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">
                                                    icon (right)
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    Icon positioned to the right of text
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" icon={<IconArrowRight />} iconPosition="right">
                                                        Icon
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">label</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Additional label text with secondary color
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" label="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">chip</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Chip badge with border (optional color)
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" chip="New">
                                                        Create
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" chip="Beta" chipColor="blue">
                                                        Feature
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" chip="Pro" chipColor="green">
                                                        Upgrade
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" chip="Hot" chipColor="red">
                                                        Deal
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" chip="Limited" chipColor="orange">
                                                        Offer
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">tooltip</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Info icon with tooltip on hover
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" tooltip="This is a helpful tooltip">
                                                        Tooltip
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">zoomHover</td>
                                                <td className="border border-primary px-4 py-2">
                                                    Zoom effect on hover
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" zoomHover>
                                                        Zoom
                                                    </OSButton>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">
                                                    hover="background"
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    Background color on hover instead of border
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xs" hover="background">
                                                        Background
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="sm" hover="background">
                                                        Background
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="md" hover="background">
                                                        Background
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="lg" hover="background">
                                                        Background
                                                    </OSButton>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <OSButton size="xl" hover="background">
                                                        Background
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
                                    <table className="w-full border-collapse border border-primary">
                                        <thead>
                                            <tr className="bg-accent">
                                                <th className="border border-primary px-4 py-2 text-left">Variant</th>
                                                <th className="border border-primary px-4 py-2 text-left">XS</th>
                                                <th className="border border-primary px-4 py-2 text-left">SM</th>
                                                <th className="border border-primary px-4 py-2 text-left">MD</th>
                                                <th className="border border-primary px-4 py-2 text-left">LG</th>
                                                <th className="border border-primary px-4 py-2 text-left">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">default</td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="xs" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="sm" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="md" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="lg" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton size="xl" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">primary</td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="xs" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="sm" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="md" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="lg" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="primary" size="xl" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-primary px-4 py-2 font-mono">secondary</td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="xs" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="sm" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="md" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
                                                    <div className="w-48">
                                                        <OSButton variant="secondary" size="lg" width="full">
                                                            Full Width
                                                        </OSButton>
                                                    </div>
                                                </td>
                                                <td className="border border-primary px-4 py-2">
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
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Default with icon & label</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">XS:</span>
                                                <OSButton size="xs" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">SM:</span>
                                                <OSButton size="sm" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">MD:</span>
                                                <OSButton size="md" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">LG:</span>
                                                <OSButton size="lg" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">XL:</span>
                                                <OSButton size="xl" icon={<IconUser />} label="New">
                                                    Create
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-primary p-4 rounded">
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
                                    <div className="border border-primary p-4 rounded">
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
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Default with tooltip</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">XS:</span>
                                                <OSButton size="xs" tooltip="This action cannot be undone">
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">SM:</span>
                                                <OSButton size="sm" tooltip="This action cannot be undone">
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">MD:</span>
                                                <OSButton size="md" tooltip="This action cannot be undone">
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">LG:</span>
                                                <OSButton size="lg" tooltip="This action cannot be undone">
                                                    Delete
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">XL:</span>
                                                <OSButton size="xl" tooltip="This action cannot be undone">
                                                    Delete
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Button with chip & icon</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">XS:</span>
                                                <OSButton size="xs" icon={<IconUser />} chip="Pro">
                                                    Profile
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">SM:</span>
                                                <OSButton
                                                    size="sm"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                    chip="New"
                                                    chipColor="green"
                                                >
                                                    Try it
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">MD:</span>
                                                <OSButton size="md" variant="primary" chip="Beta" chipColor="blue">
                                                    Enable feature
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">LG:</span>
                                                <OSButton
                                                    size="lg"
                                                    variant="secondary"
                                                    icon={<IconInfo />}
                                                    chip="Limited"
                                                >
                                                    Learn more
                                                </OSButton>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono">XL:</span>
                                                <OSButton size="xl" label="$99/mo" chip="Sale" chipColor="red">
                                                    Upgrade now
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-primary p-4 rounded">
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

                            {/* Additional Features */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Additional features</h3>
                                <div className="space-y-6">
                                    {/* Button as Link */}
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Button as Link</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <OSButton
                                                    asLink
                                                    to="/docs"
                                                    icon={<IconArrowRight />}
                                                    iconPosition="right"
                                                >
                                                    Go to docs (internal)
                                                </OSButton>
                                            </div>
                                            <div>
                                                <OSButton
                                                    asLink
                                                    to="https://github.com/posthog/posthog"
                                                    external
                                                    variant="primary"
                                                >
                                                    View on GitHub (external)
                                                </OSButton>
                                            </div>
                                            <div>
                                                <OSButton asLink to="/pricing" variant="secondary" size="sm">
                                                    View pricing
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alignment Options */}
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Alignment</h4>
                                        <div className="space-y-2">
                                            <div className="w-64 border border-dashed border-primary p-1">
                                                <OSButton width="full" align="left" icon={<IconUser />}>
                                                    Left aligned (default)
                                                </OSButton>
                                            </div>
                                            <div className="w-64 border border-dashed border-primary p-1">
                                                <OSButton width="full" align="center" icon={<IconUser />}>
                                                    Center aligned
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Custom Styling */}
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Custom Styling</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <OSButton className="!bg-red-500 !text-white hover:!bg-red-600">
                                                    Custom colors via className
                                                </OSButton>
                                            </div>
                                            <div>
                                                <OSButton icon={<IconSearch />} iconClassName="text-orange">
                                                    Custom icon color
                                                </OSButton>
                                            </div>
                                            <div>
                                                <OSButton variant="primary" className="!rounded-full">
                                                    Fully rounded
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Special Props */}
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Special Props</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <OSButton
                                                    asLink
                                                    to="/docs"
                                                    state={{ from: 'components-page' }}
                                                    variant="secondary"
                                                >
                                                    Link with state prop
                                                </OSButton>
                                            </div>
                                            <div>
                                                <OSButton zoomHover={false}>Default variant without ZoomHover</OSButton>
                                            </div>
                                            <div>
                                                <OSButton variant="primary" zoomHover>
                                                    Primary with manual ZoomHover
                                                </OSButton>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inline Usage */}
                                    <div className="border border-primary p-4 rounded">
                                        <h4 className="font-semibold mb-4">Inline Usage</h4>
                                        <div className="space-y-2">
                                            <p>
                                                This is some text with an{' '}
                                                <OSButton variant="underline" size="sm">
                                                    inline underline button
                                                </OSButton>{' '}
                                                and an{' '}
                                                <OSButton variant="underlineOnHover" size="sm">
                                                    underline on hover button
                                                </OSButton>{' '}
                                                in the middle.
                                            </p>
                                            <p>
                                                You can also use{' '}
                                                <OSButton size="xs" asLink to="/docs">
                                                    tiny link buttons
                                                </OSButton>{' '}
                                                inline.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Form Elements Section */}
                        <section id="form-elements">
                            <h2 className="">Form elements</h2>

                            {/* OSInput Component Showcase */}
                            <div className="mb-8" id="osinput">
                                <h3 className="text-xl font-semibold mb-4">
                                    <code>&lt;OSInput /&gt;</code>
                                </h3>

                                {/* Basic Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Basic examples</h4>
                                    <div className="space-y-4">
                                        <OSInput
                                            label="Email"
                                            type="email"
                                            placeholder="you@example.com"
                                            name="email-basic"
                                        />
                                        <OSInput label="Password" type="password" name="password-basic" />
                                        <OSInput
                                            label="Phone"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            name="phone-basic"
                                        />
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Sizes</h4>
                                    <div className="space-y-4">
                                        <OSInput label="Small" size="sm" placeholder="Small input" name="small-input" />
                                        <OSInput
                                            label="Medium"
                                            size="md"
                                            placeholder="Medium input (default)"
                                            name="medium-input"
                                        />
                                        <OSInput label="Large" size="lg" placeholder="Large input" name="large-input" />
                                    </div>
                                </div>

                                {/* Directions */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Label directions</h4>
                                    <div className="space-y-4">
                                        <OSInput
                                            label="Row direction"
                                            direction="row"
                                            placeholder="Label on the left"
                                            name="row-direction"
                                        />
                                        <OSInput
                                            label="Column direction"
                                            direction="column"
                                            placeholder="Label above"
                                            name="column-direction"
                                        />
                                    </div>
                                </div>

                                {/* Width Options */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Width options</h4>
                                    <div className="space-y-4">
                                        <div className="border border-dashed border-primary p-2">
                                            <OSInput
                                                label="Full width"
                                                width="full"
                                                placeholder="Takes full container width"
                                                name="full-width"
                                            />
                                        </div>
                                        <div className="border border-dashed border-primary p-2">
                                            <OSInput
                                                label="Auto width"
                                                width="auto"
                                                placeholder="Auto width"
                                                name="auto-width"
                                            />
                                        </div>
                                        <div className="border border-dashed border-primary p-2">
                                            <OSInput label="Fit width" width="fit" placeholder="Fit" name="fit-width" />
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Features</h4>
                                    <div className="space-y-4">
                                        <OSInput
                                            label="Required field"
                                            required
                                            placeholder="This field is required"
                                            name="required-field"
                                        />
                                        <OSInput
                                            label="With description"
                                            description="Enter your primary email address"
                                            placeholder="you@example.com"
                                            name="with-description"
                                        />
                                        <OSInput
                                            label="With tooltip"
                                            tooltip="We'll never share your email"
                                            placeholder="Hover the info icon"
                                            name="with-tooltip"
                                        />
                                        <OSInput
                                            label="Hidden label"
                                            showLabel={false}
                                            placeholder="No visible label"
                                            name="hidden-label"
                                        />
                                        <OSInput
                                            label="Custom label width"
                                            labelWidth="w-32"
                                            placeholder="Wider label column"
                                            name="custom-label-width"
                                        />
                                    </div>
                                </div>

                                {/* Error States */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Error states</h4>
                                    <div className="space-y-4">
                                        <OSInput
                                            label="Invalid email"
                                            type="email"
                                            touched={true}
                                            error="Please enter a valid email address"
                                            placeholder="you@example.com"
                                            name="error-email"
                                        />
                                        <OSInput
                                            label="Required field"
                                            touched={true}
                                            error="This field is required"
                                            placeholder="Cannot be empty"
                                            name="error-required"
                                        />
                                    </div>
                                </div>

                                {/* Complex Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Complex examples</h4>
                                    <div className="space-y-4">
                                        <OSInput
                                            label="Full featured"
                                            type="email"
                                            required
                                            tooltip="Your primary contact email"
                                            description="We'll use this for account notifications"
                                            placeholder="you@example.com"
                                            direction="column"
                                            size="lg"
                                            name="full-featured"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* OSTextarea Component Showcase */}
                            <div className="mb-8" id="ostextarea">
                                <h3 className="text-xl font-semibold mb-4">
                                    <code>&lt;OSTextarea /&gt;</code>
                                </h3>

                                {/* Basic Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Basic examples</h4>
                                    <div className="space-y-4">
                                        <OSTextarea
                                            label="Message"
                                            placeholder="Enter your message here..."
                                            name="message-basic"
                                        />
                                        <OSTextarea
                                            label="Description"
                                            rows={6}
                                            placeholder="Provide a detailed description..."
                                            name="description-basic"
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Features</h4>
                                    <div className="space-y-4">
                                        <OSTextarea
                                            label="Required textarea"
                                            required
                                            placeholder="This field is required"
                                            name="required-textarea"
                                        />
                                        <OSTextarea
                                            label="With description"
                                            description="Please be as detailed as possible"
                                            placeholder="Your detailed response..."
                                            name="textarea-with-description"
                                        />
                                        <OSTextarea
                                            label="With tooltip"
                                            tooltip="Markdown formatting is supported"
                                            placeholder="You can use **bold** and *italic*"
                                            name="textarea-with-tooltip"
                                        />
                                        <OSTextarea
                                            label="Column layout"
                                            direction="column"
                                            placeholder="Label appears above the textarea"
                                            name="textarea-column"
                                        />
                                    </div>
                                </div>

                                {/* Error States */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Error states</h4>
                                    <div className="space-y-4">
                                        <OSTextarea
                                            label="Invalid input"
                                            touched={true}
                                            error="Message must be at least 10 characters"
                                            placeholder="Too short..."
                                            name="textarea-error"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Fieldset Component Showcase */}
                            <div className="mb-8" id="fieldset">
                                <h3 className="text-xl font-semibold mb-4">
                                    <code>&lt;Fieldset /&gt;</code>
                                </h3>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Group related form fields</h4>
                                    <div className="space-y-4">
                                        <Fieldset legend="Personal Information">
                                            <OSInput label="First name" direction="column" name="first-name" />
                                            <OSInput label="Last name" direction="column" name="last-name" />
                                            <OSInput
                                                label="Email"
                                                type="email"
                                                direction="column"
                                                name="fieldset-email"
                                            />
                                        </Fieldset>

                                        <Fieldset legend="Address">
                                            <OSInput label="Street" direction="column" name="street" />
                                            <div className="grid grid-cols-2 gap-2">
                                                <OSInput label="City" direction="column" name="city" />
                                                <OSInput label="ZIP" direction="column" name="zip" />
                                            </div>
                                        </Fieldset>
                                    </div>
                                </div>
                            </div>

                            {/* Complete Form Examples */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Complete form examples</h3>

                                {/* Two Column Form */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Two-column form</h4>
                                    <div className="border border-primary rounded p-6 bg-accent">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <OSInput
                                                label="First name"
                                                direction="column"
                                                required
                                                name="form-first-name"
                                            />
                                            <OSInput
                                                label="Last name"
                                                direction="column"
                                                required
                                                name="form-last-name"
                                            />
                                            <OSInput
                                                label="Email"
                                                type="email"
                                                direction="column"
                                                required
                                                tooltip="We'll never share your email"
                                                name="form-email"
                                            />
                                            <OSInput label="Phone" type="tel" direction="column" name="form-phone" />
                                            <div className="md:col-span-2">
                                                <OSTextarea
                                                    label="Message"
                                                    direction="column"
                                                    required
                                                    rows={4}
                                                    description="Tell us what you're looking for"
                                                    name="form-message"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <OSButton variant="primary" size="md">
                                                Submit
                                            </OSButton>
                                        </div>
                                    </div>
                                </div>

                                {/* Inline Form */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Inline form with consistent label widths</h4>
                                    <div className="border border-primary rounded p-6 bg-accent">
                                        <div className="space-y-3">
                                            <OSInput
                                                label="Username"
                                                labelWidth="w-24"
                                                required
                                                name="inline-username"
                                            />
                                            <OSInput
                                                label="Email"
                                                type="email"
                                                labelWidth="w-24"
                                                required
                                                name="inline-email"
                                            />
                                            <OSInput
                                                label="Password"
                                                type="password"
                                                labelWidth="w-24"
                                                required
                                                name="inline-password"
                                            />
                                            <OSTextarea label="Bio" labelWidth="w-24" rows={3} name="inline-bio" />
                                        </div>
                                        <div className="mt-4 ml-26">
                                            <OSButton variant="secondary" size="sm">
                                                Save Profile
                                            </OSButton>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Scheme Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Data scheme variations</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Primary scheme on secondary background */}
                                        <div
                                            data-scheme="secondary"
                                            className="border border-primary rounded p-6 bg-primary"
                                        >
                                            <h5 className="font-semibold mb-3">Primary scheme inputs</h5>
                                            <p className="text-sm text-secondary mb-4">
                                                These inputs use dataScheme="primary" on a secondary background
                                            </p>
                                            <div className="space-y-3">
                                                <OSInput
                                                    label="Name"
                                                    dataScheme="primary"
                                                    direction="column"
                                                    name="primary-name"
                                                />
                                                <OSTextarea
                                                    label="Description"
                                                    dataScheme="primary"
                                                    direction="column"
                                                    rows={3}
                                                    name="primary-desc"
                                                />
                                            </div>
                                        </div>

                                        {/* Secondary scheme on primary background */}
                                        <div
                                            data-scheme="primary"
                                            className="border border-primary rounded p-6 bg-primary"
                                        >
                                            <h5 className="font-semibold mb-3">Secondary scheme inputs</h5>
                                            <p className="text-sm text-secondary mb-4">
                                                These inputs use dataScheme="secondary" on a primary background
                                            </p>
                                            <div className="space-y-3">
                                                <OSInput
                                                    label="Name"
                                                    dataScheme="secondary"
                                                    direction="column"
                                                    name="secondary-name"
                                                />
                                                <OSTextarea
                                                    label="Description"
                                                    dataScheme="secondary"
                                                    direction="column"
                                                    rows={3}
                                                    name="secondary-desc"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* OSSelect Component Showcase */}
                        <section id="osselect">
                            <h2 className="">
                                <code>&lt;OSSelect /&gt;</code>
                            </h2>

                            {/* Basic Examples */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Basic examples</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="Status"
                                        options={[
                                            { label: 'In Progress', value: 'in-progress' },
                                            { label: 'Complete', value: 'complete' },
                                            { label: 'Under Consideration', value: 'under-consideration' },
                                        ]}
                                        placeholder="Select status..."
                                    />
                                    <OSSelect
                                        label="Priority"
                                        options={[
                                            { label: 'Low', value: 'low' },
                                            { label: 'Medium', value: 'medium' },
                                            { label: 'High', value: 'high' },
                                            { label: 'Critical', value: 'critical' },
                                        ]}
                                        placeholder="Select priority..."
                                        required
                                    />
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Sizes</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="Small"
                                        size="sm"
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="Small select"
                                    />
                                    <OSSelect
                                        label="Medium"
                                        size="md"
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="Medium select (default)"
                                    />
                                    <OSSelect
                                        label="Large"
                                        size="lg"
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="Large select"
                                    />
                                </div>
                            </div>

                            {/* Directions */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Label directions</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="Row direction"
                                        direction="row"
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="Label on the left"
                                    />
                                    <OSSelect
                                        label="Column direction"
                                        direction="column"
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="Label above"
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Features</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="With description"
                                        description="Choose the appropriate status for this item"
                                        options={[
                                            { label: 'Draft', value: 'draft' },
                                            { label: 'Published', value: 'published' },
                                            { label: 'Archived', value: 'archived' },
                                        ]}
                                        placeholder="Select status..."
                                    />
                                    <OSSelect
                                        label="With tooltip"
                                        tooltip="This determines the visibility of your content"
                                        options={[
                                            { label: 'Public', value: 'public' },
                                            { label: 'Private', value: 'private' },
                                            { label: 'Unlisted', value: 'unlisted' },
                                        ]}
                                        placeholder="Select visibility..."
                                    />
                                    <OSSelect
                                        label="Disabled"
                                        disabled
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="This select is disabled"
                                    />
                                </div>
                            </div>

                            {/* Searchable Examples */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Searchable selects</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="Searchable (default)"
                                        options={[
                                            { label: 'Apple', value: 'apple', description: 'A red fruit' },
                                            { label: 'Banana', value: 'banana', description: 'A yellow fruit' },
                                            { label: 'Cherry', value: 'cherry', description: 'A small red fruit' },
                                            { label: 'Date', value: 'date', description: 'A sweet dried fruit' },
                                            {
                                                label: 'Elderberry',
                                                value: 'elderberry',
                                                description: 'A dark purple berry',
                                            },
                                            { label: 'Fig', value: 'fig', description: 'A soft sweet fruit' },
                                            { label: 'Grape', value: 'grape', description: 'Small round fruits' },
                                            { label: 'Honeydew', value: 'honeydew', description: 'A sweet melon' },
                                        ]}
                                        placeholder="Search fruits..."
                                        searchPlaceholder="Type to search fruits..."
                                    />
                                    <OSSelect
                                        label="Non-searchable"
                                        searchable={false}
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="No search available"
                                    />
                                </div>
                            </div>

                            {/* Error States */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Error states</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="Invalid selection"
                                        touched={true}
                                        error="Please select a valid option"
                                        options={[
                                            { label: 'Option 1', value: '1' },
                                            { label: 'Option 2', value: '2' },
                                            { label: 'Option 3', value: '3' },
                                        ]}
                                        placeholder="This has an error"
                                    />
                                </div>
                            </div>

                            {/* Complex Examples */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Complex examples</h3>
                                <div className="space-y-4">
                                    <OSSelect
                                        label="Full featured"
                                        required
                                        tooltip="Choose your team for this project"
                                        description="This will determine who has access to this project"
                                        options={[
                                            {
                                                label: 'Engineering',
                                                value: 'engineering',
                                                description: 'Software development team',
                                            },
                                            {
                                                label: 'Design',
                                                value: 'design',
                                                description: 'User experience and visual design',
                                            },
                                            {
                                                label: 'Product',
                                                value: 'product',
                                                description: 'Product strategy and management',
                                            },
                                            {
                                                label: 'Marketing',
                                                value: 'marketing',
                                                description: 'Brand and growth marketing',
                                            },
                                        ]}
                                        direction="column"
                                        size="lg"
                                        placeholder="Select your team..."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Combobox Component Showcase */}
                        <section id="combobox">
                            <h3 className="text-xl font-semibold mb-4">
                                <code>&lt;Combobox /&gt;</code>
                            </h3>

                            <p className="mb-6 text-secondary">
                                A multi-select combobox component with search, keyboard navigation, and optional creation of
                                new options. Perfect for tags, categories, and multi-value selections.
                            </p>

                            {/* Basic Examples */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Basic example (with creation enabled)</h4>
                                <div className="space-y-4">
                                    <Combobox
                                        label="Tags"
                                        placeholder="Select or create tags..."
                                        description="Type to search or create new tags"
                                        options={[
                                            { label: 'React', value: 'react' },
                                            { label: 'TypeScript', value: 'typescript' },
                                            { label: 'JavaScript', value: 'javascript' },
                                            { label: 'Python', value: 'python' },
                                            { label: 'Go', value: 'go' },
                                        ]}
                                        value={comboboxTags}
                                        onChange={setComboboxTags}
                                    />
                                </div>
                            </div>

                            {/* Without Creation */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Without creation (predefined options only)</h4>
                                <div className="space-y-4">
                                    <Combobox
                                        label="Team members"
                                        placeholder="Select team members..."
                                        description="Choose from existing team members"
                                        options={[
                                            { label: 'Alice Johnson', value: 'alice' },
                                            { label: 'Bob Smith', value: 'bob' },
                                            { label: 'Charlie Brown', value: 'charlie' },
                                            { label: 'Diana Prince', value: 'diana' },
                                        ]}
                                        value={comboboxMembers}
                                        onChange={setComboboxMembers}
                                        allowCreate={false}
                                    />
                                </div>
                            </div>

                            {/* Error State */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Error state</h4>
                                <div className="space-y-4">
                                    <Combobox
                                        label="Categories"
                                        placeholder="Select at least one category..."
                                        description="At least one category is required"
                                        options={[
                                            { label: 'Frontend', value: 'frontend' },
                                            { label: 'Backend', value: 'backend' },
                                            { label: 'DevOps', value: 'devops' },
                                            { label: 'Design', value: 'design' },
                                        ]}
                                        value={comboboxCategories}
                                        onChange={setComboboxCategories}
                                        touched={true}
                                        error="Please select at least one category"
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Key features</h4>
                                <div className="space-y-2 text-sm">
                                    <ul className="list-disc list-inside space-y-1 text-secondary">
                                        <li>Multi-select with visual chips for selected items</li>
                                        <li>Search/filter options by typing</li>
                                        <li>Keyboard navigation (Arrow Up/Down, Enter, Escape, Backspace)</li>
                                        <li>Optional creation of new options (allowCreate prop)</li>
                                        <li>Click to select/deselect items</li>
                                        <li>Remove items by clicking X or using Backspace</li>
                                        <li>Checkmark indicator for selected items in dropdown</li>
                                        <li>Auto-scrolling for keyboard navigation</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Checkbox Component Showcase */}
                        <section id="checkbox">
                            <h3 className="text-xl font-semibold mb-4">
                                <code>&lt;Checkbox /&gt;</code>
                            </h3>

                            <p className="mb-6 text-secondary">
                                A checkbox component built with Radix UI. Supports controlled and uncontrolled states,
                                disabled state, and custom styling.
                            </p>

                            {/* Basic Examples */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Basic examples</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="checkbox-basic"
                                            checked={checkboxBasic}
                                            onCheckedChange={setCheckboxBasic}
                                        />
                                        <label htmlFor="checkbox-basic" className="text-sm cursor-pointer">
                                            Basic checkbox (click to toggle)
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="checkbox-checked"
                                            checked={checkboxChecked}
                                            onCheckedChange={setCheckboxChecked}
                                        />
                                        <label htmlFor="checkbox-checked" className="text-sm cursor-pointer">
                                            Default checked
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="checkbox-disabled" disabled checked={checkboxDisabled} />
                                        <label htmlFor="checkbox-disabled" className="text-sm opacity-50">
                                            Disabled checkbox
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="checkbox-disabled-checked" disabled checked={true} />
                                        <label htmlFor="checkbox-disabled-checked" className="text-sm opacity-50">
                                            Disabled checked
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* With Different Schemes */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Data scheme variations</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Primary scheme on secondary background */}
                                    <div
                                        data-scheme="secondary"
                                        className="border border-primary rounded p-6 bg-primary space-y-3"
                                    >
                                        <h5 className="font-semibold mb-3">Primary scheme</h5>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="checkbox-primary-1" dataScheme="primary" defaultChecked />
                                            <label htmlFor="checkbox-primary-1" className="text-sm cursor-pointer">
                                                Checked
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="checkbox-primary-2" dataScheme="primary" />
                                            <label htmlFor="checkbox-primary-2" className="text-sm cursor-pointer">
                                                Unchecked
                                            </label>
                                        </div>
                                    </div>

                                    {/* Secondary scheme on primary background */}
                                    <div
                                        data-scheme="primary"
                                        className="border border-primary rounded p-6 bg-primary space-y-3"
                                    >
                                        <h5 className="font-semibold mb-3">Secondary scheme</h5>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="checkbox-secondary-1" dataScheme="secondary" defaultChecked />
                                            <label htmlFor="checkbox-secondary-1" className="text-sm cursor-pointer">
                                                Checked
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="checkbox-secondary-2" dataScheme="secondary" />
                                            <label htmlFor="checkbox-secondary-2" className="text-sm cursor-pointer">
                                                Unchecked
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Integration */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Form integration</h4>
                                <div className="border border-primary rounded p-6 bg-accent">
                                    <fieldset className="space-y-3">
                                        <legend className="font-semibold mb-2">Select your preferences</legend>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="pref-1" name="newsletter" value="newsletter" />
                                            <label htmlFor="pref-1" className="text-sm cursor-pointer">
                                                Subscribe to newsletter
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="pref-2" name="updates" value="updates" defaultChecked />
                                            <label htmlFor="pref-2" className="text-sm cursor-pointer">
                                                Receive product updates
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="pref-3" name="marketing" value="marketing" />
                                            <label htmlFor="pref-3" className="text-sm cursor-pointer">
                                                Marketing communications
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="pref-4" name="terms" value="terms" required />
                                            <label htmlFor="pref-4" className="text-sm cursor-pointer">
                                                I agree to the terms and conditions{' '}
                                                <span className="text-red dark:text-yellow">*</span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Key features</h4>
                                <div className="space-y-2 text-sm">
                                    <ul className="list-disc list-inside space-y-1 text-secondary">
                                        <li>Built on Radix UI for accessibility</li>
                                        <li>Controlled and uncontrolled modes</li>
                                        <li>Disabled state support</li>
                                        <li>Data scheme variations (primary/secondary)</li>
                                        <li>Required field support</li>
                                        <li>Custom styling via className prop</li>
                                        <li>Keyboard accessible</li>
                                        <li>ARIA compliant</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* TeamMemberMultiSelect Component Showcase */}
                        <section id="teammembermultiselect">
                            <h3 className="text-xl font-semibold mb-4">
                                <code>&lt;TeamMemberMultiSelect /&gt;</code>
                            </h3>

                            <p className="mb-6 text-secondary">
                                A complex multi-select component for choosing team members from small teams. Features
                                collapsible team sections, search functionality, avatar display, and deduplication across
                                teams.
                            </p>

                            {/* Basic Example */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Basic example</h4>
                                <div className="space-y-4">
                                    <TeamMemberMultiSelect
                                        label="Team members"
                                        description="Select team members for this project"
                                        placeholder="Search teams and members..."
                                        teams={teams}
                                        value={teamMemberSelection}
                                        onChange={setTeamMemberSelection}
                                    />
                                    {teamMemberSelection.length > 0 && (
                                        <div className="text-sm text-secondary">
                                            Selected: {teamMemberSelection.map((m) => `${m.firstName} ${m.lastName}`).join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Error State */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Error state</h4>
                                <div className="space-y-4">
                                    <TeamMemberMultiSelect
                                        label="Required team members"
                                        description="At least one team member is required"
                                        placeholder="Search teams and members..."
                                        teams={teams}
                                        value={teamMemberError}
                                        onChange={setTeamMemberError}
                                        touched={true}
                                        error="Please select at least one team member"
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Key features</h4>
                                <div className="space-y-2 text-sm">
                                    <ul className="list-disc list-inside space-y-1 text-secondary">
                                        <li>Multi-select with avatar chips for selected members</li>
                                        <li>"All members" checkbox to select/deselect everyone</li>
                                        <li>Collapsible team sections using Radix UI Accordion</li>
                                        <li>Team-level checkboxes to select/deselect all team members</li>
                                        <li>Search functionality filtering team and member names</li>
                                        <li>Auto-expand teams with matching members when searching</li>
                                        <li>Member deduplication by squeakId across multiple teams</li>
                                        <li>Avatar display with colored backgrounds (like TeamMember component)</li>
                                        <li>Selection count badges on team headers (e.g., "2/3 selected")</li>
                                        <li>Tooltip on chips showing team affiliations</li>
                                        <li>Keyboard navigation (Escape to close, Backspace to remove last)</li>
                                        <li>Receives data as props for flexibility</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Data Structure */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-4">Data structure</h4>
                                <div className="text-sm">
                                    <p className="mb-2 text-secondary">
                                        The component receives teams with nested profiles and returns selected members with
                                        full metadata:
                                    </p>
                                    <div className="bg-accent p-4 rounded border border-primary">
                                        <pre className="text-xs overflow-x-auto">
                                            {`// Teams prop structure
teams: Array<{
  id: string
  name: string
  slug: string
  miniCrest?: { data: { attributes: { url: string } } }
  profiles: {
    data: Array<{
      id: string
      attributes: {
        squeakId: string
        firstName: string
        lastName: string
        companyRole?: string
        avatar?: { data: { attributes: { url: string } } }
        color?: string
      }
    }>
  }
}>

// Value/onChange structure
SelectedMember: {
  squeakId: string
  firstName: string
  lastName: string
  avatar?: { url: string }
  color?: string
  teams: string[]  // Team names
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="competitor-matrix">
                            <h2 className="">Competitor feature matrix</h2>

                            <p className="mb-6 text-secondary">
                                Comprehensive view of all product and platform features across competitors. This serves
                                as internal tooling for QA, content creation, and identifying gaps in competitive data.
                            </p>

                            {/* Error Tracking Features */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Error Tracking Features</h3>
                                <ProductComparisonTable
                                    competitors={['posthog', 'sentry', 'logrocket', 'bugsnag', 'datadog']}
                                    rows={[
                                        { path: 'error_tracking.core.error_alerts' },
                                        { path: 'error_tracking.core.exception_capture' },
                                        { path: 'error_tracking.core.issue_management' },
                                        { path: 'error_tracking.core.error_grouping' },
                                        { path: 'error_tracking.core.stack_tracing' },
                                        { path: 'error_tracking.monitoring.performance_monitoring' },
                                        { path: 'error_tracking.monitoring.source_map_support' },
                                        { path: 'error_tracking.integrations.product_analytics' },
                                        { path: 'error_tracking.integrations.session_replay' },
                                        { path: 'error_tracking.integrations.ab_experiments' },
                                    ]}
                                />
                            </div>

                            {/* Session Replay Features */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Session Replay Features</h3>
                                <ProductComparisonTable
                                    competitors={['posthog', 'fullstory', 'hotjar', 'logrocket', 'clarity', 'matomo']}
                                    rows={[
                                        { path: 'session_replay.ai.ai_summaries' },
                                        { path: 'session_replay.platform_support.single_page_app' },
                                        { path: 'session_replay.platform_support.ios_recordings' },
                                        { path: 'session_replay.platform_support.android_recordings' },
                                        { path: 'session_replay.platform_support.react_native_recordings' },
                                        { path: 'session_replay.platform_support.flutter_recordings' },
                                        { path: 'session_replay.identity.identity_detection' },
                                        { path: 'session_replay.targeting.target_by_url' },
                                        { path: 'session_replay.targeting.filter_by_user_or_event' },
                                        { path: 'session_replay.export.export_to_json' },
                                        { path: 'session_replay.export.retention_policy' },
                                    ]}
                                />
                            </div>

                            {/* Platform Features */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
                                <ProductComparisonTable
                                    competitors={['posthog', 'sentry', 'logrocket', 'bugsnag', 'glitchtip', 'signoz']}
                                    rows={[
                                        { path: 'platform.deployment.open_source' },
                                        { path: 'platform.deployment.self_host' },
                                        { path: 'platform.pricing.usage_based_pricing' },
                                        { path: 'platform.pricing.transparent_pricing' },
                                        { path: 'platform.pricing.free_tier' },
                                        { path: 'platform.support.console_log_capture' },
                                        { path: 'platform.support.mobile_sdk_coverage' },
                                        { path: 'platform.integrations.ci_cd_integrations' },
                                        { path: 'platform.analytics_integration.built_in_analytics' },
                                    ]}
                                />
                            </div>
                        </section>

                        <section id="usecustomers">
                            <h2 className="">
                                <code>useCustomers</code>
                            </h2>

                            {/* Customer Logos Display */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    All customer logos with normalized sizing
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {Object.values(customers).map((customer: any) => (
                                        <div
                                            key={customer.slug}
                                            className="flex flex-col items-center space-y-2 p-4 border border-primary rounded"
                                        >
                                            <div className="flex items-center justify-center h-16 w-full">
                                                {renderCustomerLogo(customer)}
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium">{customer.name}</div>
                                                {customer.height && (
                                                    <div className="text-xs text-muted">Height: {customer.height}</div>
                                                )}
                                                {customer.featured && (
                                                    <div className="text-xs text-orange">Featured</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
