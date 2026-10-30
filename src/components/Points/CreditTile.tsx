import React, { useEffect, useState } from 'react'
import { IconCheck } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import CopyButton from './CopyButton'

const CREDIT_DOLLARS = 30
const CLAIM_URL = 'https://app.posthog.com/coupons/community'
const copyClass = 'min-w-0 flex flex-col p-3 @2xl:col-span-3'
const title = `$${CREDIT_DOLLARS} PostHog credit`

interface CreditOffer {
    enabled: boolean
    price: number
    redemption: { code: string | null; pointsSpent: number; createdAt: string } | null
}

function CreditMark({ className = '' }: { className?: string }) {
    return (
        <div className={`p-3 ${className}`}>
            <div className="aspect-square w-full rounded bg-black flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-tan leading-none">${CREDIT_DOLLARS}</span>
                <span className="text-xs font-bold text-gold mt-1 uppercase tracking-wider">PostHog credit</span>
            </div>
        </div>
    )
}

async function readCredit(getJwt: () => Promise<string | null>): Promise<CreditOffer | null> {
    const jwt = await getJwt()
    if (!jwt) return null

    const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/points/credit`, {
        headers: { Authorization: `Bearer ${jwt}` },
    })
    if (!response.ok) return null

    const body = await response.json().catch(() => null)
    const data = body?.data
    if (!data || typeof data.enabled !== 'boolean' || typeof data.price !== 'number') return null
    return data
}

export default function CreditTile() {
    const { setConfetti } = useApp()
    const { user, getJwt, fetchUser } = useUser()
    // `undefined` until the GET returns. `null` means there is nothing to show.
    const [offer, setOffer] = useState<CreditOffer | null | undefined>(undefined)
    const [confirming, setConfirming] = useState(false)
    const [posting, setPosting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const total = user?.wallet?.balance ?? 0

    useEffect(() => {
        if (!user?.id) return

        readCredit(getJwt)
            .then(setOffer)
            .catch((err) => {
                console.error('Failed to load PostHog credit', err)
                setOffer(null)
            })
    }, [user?.id])

    const redeem = async () => {
        if (posting || !offer) return
        setPosting(true)
        setError(null)

        try {
            const jwt = await getJwt()
            if (!jwt) {
                setError('Failed to redeem points')
                return
            }

            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/points/credit/redeem`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${jwt}` },
            })
            const body = await response.json().catch(() => null)
            const data = body?.data
            setConfirming(false)

            if (response.status === 403) {
                setOffer((current) => (current ? { ...current, enabled: false, redemption: null } : current))
                return
            }

            if (response.status === 400) {
                setError(body?.error?.message || 'Insufficient balance')
                await fetchUser().catch((err) => console.error('Failed to refresh points balance', err))
                return
            }

            // 502, or a success that has not returned a code yet: points are already spent.
            if (response.status === 502 || (response.ok && data && !data.code)) {
                setOffer((current) => {
                    if (!current || current.redemption) return current
                    return {
                        ...current,
                        redemption: { code: null, pointsSpent: current.price, createdAt: '' },
                    }
                })
                await fetchUser().catch((err) => console.error('Failed to refresh points balance', err))
                return
            }

            if (response.ok && data?.code) {
                setOffer((current) =>
                    current
                        ? {
                              ...current,
                              redemption: {
                                  code: data.code,
                                  pointsSpent: data.pointsSpent,
                                  createdAt: data.createdAt,
                              },
                          }
                        : current
                )
                setConfetti(true)
                await fetchUser().catch((err) => console.error('Failed to refresh points balance', err))
                return
            }

            setError(body?.error?.message || 'Failed to redeem points')
        } catch (err) {
            console.error('Failed to redeem PostHog credit', err)
            setError('Failed to redeem points')
            setConfirming(false)
        } finally {
            setPosting(false)
        }
    }

    const code = offer?.redemption?.code || null
    const pending = Boolean(offer?.redemption) && !code
    if (!offer || (!offer.enabled && !offer.redemption)) return null

    const canRedeem = total >= offer.price
    const pointsNeeded = offer.price - total
    // Confirming keeps the card chrome. A failed or in-flight retry outlines it.
    const active = Boolean(error) || (posting && !confirming)

    const shell = `border rounded-md grid gap-3 @md:grid-cols-2 @2xl:grid-cols-4 transition-all duration-200 ${
        code
            ? 'border-green bg-green/5 dark:bg-green/10'
            : active
            ? 'border-orange bg-orange/5 dark:bg-orange/10'
            : 'border-primary'
    }`

    const dismiss = () => {
        setConfirming(false)
        setError(null)
    }

    return (
        <section>
            <h3 className="text-base font-bold m-0 mb-3">Redeem for PostHog credit</h3>
            <div className={shell}>
                {code ? (
                    <>
                        <CreditMark />
                        <div className={`${copyClass} gap-2 items-start`}>
                            <div className="flex items-start justify-between gap-3 w-full">
                                <h4 className="font-bold m-0">{title}</h4>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green shrink-0">
                                    <IconCheck className="size-4" />
                                    Redeemed
                                </span>
                            </div>
                            <div className="rounded bg-accent border border-primary py-1.5 px-2 flex justify-between items-center">
                                <p className="font-bold font-code m-0 text-sm tracking-wide truncate mr-2">{code}</p>
                                <CopyButton text={code} />
                            </div>
                            <p className="text-sm text-muted m-0">Submit this code in the PostHog app.</p>
                            <OSButton size="sm" variant="primary" asLink external to={CLAIM_URL} className="self-start">
                                Claim in PostHog
                            </OSButton>
                        </div>
                    </>
                ) : pending ? (
                    <>
                        <CreditMark className={posting ? 'opacity-50' : ''} />
                        <div className={copyClass}>
                            <div className="flex items-start justify-between gap-3">
                                <h4 className="font-bold m-0">{title}</h4>
                                <span className="text-sm font-bold shrink-0">
                                    {offer.redemption?.pointsSpent || offer.price} pts
                                </span>
                            </div>
                            <p className="text-sm m-0 mt-2">We couldn't issue your code.</p>
                            <div className="flex items-end justify-between gap-3 mt-auto pt-3">
                                <p className="text-xs text-muted m-0">Trying again won't spend more points.</p>
                                <OSButton size="sm" variant="primary" onClick={redeem} disabled={posting}>
                                    {posting ? '...' : 'Try again'}
                                </OSButton>
                            </div>
                        </div>
                    </>
                ) : error ? (
                    <>
                        <CreditMark className="opacity-50" />
                        <div className={copyClass}>
                            <div className="flex items-start justify-between gap-3">
                                <h4 className="font-bold m-0">{title}</h4>
                                <span className="text-sm font-bold shrink-0">{offer.price} pts</span>
                            </div>
                            <p className="text-sm text-red m-0 mt-2">{error}</p>
                            <div className="flex justify-end mt-auto pt-3">
                                <OSButton size="sm" variant="secondary" onClick={dismiss}>
                                    Try again
                                </OSButton>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <CreditMark />
                        <div className={copyClass}>
                            <div className="flex items-start justify-between gap-3">
                                <h4 className="font-bold m-0">{title}</h4>
                                <span className="text-sm font-bold shrink-0">{offer.price} pts</span>
                            </div>
                            <p className="text-sm m-0 mt-2">To redeem, you need:</p>
                            <ul className="text-sm m-0 mt-1 pl-5 list-disc">
                                <li>Admin or Owner role in your org</li>
                                <li>A card on file</li>
                            </ul>
                            <div className="flex items-end justify-between gap-3 mt-auto pt-3">
                                <p className="text-xs text-muted m-0">Limited to one per org during the beta.</p>
                                {canRedeem ? (
                                    confirming ? (
                                        <div className="flex gap-2 shrink-0">
                                            <OSButton
                                                size="sm"
                                                variant="secondary"
                                                onClick={dismiss}
                                                disabled={posting}
                                            >
                                                Cancel
                                            </OSButton>
                                            <OSButton size="sm" variant="primary" onClick={redeem} disabled={posting}>
                                                {posting ? '...' : 'Confirm'}
                                            </OSButton>
                                        </div>
                                    ) : (
                                        <OSButton size="sm" variant="primary" onClick={() => setConfirming(true)}>
                                            Redeem
                                        </OSButton>
                                    )
                                ) : (
                                    <span className="text-sm text-muted shrink-0">{pointsNeeded} to go</span>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
