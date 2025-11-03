import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import Layout from 'components/Layout'
import SEO from 'components/seo'

interface ArtItem {
    smallImage: string
    largeImage: string
    name: string
    age: string
}

// Constants for better maintainability
const ART_IMAGE_SIZE = 90
const ART_MARGIN = 5
const FRIDGE_MAX_HEIGHT = 1700
const ART_COUNT = 4
const ROTATION_RANGE = { min: -10, max: 10 }

// List of art images with small and large versions
const ART_ITEMS: ArtItem[] = [
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/posthog_hedgehog_720_1_e6976d9368.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/posthog_hedgehog_720_1_e6976d9368.png',
        name: 'Emma',
        age: '8',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/1000038996_1_bc9ad969b7.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/1000038996_1_bc9ad969b7.png',
        name: 'Lucas',
        age: '6',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/signal_2025_10_30_11_44_39_200_1_ddd59bec22.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_1000,c_limit,q_auto,f_auto/signal_2025_10_30_11_44_39_200_1_ddd59bec22.png',
        name: 'Sophia',
        age: '9',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/pxl_20251031_100249550_720_1_1cd838c88e.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/pxl_20251031_100249550_720_1_1cd838c88e.png',
        name: 'Oliver',
        age: '7',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/95a2793a_a0c2_4149_965f_36fa6e0ca2d0_1_aefc55df3b.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/95a2793a_a0c2_4149_965f_36fa6e0ca2d0_1_aefc55df3b.png',
        name: 'Ava',
        age: '5',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/image_720_1_a2b97811a1.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/image_720_1_a2b97811a1.png',
        name: 'Noah',
        age: '8',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/img_1270_720_1_50f3793cc8.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/img_1270_720_1_50f3793cc8.png',
        name: 'Isabella',
        age: '6',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/bfeab02a_411d_4375_a699_33304a9e98a2_1_8c6c0dab64.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/bfeab02a_411d_4375_a699_33304a9e98a2_1_8c6c0dab64.png',
        name: 'Mason',
        age: '9',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/image_2_c934e4dc54.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_1000,c_limit,q_auto,f_auto/image_2_c934e4dc54.png',
        name: 'Mia',
        age: '7',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/IMG_6314_1_2f638adad6.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/IMG_6314_1_2f638adad6.png',
        name: 'Ethan',
        age: '8',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/img_1271_720_1_23689c24dc.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/h_1000,c_limit,q_auto,f_auto/img_1271_720_1_23689c24dc.png',
        name: 'Charlotte',
        age: '6',
    },
    {
        smallImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/unnamed_1_ec0889ca70.png',
        largeImage:
            'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/unnamed_1_ec0889ca70.png',
        name: 'James',
        age: '9',
    },
]

const FRIDGE_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/fridge_87a646a2b2.png'

interface ClickableArtProps {
    artItem: ArtItem
    position: { x: number; y: number }
    rotation: number
    index: number
    isSelected: boolean
    onClick: () => void
}

function ClickableArt({ artItem, position, rotation, index, isSelected, onClick }: ClickableArtProps) {
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
            }
        },
        [onClick]
    )

    return (
        <motion.div
            className="absolute cursor-pointer z-20 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 rounded"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${artItem.name}'s artwork`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
            animate={{
                opacity: 1,
                scale: isSelected ? 1.1 : 1,
                rotate: rotation,
            }}
            transition={{ duration: 0.3, delay: index * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div
                className={`relative transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-blue ring-offset-2 rounded' : ''
                }`}
                style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                }}
            >
                <img
                    src={artItem.smallImage}
                    alt={`${artItem.name}'s art`}
                    className="max-w-[90px] h-auto"
                    draggable={false}
                    loading="lazy"
                />
            </div>
        </motion.div>
    )
}

interface ArtDetailsProps {
    artItem: ArtItem | null
    maxHeight: number
}

function ArtDetails({ artItem, maxHeight }: ArtDetailsProps) {
    if (!artItem) {
        return (
            <motion.div
                className="w-full @lg:w-[850px] border border-input rounded-lg p-6 flex flex-col items-center justify-center"
                style={{ minHeight: '200px', backgroundColor: '#EEEFE9' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-secondary text-center">Click on an artwork to see details</p>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="w-full @lg:w-[850px] border border-input rounded-lg p-6 flex flex-col"
            style={{ maxHeight: `${maxHeight}px`, backgroundColor: '#EEEFE9' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-semibold mb-4 text-primary">
                {artItem.name}, {artItem.age}
            </h2>
            <div className="mb-4 flex-1 overflow-hidden flex items-start justify-center">
                <img
                    src={artItem.largeImage}
                    alt={`${artItem.name}'s art`}
                    className="max-w-full h-auto rounded object-contain"
                    style={{ maxHeight: `${maxHeight - 120}px` }}
                    loading="lazy"
                />
            </div>
        </motion.div>
    )
}

export default function FridgePage(): JSX.Element {
    const [selectedArtItems, setSelectedArtItems] = useState<ArtItem[]>([])
    const [selectedArt, setSelectedArt] = useState<ArtItem | null>(null)
    const fridgeContainerRef = useRef<HTMLDivElement>(null)
    const [positions, setPositions] = useState<{ x: number; y: number; rotation: number }[]>([])
    const [fridgeHeight, setFridgeHeight] = useState<number>(FRIDGE_MAX_HEIGHT)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Memoized random selection
    const randomArtItems = useMemo(() => {
        const shuffled = [...ART_ITEMS].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, ART_COUNT)
    }, [])

    // Randomly select 4 images on mount
    useEffect(() => {
        setSelectedArtItems(randomArtItems)
    }, [randomArtItems])

    // Track fridge height with improved performance
    useEffect(() => {
        const updateFridgeHeight = () => {
            if (fridgeContainerRef.current) {
                const fridgeImg = fridgeContainerRef.current.querySelector('img') as HTMLImageElement
                if (fridgeImg && fridgeImg.offsetHeight > 0) {
                    setFridgeHeight(fridgeImg.offsetHeight)
                    setIsLoading(false)
                }
            }
        }

        const fridgeImg = fridgeContainerRef.current?.querySelector('img') as HTMLImageElement
        if (fridgeImg) {
            if (fridgeImg.complete) {
                updateFridgeHeight()
            } else {
                fridgeImg.onload = updateFridgeHeight
                fridgeImg.onerror = () => setIsLoading(false)
            }
        }

        // Debounced resize handler
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(updateFridgeHeight, 150)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimeout)
        }
    }, [selectedArtItems])

    // Optimized collision detection with better algorithm
    const calculateNonOverlappingPositions = useCallback(
        (fridgeWidth: number, fridgeHeight: number) => {
            const imageSize = ART_IMAGE_SIZE
            const margin = ART_MARGIN
            const minSpacing = imageSize + margin * 2

            const maxX = Math.max(0, fridgeWidth - imageSize)
            const maxY = Math.max(0, fridgeHeight - imageSize)

            const calculatedPositions: { x: number; y: number; rotation: number }[] = []
            const maxAttempts = 500

            for (let i = 0; i < selectedArtItems.length; i++) {
                let attempts = 0
                let validPosition = false
                let x = 0
                let y = 0

                while (!validPosition && attempts < maxAttempts) {
                    x = Math.random() * maxX
                    y = Math.random() * maxY

                    x = Math.max(0, Math.min(x, fridgeWidth - imageSize))
                    y = Math.max(0, Math.min(y, fridgeHeight - imageSize))

                    // Optimized collision detection - check bounds first
                    validPosition = calculatedPositions.every((existing) => {
                        const dx = Math.abs(x - existing.x)
                        const dy = Math.abs(y - existing.y)
                        // Quick rejection test
                        if (dx >= minSpacing || dy >= minSpacing) return true
                        // Only calculate distance if necessary
                        const distance = Math.sqrt(dx * dx + dy * dy)
                        return distance >= minSpacing
                    })

                    attempts++
                }

                // Grid fallback for guaranteed placement
                if (!validPosition) {
                    const cols = 2
                    const rows = 2
                    const cellWidth = fridgeWidth / cols
                    const cellHeight = fridgeHeight / rows
                    const col = i % cols
                    const row = Math.floor(i / cols)
                    x = col * cellWidth + (cellWidth - imageSize) / 2
                    y = row * cellHeight + (cellHeight - imageSize) / 2
                }

                // Final bounds check
                x = Math.max(0, Math.min(x, fridgeWidth - imageSize))
                y = Math.max(0, Math.min(y, fridgeHeight - imageSize))

                const rotation = Math.random() * (ROTATION_RANGE.max - ROTATION_RANGE.min) + ROTATION_RANGE.min
                calculatedPositions.push({ x, y, rotation })
            }

            return calculatedPositions
        },
        [selectedArtItems]
    )

    // Calculate non-overlapping positions for images
    useEffect(() => {
        if (fridgeContainerRef.current && selectedArtItems.length > 0 && !isLoading) {
            const calculatePositions = () => {
                if (!fridgeContainerRef.current) return

                const container = fridgeContainerRef.current
                const fridgeWidth = container.offsetWidth || 800
                const fridgeHeight = container.offsetHeight || FRIDGE_MAX_HEIGHT

                const calculatedPositions = calculateNonOverlappingPositions(fridgeWidth, fridgeHeight)
                setPositions(calculatedPositions)
            }

            const fridgeImg = fridgeContainerRef.current.querySelector('img') as HTMLImageElement
            if (fridgeImg) {
                if (fridgeImg.complete) {
                    setTimeout(calculatePositions, 100)
                } else {
                    fridgeImg.onload = () => {
                        setTimeout(calculatePositions, 100)
                    }
                }
            } else {
                setTimeout(calculatePositions, 500)
            }
        }
    }, [selectedArtItems, isLoading, calculateNonOverlappingPositions])

    const handleArtClick = useCallback((artItem: ArtItem) => {
        setSelectedArt(artItem)
    }, [])

    return (
        <>
            <SEO title="Fridge Art - PostHog" description="PostHog fridge art gallery" />
            <Layout>
                <div className="min-h-screen bg-white text-primary py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <header className="text-center mb-12">
                            <h1 className="text-4xl @lg:text-5xl font-semibold mb-4 text-primary">Fridge Art</h1>
                            <p className="text-secondary text-lg max-w-2xl mx-auto">
                                Click on any artwork to see more details. Each refresh shows four randomly selected
                                pieces of art.
                            </p>
                        </header>

                        {/* Fridge container and details panel */}
                        <div className="flex flex-col @lg:flex-row gap-8 @lg:gap-12 @lg:items-start items-center">
                            {/* Fridge container with clickable art */}
                            <div className="flex-1 flex justify-center w-full">
                                <div className="relative">
                                    <div ref={fridgeContainerRef} className="relative inline-block">
                                        {/* Fridge image - 2x bigger */}
                                        <img
                                            src={FRIDGE_IMAGE}
                                            alt="Fridge"
                                            className="max-h-[1700px] max-w-full h-auto w-auto relative z-10 pointer-events-none select-none object-contain"
                                            loading="eager"
                                        />

                                        {/* Clickable art images */}
                                        {!isLoading &&
                                            selectedArtItems.map((artItem, index) => {
                                                const position = positions[index]
                                                if (!position) return null

                                                return (
                                                    <ClickableArt
                                                        key={`${artItem.smallImage}-${index}`}
                                                        artItem={artItem}
                                                        position={{ x: position.x, y: position.y }}
                                                        rotation={position.rotation}
                                                        index={index}
                                                        isSelected={selectedArt?.smallImage === artItem.smallImage}
                                                        onClick={() => handleArtClick(artItem)}
                                                    />
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>

                            {/* Details panel - constrained to fridge height */}
                            <aside className="w-full @lg:w-[850px] flex-shrink-0" aria-label="Artwork details">
                                <ArtDetails artItem={selectedArt} maxHeight={fridgeHeight} />
                            </aside>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
