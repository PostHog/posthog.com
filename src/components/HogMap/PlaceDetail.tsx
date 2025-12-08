import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import { PlaceItem, PlaceReview } from './types'
import { getPlaceIcon } from './PlacesMap'
import { getPlaceReviews, addPlaceReview, deletePlaceReview, deletePlace } from './data'
import { IconTrash, IconCheck, IconX, IconStar, IconStarFilled } from '@posthog/icons'
import dayjs from 'dayjs'

interface PlaceDetailProps {
    place: PlaceItem
    onClose: () => void
}

export default function PlaceDetail({ place, onClose }: PlaceDetailProps) {
    const { icon, colorClass } = getPlaceIcon(place.type, 'size-6')
    const { user, isModerator, getJwt } = useUser()
    const [reviews, setReviews] = useState<PlaceReview[]>([])
    const [loading, setLoading] = useState(true)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [rating, setRating] = useState(5)
    const [hoverRating, setHoverRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [wouldGoBack, setWouldGoBack] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Fetch reviews for this place
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const allReviews = (await getPlaceReviews()) as any[]
                // Filter reviews for this specific place
                const placeReviews = allReviews.filter((r) => r.place?.id === place.id) as PlaceReview[]
                setReviews(placeReviews)
            } catch (error) {
                console.error('Failed to fetch reviews:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [place.id])

    const handleSubmitReview = async () => {
        if (!reviewText.trim()) return

        try {
            setSubmitting(true)
            const jwt = await getJwt()
            if (!jwt) return

            await addPlaceReview(jwt, {
                rating,
                review: reviewText,
                wouldGoBack,
                place: place.id,
            })

            // Refresh reviews
            const allReviews = (await getPlaceReviews()) as any[]
            const placeReviews = allReviews.filter((r) => r.place?.id === place.id) as PlaceReview[]
            setReviews(placeReviews)

            // Reset form
            setReviewText('')
            setRating(5)
            setWouldGoBack(true)
            setShowReviewForm(false)
        } catch (error) {
            console.error('Failed to submit review:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteReview = async (reviewId: number) => {
        if (!confirm('Are you sure you want to delete this review?')) return

        try {
            const jwt = await getJwt()
            if (!jwt) return

            await deletePlaceReview(jwt, reviewId)

            // Refresh reviews
            const allReviews = (await getPlaceReviews()) as any[]
            const placeReviews = allReviews.filter((r) => r.place?.id === place.id) as PlaceReview[]
            setReviews(placeReviews)
        } catch (error) {
            console.error('Failed to delete review:', error)
        }
    }

    const handleDeletePlace = async () => {
        if (!confirm(`Are you sure you want to delete "${place.name}"? This will also delete all reviews.`)) return

        try {
            const jwt = await getJwt()
            if (!jwt) return

            await deletePlace(jwt, place.id)

            // Dispatch event to refresh places list
            window.dispatchEvent(new CustomEvent('hogmap:places-updated'))

            // Close the detail view
            onClose()
        } catch (error) {
            console.error('Failed to delete place:', error)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateX: '-50%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-50%' }}
            transition={{ duration: 0.3 }}
            className="absolute z-30 left-4 top-4 bottom-4 w-96 rounded bg-primary border border-primary shadow-lg z-10 overflow-hidden flex flex-col"
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1">
                <div className="p-4">
                    <div className="flex items-start gap-4 mb-6 pr-8">
                        <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${colorClass} border-2 border-white shadow-lg flex-shrink-0`}
                        >
                            {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold mb-1">{place.name}</h2>
                            <div
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded ${colorClass} text-xs font-semibold`}
                            >
                                {place.type}
                            </div>
                        </div>
                        {isModerator && (
                            <OSButton
                                size="sm"
                                icon={<IconTrash />}
                                onClick={handleDeletePlace}
                                tooltip="Delete this place"
                            />
                        )}
                    </div>

                    <div className="space-y-4 text-sm">
                        {place.address && (
                            <div>
                                <div className="text-secondary text-[13px] mb-1">Address</div>
                                <div>{place.address}</div>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div className="pt-4 border-t border-primary">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base font-semibold">Reviews ({reviews.length})</h3>
                                {user && !showReviewForm && (
                                    <OSButton size="sm" variant="secondary" onClick={() => setShowReviewForm(true)}>
                                        Add review
                                    </OSButton>
                                )}
                            </div>

                            {/* Review Form */}
                            {showReviewForm && user && (
                                <div className="mb-4 p-3 rounded border border-primary bg-accent/50">
                                    <div className="mb-3">
                                        <label className="text-[13px] text-secondary mb-1 block">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const isFilled = star <= (hoverRating || rating)
                                                return (
                                                    <button
                                                        key={star}
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="hover:scale-110 transition-transform text-yellow"
                                                    >
                                                        {isFilled ? (
                                                            <IconStarFilled className="size-6" />
                                                        ) : (
                                                            <IconStar className="size-6" />
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-[13px] text-secondary mb-1 block">
                                            Your review
                                            <span className="text-[11px] text-muted ml-2">(⌘+Enter to submit)</span>
                                        </label>
                                        <textarea
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                                                    e.preventDefault()
                                                    if (reviewText.trim() && !submitting) {
                                                        handleSubmitReview()
                                                    }
                                                }
                                            }}
                                            placeholder="Share your thoughts..."
                                            className="w-full border border-primary rounded px-3 py-2 bg-primary text-primary text-sm resize-none"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={wouldGoBack}
                                                onChange={(e) => setWouldGoBack(e.target.checked)}
                                                className="w-4 h-4 rounded border-primary"
                                            />
                                            <span className="text-[13px] text-primary">I would go back</span>
                                        </label>
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <OSButton
                                            size="md"
                                            variant="secondary"
                                            onClick={() => {
                                                setShowReviewForm(false)
                                                setReviewText('')
                                                setRating(5)
                                                setWouldGoBack(true)
                                            }}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </OSButton>
                                        <OSButton
                                            size="md"
                                            variant="primary"
                                            onClick={handleSubmitReview}
                                            disabled={!reviewText.trim() || submitting}
                                        >
                                            {submitting ? 'Submitting...' : 'Submit'}
                                        </OSButton>
                                    </div>
                                </div>
                            )}

                            {/* Reviews List */}
                            {loading ? (
                                <div className="text-[13px] text-secondary">Loading reviews...</div>
                            ) : reviews.length > 0 ? (
                                <div className="space-y-3">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-3 rounded border border-primary bg-accent/20">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex gap-0.5">
                                                    {Array.from({ length: review.rating }).map((_, i) => (
                                                        <IconStarFilled key={i} className="size-4 text-yellow" />
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-[11px] text-secondary">
                                                        {dayjs(review.createdAt).format('MMM D, YYYY')}
                                                    </div>
                                                    {isModerator && (
                                                        <button
                                                            onClick={() => handleDeleteReview(review.id)}
                                                            className="text-red hover:text-red/80 transition-colors"
                                                            title="Delete review"
                                                        >
                                                            <IconTrash className="size-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {review.notes && (
                                                <div className="text-[13px] text-primary leading-relaxed">
                                                    {review.notes}
                                                </div>
                                            )}
                                            {review.wouldGoBack !== undefined && (
                                                <div className="flex items-center gap-1 text-[11px] text-secondary mt-2">
                                                    {review.wouldGoBack ? (
                                                        <>
                                                            <IconCheck className="size-3 text-green" />
                                                            <span>Would go back</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconX className="size-3 text-red" />
                                                            <span>Would not go back</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : !showReviewForm ? (
                                <div className="text-[13px] text-secondary italic">No reviews yet.</div>
                            ) : null}
                        </div>

                        <div className="pt-4 border-t border-primary">
                            <p className="text-[13px] text-secondary italic">Recommended by the PostHog team</p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </motion.div>
    )
}
