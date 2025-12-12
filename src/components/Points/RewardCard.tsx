import React, { useState } from 'react'
import OSButton from 'components/OSButton'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import CopyButton from './CopyButton'
import type { Reward, RewardCardState } from './types'

export default function RewardCard({ reward, total }: { reward: Reward; total: number }) {
    const { setConfetti } = useApp()
    const { getJwt, fetchUser } = useUser()

    const [state, setState] = useState<RewardCardState>('idle')
    const [couponCode, setCouponCode] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

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
            className={`border rounded-md p-3 flex flex-col transition-all ${
                isActive
                    ? 'border-orange bg-orange/5 dark:bg-orange/10'
                    : canRedeem
                    ? 'border-green bg-green/5 dark:bg-green/10'
                    : 'border-primary opacity-60'
            }`}
        >
            {state === 'idle' && (
                <>
                    <div className="aspect-square rounded overflow-hidden bg-accent mb-3 p-2">
                        <img
                            src={reward.image}
                            alt={reward.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                    </div>
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
                            {canRedeem ? 'Redeem' : `${pointsNeeded} more`}
                        </OSButton>
                    </div>
                </>
            )}

            {(state === 'confirming' || state === 'loading') && (
                <>
                    <div className="aspect-square rounded overflow-hidden bg-accent opacity-50 p-2">
                        <img
                            src={reward.image}
                            alt={reward.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                    </div>
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
                    <div className="aspect-square rounded overflow-hidden bg-accent mb-3 relative p-2">
                        <img
                            src={reward.image}
                            alt={reward.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-red text-white text-xs font-bold px-2 py-1 rounded">Failed</span>
                        </div>
                    </div>
                    <p className="text-xs text-red m-0 mb-2 text-center mt-auto">{error || 'Something went wrong'}</p>
                    <OSButton size="sm" variant="secondary" width="full" onClick={handleCancel}>
                        Try again
                    </OSButton>
                </>
            )}

            {state === 'success' && couponCode && (
                <>
                    <div className="aspect-square rounded overflow-hidden bg-accent mb-3 relative p-2">
                        <img
                            src={reward.image}
                            alt={reward.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-green/20 flex items-center justify-center">
                            <span className="bg-green text-white text-xs font-bold px-2 py-1 rounded">It's yours!</span>
                        </div>
                    </div>
                    <div className="rounded bg-accent border border-primary py-1 px-2 flex justify-between items-center mb-2">
                        <p className="font-bold font-code m-0 text-xs tracking-wide truncate">{couponCode}</p>
                        <CopyButton text={couponCode} />
                    </div>
                    <OSButton size="sm" variant="primary" width="full" asLink to="/merch" state={{ newWindow: true }}>
                        Use in store
                    </OSButton>
                    <button
                        onClick={handleCancel}
                        className="text-xs text-muted hover:text-primary mt-2 transition-colors leading-none"
                    >
                        Done
                    </button>
                </>
            )}
        </div>
    )
}
