import {
    IconBook,
    IconCalendar,
    IconCreditCard,
    IconGanttChart,
    IconListCheck,
    IconMegaphone,
    IconMessage,
    IconPeople,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import React from 'react'

type ExplorerOption =
    | 'features'
    | 'pricing'
    | 'customers'
    | 'comparison'
    | 'docs'
    | 'tutorials'
    | 'questions'
    | 'team'
    | 'roadmap'
    | 'changelog'

export default function Product({
    indexLinks,
    type,
    roadmapCategory,
}: {
    indexLinks?: ExplorerOption[]
    type: string
    roadmapCategory?: string
}): JSX.Element | null {
    const product = useProduct({ handle: type })
    if (!product) return null

    const { Icon, color, slug, name } = product

    // Create a map of options for easy lookup
    const enabledIndexLinks = new Set(indexLinks)

    // Replace individual boolean checks with Set.has()
    const showFeatures = enabledIndexLinks.has('features')
    const showPricing = enabledIndexLinks.has('pricing')
    const showCustomers = enabledIndexLinks.has('customers')
    const showComparison = enabledIndexLinks.has('comparison')
    const showDocs = enabledIndexLinks.has('docs')
    const showTutorials = enabledIndexLinks.has('tutorials')
    const showQuestions = enabledIndexLinks.has('questions')
    const showTeam = enabledIndexLinks.has('team')
    const showRoadmap = enabledIndexLinks.has('roadmap')
    const showChangelog = enabledIndexLinks.has('changelog')

    return (
        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2 p-2 relative max-w-4xl">
            {showFeatures && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<Icon className={`text-${color}`} />}
                        to={`${slug}/features`}
                        className="text-primary hover:text-primary"
                    >
                        Features
                    </OSButton>
                </div>
            )}
            {showPricing && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconCreditCard className="text-blue" />}
                        to={`${slug}/pricing`}
                        className="text-primary hover:text-primary"
                    >
                        Pricing
                    </OSButton>
                </div>
            )}
            {showCustomers && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconMegaphone className="text-orange" />}
                        to={`${slug}/customers`}
                        className="text-primary hover:text-primary"
                        state={{ newWindow: true }}
                    >
                        Social proof
                    </OSButton>
                </div>
            )}
            {showComparison && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconListCheck className="text-lime-green" />}
                        to={`${slug}/vs`}
                        className="text-primary hover:text-primary"
                    >
                        PostHog vs...
                    </OSButton>
                </div>
            )}
            {showDocs && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconBook className="text-blue" />}
                        to={`/docs${slug}`}
                        className="text-primary hover:text-primary"
                        state={{ newWindow: true }}
                    >
                        Docs
                    </OSButton>
                </div>
            )}
            {showTutorials && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconBook className="text-purple" />}
                        to={`/tutorials${slug}`}
                        className="text-primary hover:text-primary"
                    >
                        Tutorials
                    </OSButton>
                </div>
            )}
            {showQuestions && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconMessage className="text-red" />}
                        to={`/questions/topic${slug}`}
                        className="text-primary hover:text-primary"
                    >
                        Questions?
                    </OSButton>
                </div>
            )}
            {showTeam && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconPeople className="text-purple" />}
                        to={`/teams${slug}`}
                        className="text-primary hover:text-primary"
                    >
                        Team
                    </OSButton>
                </div>
            )}
            {showRoadmap && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconGanttChart className="text-seagreen" />}
                        to={`/roadmap?team=${name}`}
                        className="text-primary hover:text-primary"
                    >
                        Roadmap
                    </OSButton>
                </div>
            )}
            {showChangelog && (
                <div>
                    <OSButton
                        variant="underline"
                        asLink
                        align="left"
                        width="full"
                        size="xl"
                        icon={<IconCalendar className="text-blue" />}
                        to={`/changelog?product=${name}`}
                        className="text-primary hover:text-primary"
                    >
                        Changelog
                    </OSButton>
                </div>
            )}
        </div>
    )
}
