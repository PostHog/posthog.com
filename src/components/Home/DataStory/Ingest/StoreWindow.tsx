import React, { forwardRef, useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import { cn } from '../../../../utils'

const STICKER_PRICE = 4
const PROMO_CODE = 'HOGZILLA'
const PROMO_DISCOUNT = 0.2
const FINISHES = ['Matte', 'Glossy', 'Holo']
const STICKER_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/min_hogzilla_sticker_456e11eede.png'
const BAG_ICON = 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_Shopping_Bag_Style_Modern_cd937c7872.png'

const Storefront = ({ onAddToCart }: { onAddToCart: (quantity: number) => void }) => {
    const [finish, setFinish] = useState(FINISHES[0])
    const [quantity, setQuantity] = useState(1)
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
                            <s className="mr-1 font-normal text-muted">${(STICKER_PRICE * quantity).toFixed(2)}</s>
                        )}
                        ${total.toFixed(2)}
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
                        max={10}
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        className="w-full max-w-36 accent-orange"
                    />
                    <span className="w-4 tabular-nums text-primary">{quantity}</span>
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
                    <OSButton variant="primary" size="sm" onClick={() => onAddToCart(quantity)}>
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

const StoreWindow = forwardRef<HTMLDivElement, { captured: number; className?: string; style?: React.CSSProperties }>(
    function StoreWindow({ captured, className, style }, ref) {
        const [cartCount, setCartCount] = useState(0)
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
                        cart <span className="tabular-nums text-secondary">{cartCount}</span>
                    </span>
                </header>
                <Storefront onAddToCart={(quantity) => setCartCount((count) => count + quantity)} />
                <footer className="flex items-center gap-1.5 rounded-b-md border-t border-primary px-3 py-1.5 font-mono text-[11px] text-muted">
                    <span className="text-secondary">posthog.capture()</span>
                    <span>·</span>
                    <span className="tabular-nums">
                        {captured.toLocaleString('en-US')} {captured === 1 ? 'event' : 'events'}
                    </span>
                </footer>
            </div>
        )
    }
)

export default StoreWindow
