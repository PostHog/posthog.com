import React, { forwardRef, useEffect, useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import { cn } from '../../../../utils'

export const STICKER_PRICE = 4
const PROMO_CODE = 'HOGZILLA'
const PROMO_DISCOUNT = 0.2
const SLIDER_MAX = 10
const MAX_QUANTITY = 1_000_000_000
const FINISHES = ['Matte', 'Glossy', 'Holo']
const STICKER_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/min_hogzilla_sticker_456e11eede.png'
const PAYMENT_MS = 900
const PAID_MS = 1600
const BAG_ICON = 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_Shopping_Bag_Style_Modern_cd937c7872.png'

export interface Order {
    stickers: number
    amount: number
}

export const formatDollars = (amount: number): string =>
    amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    })

const EMPTY_CART: Order = { stickers: 0, amount: 0 }

const COMPACT_PRICE_FROM = 100_000

const formatPrice = (amount: number): string =>
    amount >= COMPACT_PRICE_FROM
        ? amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 1,
          })
        : amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

const Storefront = ({ onAddToCart }: { onAddToCart: (order: Order) => void }) => {
    const [finish, setFinish] = useState(FINISHES[0])
    const [quantityText, setQuantityText] = useState('1')
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(quantityText)) || 1))
    const [promo, setPromo] = useState('')
    const hasDiscount = promo.trim().toUpperCase() === PROMO_CODE
    const total = STICKER_PRICE * quantity * (hasDiscount ? 1 - PROMO_DISCOUNT : 1)

    return (
        <div className="flex gap-4 p-4">
            <div className="flex size-24 shrink-0 items-center justify-center rounded border border-primary bg-accent @md:size-28">
                <CloudinaryImage src={STICKER_IMAGE} width={224} alt="Hogzilla sticker" imgClassName="w-20 @md:w-24" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-2">
                    <strong className="text-[15px] leading-tight">Hogzilla sticker</strong>
                    <span className="text-sm font-semibold tabular-nums">
                        {hasDiscount && (
                            <s className="mr-1 font-normal text-muted">{formatPrice(STICKER_PRICE * quantity)}</s>
                        )}
                        {formatPrice(total)}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Finish">
                    {FINISHES.map((option) => (
                        <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={finish === option}
                            onClick={() => setFinish(option)}
                            className={cn(
                                'rounded border px-2 py-0.5 text-xs font-semibold',
                                finish === option
                                    ? 'border-primary bg-accent text-primary'
                                    : 'border-transparent text-secondary hover:border-primary'
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-secondary">
                    Qty
                    <input
                        type="range"
                        min={1}
                        max={SLIDER_MAX}
                        value={Math.min(quantity, SLIDER_MAX)}
                        onChange={(event) => setQuantityText(event.target.value)}
                        className="w-full min-w-0 max-w-36 accent-orange"
                    />
                    <input
                        type="text"
                        inputMode="numeric"
                        aria-label="Quantity"
                        value={quantityText}
                        onChange={(event) => setQuantityText(event.target.value.replace(/\D/g, '').slice(0, 10))}
                        onBlur={() => setQuantityText(String(quantity))}
                        className="min-w-[2ch] rounded border border-transparent bg-transparent px-1 tabular-nums text-primary hover:border-input focus:border-input focus:bg-input focus:outline-none"
                        style={{ width: `${Math.max(2, quantityText.length) + 2}ch` }}
                    />
                </label>
                <div className="flex flex-wrap items-center gap-2">
                    <input
                        type="text"
                        value={promo}
                        onChange={(event) => setPromo(event.target.value)}
                        placeholder="Promo code"
                        aria-label="Promo code"
                        className="w-28 rounded border border-input bg-input px-2 py-1 text-xs text-primary placeholder:text-muted"
                    />
                    <OSButton
                        variant="primary"
                        size="sm"
                        onClick={() => onAddToCart({ stickers: quantity, amount: total })}
                    >
                        Add to cart
                    </OSButton>
                </div>
                <p className="m-0 text-[11px] leading-none text-muted">
                    Psst: try <span className="font-mono text-secondary">{PROMO_CODE}</span>
                </p>
            </div>
        </div>
    )
}

type CheckoutState = 'idle' | 'paying' | 'paid'

const StoreWindow = forwardRef<
    HTMLDivElement,
    {
        captured: number
        onCheckout?: () => void
        onPaid?: (order: Order) => void
        className?: string
        style?: React.CSSProperties
    }
>(function StoreWindow({ captured, onCheckout, onPaid, className, style }, ref) {
    const [cart, setCart] = useState(EMPTY_CART)
    const [checkout, setCheckout] = useState<CheckoutState>('idle')

    useEffect(() => {
        if (checkout === 'idle') return
        const timer = window.setTimeout(
            () => {
                if (checkout === 'paying') {
                    onPaid?.(cart)
                    setCart(EMPTY_CART)
                    setCheckout('paid')
                } else setCheckout('idle')
            },
            checkout === 'paying' ? PAYMENT_MS : PAID_MS
        )
        return () => window.clearTimeout(timer)
    }, [checkout])

    const startCheckout = () => {
        onCheckout?.()
        setCheckout('paying')
    }
    return (
        <div
            ref={ref}
            style={style}
            className={cn('rounded-md border border-primary bg-primary shadow-2xl @container', className)}
        >
            <header className="flex items-center gap-2 rounded-t-md border-b border-primary bg-accent px-3 py-1.5 text-sm font-semibold text-primary">
                <CloudinaryImage src={BAG_ICON} width={36} alt="" imgClassName="size-[18px]" />
                Your product
                <span className="ml-auto font-mono text-[11px] font-normal text-muted">
                    cart <span className="tabular-nums text-secondary">{cart.stickers.toLocaleString('en-US')}</span>
                </span>
                <button
                    type="button"
                    onClick={startCheckout}
                    disabled={cart.stickers === 0 || checkout !== 'idle'}
                    className={cn(
                        'rounded border px-2 py-0.5 text-[11px] font-semibold transition-colors',
                        checkout === 'paid'
                            ? 'border-green bg-green/10 text-green'
                            : 'border-primary bg-primary text-primary enabled:hover:border-orange disabled:text-muted'
                    )}
                >
                    {checkout === 'paying'
                        ? 'Paying…'
                        : checkout === 'paid'
                        ? 'Paid ✓'
                        : `Checkout${cart.stickers ? ` ${formatPrice(cart.amount)}` : ''}`}
                </button>
            </header>
            <Storefront
                onAddToCart={(order) =>
                    setCart((current) => ({
                        stickers: current.stickers + order.stickers,
                        amount: current.amount + order.amount,
                    }))
                }
            />
            <footer className="flex items-center gap-1.5 rounded-b-md border-t border-primary px-3 py-1.5 font-mono text-[11px] text-muted">
                <span className="text-secondary">posthog.capture()</span>
                <span>·</span>
                <span className="tabular-nums">
                    {captured.toLocaleString('en-US')} {captured === 1 ? 'event' : 'events'}
                </span>
            </footer>
        </div>
    )
})

export default StoreWindow
