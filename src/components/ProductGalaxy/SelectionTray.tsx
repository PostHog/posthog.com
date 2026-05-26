import React from 'react'
import type { ProductHandle } from 'hooks/productData/relationships'

interface ProductLite {
    handle: string
    name: string
    color?: string
    Icon?: React.ComponentType<{ className?: string }>
}

interface SelectionTrayProps {
    products: ProductLite[]
    selected: ReadonlySet<ProductHandle>
    onToggle: (handle: ProductHandle) => void
    onClear: () => void
}

export default function SelectionTray({ products, selected, onToggle, onClear }: SelectionTrayProps): JSX.Element {
    return (
        <div className="font-mono text-xs p-3 space-y-2 text-primary">
            <div className="flex items-center justify-between">
                <div className="uppercase tracking-widest text-secondary text-[10px]">› MY FLEET</div>
                <button
                    type="button"
                    onClick={onClear}
                    disabled={selected.size === 0}
                    className="text-[10px] uppercase tracking-widest underline text-secondary hover:text-orange disabled:opacity-30 disabled:no-underline disabled:hover:text-secondary"
                >
                    Reset
                </button>
            </div>
            <p className="text-secondary normal-case tracking-normal font-sans text-[12px]">
                Tap which products you already use. The galaxy will recommend complementary signals.
            </p>
            <ul className="flex flex-wrap gap-1.5 pt-1">
                {products.map((product) => {
                    const isOn = selected.has(product.handle)
                    return (
                        <li key={product.handle}>
                            <button
                                type="button"
                                onClick={() => onToggle(product.handle)}
                                className={`group inline-flex items-center gap-1 min-h-[24px] px-2 border text-[10px] uppercase tracking-widest font-mono transition-colors ${
                                    isOn
                                        ? 'bg-orange/15 text-primary border-orange'
                                        : 'bg-accent text-primary border-primary hover:border-orange hover:text-orange'
                                }`}
                                aria-pressed={isOn}
                            >
                                {product.Icon && (
                                    <product.Icon className={`size-3 text-${product.color ?? 'secondary'}`} />
                                )}
                                <span>{product.name}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
