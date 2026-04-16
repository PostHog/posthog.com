import React, { useState } from 'react'
import OSButton from 'components/OSButton'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import { createCartQuery, shopifyStorefrontUrl, shopifyHeaders } from '../../lib/shopify'
import CopyButton from './CopyButton'
import type { Reward, RewardCardState } from './types'

function RewardImage({
    reward,
    className = '',
    children,
}: {
    reward: Reward
    className?: string
    children?: React.ReactNode
}) {
    return (
        <div
            className={`aspect-square rounded overflow-hidden relative ${
                reward.merchStoreHandle ? 'bg-accent p-2' : ''
            } ${className}`}
        >
            {reward.merchStoreHandle ? (
                <img
                    src={reward.image}
                    alt={reward.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain rounded"
                />
            ) : (
                <div
                    className={`w-full h-full flex flex-col items-center justify-center from-blue/40 via-yellow/30 to-red/40 ${
                        (reward.discountAmount || 0) <= 10
                            ? 'bg-gradient-to-br'
                            : (reward.discountAmount || 0) <= 30
                            ? 'bg-gradient-to-b'
                            : 'bg-gradient-to-tl'
                    }`}
                >
                    <span className="text-5xl font-black text-black drop-shadow-sm">${reward.discountAmount}</span>
                    <span className="text-xs font-bold text-black/60 mt-1 uppercase tracking-wider">merch credit</span>
                </div>
            )}
            {children}
        </div>
    )
}

async function getProductVariantId(handle: string): Promise<string | null> {
    const query = `
        query getProductByHandle($handle: String!) {
            productByHandle(handle: $handle) {
                variants(first: 1) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        }
    `

    const response = await fetch(shopifyStorefrontUrl, {
        method: 'POST',
        headers: shopifyHeaders,
        body: JSON.stringify({ query, variables: { handle } }),
    })

    const { data } = await response.json()
    return data?.productByHandle?.variants?.edges?.[0]?.node?.id || null
}

export default function RewardCard({ reward, total }: { reward: Reward; total: number }) {
    const { setConfetti } = useApp()
    const { getJwt, fetchUser } = useUser()

    const [state, setState] = useState<RewardCardState>('idle')
    const [couponCode, setCouponCode] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isRedirecting, setIsRedirecting] = useState(false)

    const canRedeem = total >= reward.price
    const pointsNeeded = reward.price - total
    const isActive = state !== 'idle'

    const handleRedeem = () => {
        setState('confirming')
    }

    const handleCancel = () => {
        setState('idle')
        setError(null)
    }

    const handleUseInStore = async () => {
        if (!couponCode || !reward.merchStoreHandle) return

        setIsRedirecting(true)

        try {
            const variantId = await getProductVariantId(reward.merchStoreHandle)
            if (!variantId) {
                throw new Error('Product not found')
            }

            const cart = (await createCartQuery({
                input: {
                    lines: [{ merchandiseId: variantId, quantity: 1 }],
                    discountCodes: [couponCode],
                },
            })) as { checkoutUrl?: string } | void

            const checkoutUrl = cart?.checkoutUrl
            if (checkoutUrl) {
                window.open(checkoutUrl, '_blank')
            }
        } catch (err) {
            console.error('Failed to create cart:', err)
            window.open('/merch', '_blank')
        } finally {
            setIsRedirecting(false)
        }
    }

    const handleConfirm = async () => {
        setState('loading')
        setError(null)

        try {
            const jwt = await getJwt()
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/points/redeem`, {
                method: 'POST',
                body: JSON.stringify({
                    handle: reward.handle,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const { data, error: apiError } = await response.json()

            if (!response.ok || apiError) {
                throw new Error(apiError?.message || 'Failed to redeem points')
            }

            if (!data?.code) {
                throw new Error('Failed to redeem points')
            }
            setCouponCode(data.code)
            setState('success')
            setConfetti(true)
            await fetchUser()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.')
            setState('error')
        }
    }

    return (
        <div
            className={`border rounded-md p-3 flex flex-col transition-all duration-200 ${
                state === 'success'
                    ? 'border-green bg-green/5 dark:bg-green/10'
                    : isActive
                    ? 'border-orange bg-orange/5 dark:bg-orange/10'
                    : canRedeem
                    ? 'border-primary'
                    : 'border-primary opacity-60'
            }`}
        >
            {state === 'idle' && (
                <>
                    <RewardImage reward={reward} className="mb-3" />
                    <h4 className="font-bold m-0 text-sm">{reward.title}</h4>
                    <p className="text-xs text-muted m-0 mb-2 flex-grow">{reward.description}</p>
                    <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${canRedeem ? 'text-green' : 'text-muted'}`}>
                            {reward.price} pts
                        </span>
                        <OSButton
                            size="sm"
                            variant={canRedeem ? 'primary' : 'secondary'}
                            disabled={!canRedeem}
                            onClick={handleRedeem}
                        >
                            {canRedeem ? 'Redeem' : `${pointsNeeded} pts`}
                        </OSButton>
                    </div>
                </>
            )}

            {(state === 'confirming' || state === 'loading') && (
                <>
                    <RewardImage reward={reward} className={state === 'loading' ? 'opacity-50' : ''} />
                    <div className="text-center flex-grow flex flex-col justify-center py-2">
                        <h4 className="font-bold m-0 text-sm">{reward.title}</h4>
                        <p className="text-xs text-muted m-0">
                            Redeem <strong className="text-orange">{reward.price} pts</strong>?
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <OSButton
                            size="sm"
                            variant="secondary"
                            width="full"
                            onClick={handleCancel}
                            disabled={state === 'loading'}
                        >
                            Cancel
                        </OSButton>
                        <OSButton
                            size="sm"
                            variant="primary"
                            width="full"
                            onClick={handleConfirm}
                            disabled={state === 'loading'}
                        >
                            {state === 'loading' ? '...' : 'Confirm'}
                        </OSButton>
                    </div>
                </>
            )}

            {state === 'error' && (
                <>
                    <RewardImage reward={reward} className="mb-3 opacity-50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-red text-white text-xs font-bold px-2 py-1 rounded">Failed</span>
                        </div>
                    </RewardImage>
                    <p className="text-xs text-red m-0 mb-2 text-center mt-auto">{error || 'Something went wrong'}</p>
                    <OSButton size="sm" variant="secondary" width="full" onClick={handleCancel}>
                        Try again
                    </OSButton>
                </>
            )}

            {state === 'success' && couponCode && (
                <>
                    <RewardImage reward={reward} className="mb-2" />
                    <div className="mt-auto">
                        <div className="rounded bg-accent border border-primary py-1.5 px-2 flex justify-between items-center mb-2">
                            <p className="font-bold font-code m-0 text-sm tracking-wide truncate">{couponCode}</p>
                            <CopyButton text={couponCode} />
                        </div>

                        <OSButton
                            size="sm"
                            variant="primary"
                            width="full"
                            asLink
                            to={`/merch?coupon=${couponCode}&state=cart${
                                reward.merchStoreHandle ? `&add=${reward.merchStoreHandle}` : ''
                            }`}
                            state={{ newWindow: true }}
                        >
                            Use in store
                        </OSButton>
                        {reward.merchStoreHandle && (
                            <OSButton
                                size="sm"
                                variant="secondary"
                                width="full"
                                onClick={handleUseInStore}
                                disabled={isRedirecting}
                                className="mt-1"
                            >
                                {isRedirecting ? 'Opening...' : 'Order now'}
                            </OSButton>
                        )}

                        <div className="flex justify-center">
                            <button
                                onClick={handleCancel}
                                className="text-xs text-muted hover:text-primary mt-2 transition-colors leading-none text-center"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
