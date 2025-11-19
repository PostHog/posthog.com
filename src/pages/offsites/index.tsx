import React, { useState } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import { IconPlus, IconMapPin } from '@posthog/icons'
import { navigate } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface Offsite {
    id: string
    // Schema to be defined later
}

// Mock data - replace with API call later
const mockOffsites: Offsite[] = []

const OffsiteFormCard = ({ handleCancelAdd }: { handleCancelAdd: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX: '-50%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-50%' }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={handleCancelAdd}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">
                <div className="p-6">
                    <h2 className="text-2xl font-bold m-0 mb-6">Add offsite</h2>
                    <form className="space-y-6">
                        <p className="text-secondary">Form fields coming soon...</p>

                        <div className="flex gap-2 pt-4">
                            <OSButton variant="primary" size="md" type="submit" className="flex-1">
                                Save offsite
                            </OSButton>
                            <OSButton variant="secondary" size="md" onClick={handleCancelAdd} type="button">
                                Cancel
                            </OSButton>
                        </div>
                    </form>
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default function Offsites(): JSX.Element {
    const [offsites] = useState<Offsite[]>(mockOffsites)
    const [isAddingOffsite, setIsAddingOffsite] = useState(false)

    const handleCancelAdd = () => {
        setIsAddingOffsite(false)
    }

    const handleRowClick = (offsiteId: string) => {
        navigate(`/offsites/${offsiteId}`, { state: { offsite: offsites.find((o) => o.id === offsiteId) } })
    }

    const columns = [
        { name: 'Name', align: 'left' as const, width: '300px' },
        { name: 'Location', align: 'left' as const, width: '200px' },
        { name: 'Date', align: 'center' as const, width: '150px' },
    ]

    const rows = offsites.map((offsite) => ({
        key: offsite.id,
        cells: [
            {
                content: (
                    <button
                        onClick={() => handleRowClick(offsite.id)}
                        className="text-left font-semibold text-red dark:text-yellow hover:underline"
                    >
                        Offsite {offsite.id}
                    </button>
                ),
            },
            { content: '-' },
            { content: '-' },
        ],
    }))

    return (
        <>
            <SEO title="Offsites - PostHog" />
            <Explorer template="generic" slug="offsites" title="Offsites" fullScreen>
                <div data-scheme="primary" className="flex h-full text-primary relative">
                    <div className="flex-1 p-8 overflow-auto">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-4xl font-bold m-0">Offsites</h1>
                                <OSButton
                                    variant="primary"
                                    size="md"
                                    icon={<IconPlus />}
                                    onClick={() => setIsAddingOffsite(true)}
                                >
                                    Add offsite
                                </OSButton>
                            </div>

                            {offsites.length === 0 ? (
                                <div className="text-center py-12 border border-primary rounded-md bg-accent">
                                    <IconMapPin className="size-12 mx-auto mb-4 text-muted" />
                                    <p className="text-lg opacity-75 mb-4">No offsites added yet</p>
                                    <OSButton
                                        variant="secondary"
                                        size="sm"
                                        icon={<IconPlus />}
                                        onClick={() => setIsAddingOffsite(true)}
                                    >
                                        Add your first offsite
                                    </OSButton>
                                </div>
                            ) : (
                                <OSTable columns={columns} rows={rows} />
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isAddingOffsite && <OffsiteFormCard handleCancelAdd={handleCancelAdd} />}
                    </AnimatePresence>
                </div>
            </Explorer>
        </>
    )
}
