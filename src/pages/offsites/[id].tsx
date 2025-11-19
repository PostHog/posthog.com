import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'
import OSButton from 'components/OSButton'
import { IconArrowLeft, IconPencil } from '@posthog/icons'
import { navigate } from 'gatsby'
import { Fieldset } from 'components/OSFieldset'

interface Offsite {
    id: string
    // Schema to be defined later
}

interface OffsiteDetailProps {
    location: {
        state?: {
            offsite?: Offsite
        }
    }
}

export default function OffsiteDetail({ location }: OffsiteDetailProps): JSX.Element {
    const offsite = location.state?.offsite

    if (!offsite) {
        return (
            <>
                <SEO title="Offsite Not Found - PostHog" />
                <ReaderView
                    title="Offsites"
                    leftSidebar={<TreeMenu items={internalToolsNav} />}
                    description="Offsite details"
                    showQuestions={false}
                >
                    <div className="@container text-primary">
                        <div className="space-y-8">
                            <OSButton
                                variant="secondary"
                                size="sm"
                                icon={<IconArrowLeft />}
                                onClick={() => navigate('/offsites')}
                            >
                                Back to offsites
                            </OSButton>
                            <div className="text-center py-12">
                                <h2>Offsite not found</h2>
                                <p className="text-lg opacity-75">
                                    This offsite doesn't exist or the data couldn't be loaded.
                                </p>
                            </div>
                        </div>
                    </div>
                </ReaderView>
            </>
        )
    }

    return (
        <>
            <SEO title={`Offsite ${offsite.id} - PostHog`} />
            <ReaderView
                title="Offsites"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                description={`Details for offsite ${offsite.id}`}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="space-y-8">
                        <OSButton
                            variant="secondary"
                            size="sm"
                            icon={<IconArrowLeft />}
                            onClick={() => navigate('/offsites')}
                        >
                            Back to offsites
                        </OSButton>

                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold m-0">Offsite {offsite.id}</h1>
                            </div>
                            <OSButton variant="secondary" size="md" icon={<IconPencil />}>
                                Edit
                            </OSButton>
                        </div>

                        <div className="grid gap-6">
                            <Fieldset legend="Details">
                                <p className="m-0">Details coming soon...</p>
                            </Fieldset>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
