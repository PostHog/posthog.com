import React, { useState } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea } from 'components/OSForm'
import { IconPlus, IconMapPin } from '@posthog/icons'
import { navigate } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface Place {
    id: string
    name: string
    address: string
    type: 'Hotel' | 'Airbnb' | 'Restaurant' | 'Co-working' | 'Activity'
    rating: number
    notes: string
    events: string
}

// Mock data - replace with API call later
const mockPlaces: Place[] = []

const PlaceFormCard = ({
    formData,
    handleInputChange,
    handleSubmit,
    handleCancelAdd,
}: {
    formData: Omit<Place, 'id'>
    handleInputChange: (field: keyof Omit<Place, 'id'>, value: string | number) => void
    handleSubmit: (e: React.FormEvent) => void
    handleCancelAdd: () => void
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX: '150%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '150%' }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={handleCancelAdd}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">
                <div className="p-6">
                    <h2 className="text-2xl font-bold m-0 mb-6">Add a review</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <OSInput
                            label="Name"
                            direction="column"
                            placeholder="Name..."
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('name', e.target.value)
                            }
                            required
                        />

                        <OSInput
                            label="Address"
                            direction="column"
                            placeholder="Address..."
                            value={formData.address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('address', e.target.value)
                            }
                            required
                        />

                        <div className="flex flex-col space-y-1">
                            <label className="text-[15px] font-medium">Type</label>
                            <div className="flex gap-2 flex-wrap">
                                {(['Hotel', 'Airbnb', 'Restaurant', 'Co-working', 'Activity'] as const).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleInputChange('type', type)}
                                        className={`px-4 py-2 rounded border text-sm transition-colors ${
                                            formData.type === type
                                                ? 'bg-accent border-primary font-semibold'
                                                : 'border-border hover:border-primary'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-[15px] font-medium">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleInputChange('rating', star)}
                                        className="text-3xl hover:scale-110 transition-transform"
                                    >
                                        {star <= formData.rating ? '⭐' : '☆'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <OSTextarea
                            label="Notes"
                            direction="column"
                            placeholder="What do you like about this place?"
                            value={formData.notes}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                handleInputChange('notes', e.target.value)
                            }
                            rows={4}
                        />

                        <OSInput
                            label="Events that happened here"
                            direction="column"
                            placeholder="Type a historical event..."
                            value={formData.events}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('events', e.target.value)
                            }
                        />

                        <div className="flex gap-2 pt-4">
                            <OSButton variant="primary" size="md" type="submit" className="flex-1">
                                Save place
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

export default function Places(): JSX.Element {
    const [places, setPlaces] = useState<Place[]>(mockPlaces)
    const [isAddingPlace, setIsAddingPlace] = useState(false)
    const [formData, setFormData] = useState<Omit<Place, 'id'>>({
        name: '',
        address: '',
        type: 'Airbnb',
        rating: 0,
        notes: '',
        events: '',
    })

    const handleInputChange = (field: keyof Omit<Place, 'id'>, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newPlace: Place = {
            ...formData,
            id: Date.now().toString(),
        }
        setPlaces([...places, newPlace])
        setFormData({
            name: '',
            address: '',
            type: 'Airbnb',
            rating: 0,
            notes: '',
            events: '',
        })
        setIsAddingPlace(false)
    }

    const handleCancelAdd = () => {
        setIsAddingPlace(false)
        setFormData({
            name: '',
            address: '',
            type: 'Airbnb',
            rating: 0,
            notes: '',
            events: '',
        })
    }

    const handleRowClick = (placeId: string) => {
        navigate(`/places-reviews/${placeId}`, { state: { place: places.find((p) => p.id === placeId) } })
    }

    const columns = [
        { name: 'Name', align: 'left' as const, width: '200px' },
        { name: 'Address', align: 'left' as const, width: '250px' },
        { name: 'Type', align: 'center' as const, width: '120px' },
        { name: 'Rating', align: 'center' as const, width: '100px' },
    ]

    const rows = places.map((place) => ({
        key: place.id,
        cells: [
            {
                content: (
                    <button
                        onClick={() => handleRowClick(place.id)}
                        className="text-left font-semibold text-red dark:text-yellow hover:underline"
                    >
                        {place.name}
                    </button>
                ),
            },
            { content: place.address },
            { content: place.type },
            { content: '⭐'.repeat(place.rating) },
        ],
    }))

    return (
        <>
            <SEO title="Places - PostHog" />
            <Explorer template="generic" slug="places" title="Places" fullScreen>
                <div data-scheme="primary" className="flex h-full text-primary relative">
                    <div className="flex-1 p-8 overflow-auto">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-4xl font-bold m-0">Places</h1>
                                <OSButton
                                    variant="primary"
                                    size="md"
                                    icon={<IconPlus />}
                                    onClick={() => setIsAddingPlace(true)}
                                >
                                    Add place
                                </OSButton>
                            </div>

                            {places.length === 0 ? (
                                <div className="text-center py-12 border border-primary rounded-md bg-accent">
                                    <IconMapPin className="size-12 mx-auto mb-4 text-muted" />
                                    <p className="text-lg opacity-75 mb-4">No places added yet</p>
                                    <OSButton
                                        variant="secondary"
                                        size="sm"
                                        icon={<IconPlus />}
                                        onClick={() => setIsAddingPlace(true)}
                                    >
                                        Add your first place
                                    </OSButton>
                                </div>
                            ) : (
                                <OSTable columns={columns} rows={rows} />
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isAddingPlace && (
                            <PlaceFormCard
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                handleCancelAdd={handleCancelAdd}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </Explorer>
        </>
    )
}
