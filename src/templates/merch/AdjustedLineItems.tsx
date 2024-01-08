import { ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { cn } from '../../utils'
import { AdjustedLineItem } from './types'

type AdjustedLineItemsProps = {
    className?: string
    lineItems: AdjustedLineItem[]
}
export function AdjustedLineItems(props: AdjustedLineItemsProps): React.ReactElement {
    const { className, lineItems } = props

    const qtyAdjustedItems = lineItems.filter((item) => item.newCount !== null)

    const removedItems = lineItems.filter((item) => item.remove)

    const classes = cn('space-y-4', className)

    return (
        <div className={classes}>
            {qtyAdjustedItems?.length > 0 && (
                <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationCircleOutlined />
                        </div>
                        <div className="ml-3">
                            <div className="text-sm">
                                {qtyAdjustedItems.length > 1
                                    ? "Some items' quantities have been adjusted "
                                    : "An item's quantity has been adjusted "}
                                to reflect what's available in stock:
                            </div>

                            <div className="mt-2 text-sm">
                                {qtyAdjustedItems.map((item) => {
                                    return (
                                        <div key={item.item.shopifyId}>
                                            <div className="font-bold">{`${item.item.product.title} - ${item.item.title}`}</div>
                                            <div>New quantity: {item.newCount}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {removedItems?.length > 0 && (
                <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationCircleOutlined />
                        </div>
                        <div className="ml-3">
                            <div className="mb-1 text-sm font-medium">
                                The following {removedItems.length > 1 ? 'items have' : 'item has'} been removed because{' '}
                                {removedItems.length > 1 ? 'they are' : 'it is'} no longer in-stock:
                            </div>
                            <div className="text-sm">
                                {removedItems.map((item) => {
                                    return (
                                        <div className="font-bold" key={item.item.shopifyId}>
                                            {`${item.item.product.title}${
                                                item.item.title != 'Default Title' ? ` - ${item.item.title}` : ''
                                            }`}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
