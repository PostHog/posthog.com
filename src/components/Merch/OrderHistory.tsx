import Logo from 'components/Logo'
import React from 'react'
import dayjs from 'dayjs'
import { IconSpinner } from '@posthog/icons'

export default function OrderHistory({ orders }: { orders: any[] }) {
    const formatPrice = (price: string) => {
        const amount = parseFloat(price)
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const formatFulfillmentStatus = (status: string | null) => {
        if (!status) return 'Processing'

        const statusMap: { [key: string]: string } = {
            fulfilled: 'Shipped',
            unfulfilled: 'Processing',
            'partially fulfilled': 'Partially fulfilled',
            scheduled: 'Scheduled',
            'on hold': 'On hold',
        }

        return statusMap[status.toLowerCase()] || 'Processing'
    }

    const formatReceiptDate = (dateString: string) => {
        return dayjs(dateString).format('MMM D, YYYY h:mm A')
    }

    const ordersToDisplay = orders

    return (
        <>
            <div className="grid grid-cols-1 @xl:grid-cols-2 gap-4 p-4">
                {ordersToDisplay.map((order: any) => {
                    const orderDetails = order.orderDetails

                    return (
                        <a
                            href={orderDetails.orderStatusUrl || order.statusURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={order.id}
                            className="group active:translate-y-[1px]"
                        >
                            <article
                                className="bg-white dark:bg-black/40 relative h-full"
                                style={{
                                    clipPath:
                                        'polygon(0% 1.3%, 1.25% 0.3%, 3% 1.5%, 4.5% 0.2%, 6.25% 1.2%, 8% 0.5%, 9.5% 1.3%, 11.25% 0.3%, 13% 1%, 14.5% 0.2%, 16.25% 1.5%, 18% 0.7%, 19.5% 1.3%, 21.25% 0.2%, 23% 1.2%, 24.5% 0.5%, 26.25% 1.3%, 28% 0.2%, 29.5% 1%, 31.25% 1.5%, 33% 0.3%, 34.5% 1.2%, 36.25% 0.7%, 38% 1.3%, 39.5% 0.2%, 41.25% 1%, 43% 1.5%, 44.5% 0.5%, 46.25% 1.3%, 48% 0.3%, 49.5% 1.2%, 51.25% 0.2%, 53% 1.3%, 54.5% 0.7%, 56.25% 1.5%, 58% 0.3%, 59.5% 1%, 61.25% 0.5%, 63% 1.3%, 64.5% 0.2%, 66.25% 1.2%, 68% 0.7%, 69.5% 1.5%, 71.25% 0.3%, 73% 1%, 74.5% 0.5%, 76.25% 1.3%, 78% 0.2%, 79.5% 1.2%, 81.25% 0.7%, 83% 1.5%, 84.5% 0.3%, 86.25% 1%, 88% 0.5%, 89.5% 1.3%, 91.25% 0.2%, 93% 1.2%, 94.5% 0.7%, 96.25% 1.5%, 98% 0.3%, 100% 1%, 100% 99%, 98% 99.7%, 96.25% 98.5%, 94.5% 99.3%, 93% 98.8%, 91.25% 99.8%, 89.5% 98.7%, 88% 99.5%, 86.25% 99%, 84.5% 99.8%, 83% 98.5%, 81.25% 99.3%, 79.5% 98.8%, 78% 99.8%, 76.25% 98.7%, 74.5% 99.5%, 73% 99%, 71.25% 99.7%, 69.5% 98.5%, 68% 99.3%, 66.25% 98.8%, 64.5% 99.8%, 63% 98.7%, 61.25% 99.5%, 59.5% 99%, 58% 99.7%, 56.25% 98.5%, 54.5% 99.3%, 53% 98.7%, 51.25% 99.8%, 49.5% 98.8%, 48% 99.7%, 46.25% 98.7%, 44.5% 99.5%, 43% 98.5%, 41.25% 99%, 39.5% 99.8%, 38% 98.7%, 36.25% 99.3%, 34.5% 98.8%, 33% 99.7%, 31.25% 98.5%, 29.5% 99%, 28% 99.8%, 26.25% 98.7%, 24.5% 99.5%, 23% 98.8%, 21.25% 99.8%, 19.5% 98.7%, 18% 99.3%, 16.25% 98.5%, 14.5% 99.8%, 13% 99%, 11.25% 99.7%, 9.5% 98.7%, 8% 99.5%, 6.25% 98.8%, 4.5% 99.8%, 3% 98.5%, 1.25% 99.7%, 0% 99%)',
                                }}
                            >
                                <div className="p-6 font-mono text-sm">
                                    <header className="text-center mb-6">
                                        <div className="flex justify-center">
                                            <Logo fill="primary" />
                                        </div>
                                    </header>

                                    <section className="mb-3">
                                        <dl className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <dt className="text-muted">Order #:</dt>
                                                <dd className="font-medium">{orderDetails.orderNumber}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-muted">Date:</dt>
                                                <dd className="font-medium">
                                                    {formatReceiptDate(orderDetails.createdAt)}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-muted">Email:</dt>
                                                <dd className="font-medium truncate ml-2">{orderDetails.email}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-muted">Status:</dt>
                                                <dd className="font-medium">
                                                    {orderDetails.isDelivered
                                                        ? 'Delivered'
                                                        : formatFulfillmentStatus(orderDetails.fulfillmentStatus)}
                                                </dd>
                                            </div>
                                        </dl>
                                    </section>

                                    <section className="border-t border-b border-dotted border-primary py-3 mb-3">
                                        <h4 className="text-xs text-muted mb-2 font-semibold">ITEMS</h4>
                                        <ul className="space-y-2">
                                            {orderDetails.lineItems.map((item: any) => (
                                                <li key={item.id}>
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1 pr-2">
                                                            <h5 className="font-medium text-xs leading-tight">
                                                                {item.name}
                                                            </h5>
                                                            <p className="text-xs text-muted m-0 mt-1">
                                                                {item.sku && `${item.sku} • `}Qty: {item.quantity}
                                                            </p>
                                                        </div>
                                                        <span className="text-right font-medium text-xs">
                                                            ${formatPrice(item.price)}
                                                        </span>
                                                    </div>
                                                    {parseFloat(item.totalDiscount) > 0 && (
                                                        <div className="text-xs text-muted mt-1 ml-2">
                                                            <div className="flex justify-between">
                                                                <span>Discount:</span>
                                                                <span>-${formatPrice(item.totalDiscount)}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <dl className="space-y-3 text-xs">
                                            <div className="flex justify-between">
                                                <dt className="text-muted">Subtotal:</dt>
                                                <dd className="font-medium">
                                                    ${formatPrice(orderDetails.subtotalPrice)}
                                                </dd>
                                            </div>
                                            {parseFloat(orderDetails.totalDiscounts) > 0 && (
                                                <div className="flex justify-between !mt-1">
                                                    <dt className="text-muted">Discounts:</dt>
                                                    <dd className="font-medium">
                                                        -${formatPrice(orderDetails.totalDiscounts)}
                                                    </dd>
                                                </div>
                                            )}
                                            {parseFloat(orderDetails.totalTax) > 0 && (
                                                <div className="flex justify-between !mt-1">
                                                    <dt className="text-muted">
                                                        Taxes{orderDetails.taxesIncluded ? ' (included)' : ''}
                                                    </dt>
                                                    <dd className="font-medium">
                                                        ${formatPrice(orderDetails.totalTax)}
                                                    </dd>
                                                </div>
                                            )}
                                            <div className="flex justify-between border-t border-dotted border-primary pt-3 font-bold">
                                                <dt>Total:</dt>
                                                <dd>${formatPrice(orderDetails.totalPrice)}</dd>
                                            </div>
                                        </dl>
                                    </section>

                                    {orderDetails.orderStatusUrl && (
                                        <section className="mt-3 pt-3 border-t border-dotted border-primary">
                                            <div className="text-xs group-hover:underline block text-center">
                                                View order status →
                                            </div>
                                        </section>
                                    )}

                                    <footer className="text-center mt-3 pt-3 border-t border-dotted border-primary">
                                        <p className="text-xs text-muted m-0">Thank you for your order!</p>
                                    </footer>
                                </div>
                            </article>
                        </a>
                    )
                })}
            </div>
        </>
    )
}
