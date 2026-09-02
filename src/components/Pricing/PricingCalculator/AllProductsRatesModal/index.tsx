import React, { useEffect, useState } from 'react'
import { IconCheck, IconPlus } from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import { pluralizeUnit } from '../../utils'

export const ALL_PRODUCTS_RATES_MODAL_KEY = 'pricing-all-rates'

type RatesProduct = {
    type: string
    name: string
    categoryName?: string
    Icon?: React.ComponentType<{ className?: string }>
    color?: string
    colorDark?: string
    unit?: string
    startsAt?: string | number
    freeLimit?: number
}

interface AllProductsRatesModalProps {
    location?: { pathname: string }
    newWindow?: boolean
    products: RatesProduct[]
    selectedTypes: string[]
    onAdd: (type: string) => void
}

export default function AllProductsRatesModal({
    products,
    selectedTypes,
    onAdd,
}: AllProductsRatesModalProps): JSX.Element {
    const { setWindowTitle, closeWindow } = useApp()
    const { appWindow } = useWindow()
    const [addedTypes, setAddedTypes] = useState(selectedTypes)

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'All products and rates')
        }
    }, [])

    const handleAdd = (type: string) => {
        if (addedTypes.includes(type)) return
        onAdd(type)
        setAddedTypes((current) => [...current, type])
    }

    const inEstimate = products.filter((product) => addedTypes.includes(product.type))

    return (
        <div data-scheme="primary" className="bg-primary text-primary w-[800px] max-w-[95vw]">
            <ScrollArea>
                <div className="p-5 max-h-[min(70vh,720px)]">
                    <p className="text-[15px] text-secondary mb-4">
                        Every product has its own monthly free tier. Rates below are what you pay per unit after it.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="text-secondary font-semibold border-b border-primary">
                                    <th className="py-2 pr-4 font-semibold">Product</th>
                                    <th className="py-2 pr-4 font-semibold">Billed on</th>
                                    <th className="py-2 pr-4 font-semibold">Free every month</th>
                                    <th className="py-2 font-semibold w-[5.5rem]" />
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(
                                    ({
                                        type,
                                        name,
                                        categoryName,
                                        Icon,
                                        color,
                                        colorDark,
                                        unit,
                                        startsAt,
                                        freeLimit,
                                    }) => {
                                        const added = addedTypes.includes(type)
                                        return (
                                            <tr key={type} className="border-b border-primary last:border-b-0">
                                                <td className="py-2.5 pr-4">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        {Icon && (
                                                            <Icon
                                                                className={`w-5 h-6 shrink-0 text-${color}${
                                                                    colorDark ? ` dark:text-${colorDark}` : ''
                                                                }`}
                                                            />
                                                        )}
                                                        <p className="m-0 font-bold leading-tight">
                                                            {categoryName || name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-2.5 pr-4">
                                                    {unit && startsAt ? (
                                                        <span>
                                                            <span className="capitalize">{pluralizeUnit(unit, 2)}</span>{' '}
                                                            <span className="text-secondary">
                                                                ${startsAt}/{unit}
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-secondary">—</span>
                                                    )}
                                                </td>
                                                <td className="py-2.5 pr-4">
                                                    {freeLimit ? (
                                                        `${Number(freeLimit).toLocaleString()} ${pluralizeUnit(
                                                            unit,
                                                            freeLimit
                                                        )} free`
                                                    ) : (
                                                        <span className="text-secondary">—</span>
                                                    )}
                                                </td>
                                                <td className="py-2.5 text-right whitespace-nowrap">
                                                    {added ? (
                                                        <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                                                            <IconCheck className="size-4" />
                                                            Added
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAdd(type)}
                                                            className="inline-flex items-center gap-1 font-semibold"
                                                        >
                                                            <IconPlus className="size-4" />
                                                            Add
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
