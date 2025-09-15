import React from 'react'
import useProduct from 'hooks/useProduct'
import { Accordion } from 'components/RadixUI/Accordion'
import OSButton from 'components/OSButton'
import { IconCursor, IconHeadset, IconQuestion } from '@posthog/icons'

export default function ProductSidebar({ type }: { type: string }): JSX.Element | null {
    const product = useProduct({ handle: type })
    if (!product) return null

    const {
        Icon,
        color,
        name,
        description,
        startsAt,
        billingData: { unit } = { unit: '' },
        freeLimit,
        worksWith,
        sharesFreeTier,
    } = product

    return (
        <>
            <Accordion
                data-scheme="primary"
                className=""
                defaultValue="item-0"
                items={[
                    {
                        trigger: (
                            <>
                                <Icon className={`text-${color} size-5 inline-block`} />
                                <span className="flex-1">{name}</span>
                            </>
                        ),
                        content: (
                            <>
                                {description && <p className="text-sm">{description}</p>}
                                <p>
                                    <span className="text-sm text-secondary">Pricing starts at</span>
                                    <br />
                                    <span className="font-bold text-[15px]">${startsAt}</span>
                                    <span className="text-sm text-secondary">/{unit}</span>
                                </p>
                                <p>
                                    <span className="text-sm text-secondary">
                                        Monthly free tier{product.sharesFreeTier ? '*' : ''}
                                    </span>
                                    <br />
                                    <span className="font-bold text-[15px]">{freeLimit?.toLocaleString()}</span>
                                    <span className="text-sm text-secondary">/{unit}</span>
                                    {sharesFreeTier && (
                                        <span className="block text-xs italic text-secondary mt-1">
                                            *Shares free tier with {sharesFreeTier.name}
                                        </span>
                                    )}
                                </p>
                            </>
                        ),
                    },
                ]}
            />

            <Accordion
                data-scheme="primary"
                className=""
                defaultValue="item-0"
                contentClassName=""
                items={[
                    {
                        trigger: 'Learn more',
                        content: (
                            <div className="space-y-1">
                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    icon={<IconCursor className="text-green" />}
                                    to="https://app.posthog.com/signup"
                                    className="text-primary hover:text-primary"
                                >
                                    Try it – free
                                </OSButton>

                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    icon={<IconHeadset className="text-purple" />}
                                    to="/talk-to-a-human"
                                    className="text-primary hover:text-primary"
                                >
                                    Talk to a human
                                </OSButton>

                                <OSButton
                                    variant="underline"
                                    asLink
                                    align="left"
                                    width="full"
                                    size="md"
                                    icon={<IconQuestion className="text-blue" />}
                                    to="#"
                                    className="text-primary hover:text-primary"
                                >
                                    FAQ
                                </OSButton>
                            </div>
                        ),
                    },
                ]}
            />

            <Accordion
                data-scheme="primary"
                className=""
                defaultValue="item-0"
                contentClassName=""
                items={[
                    {
                        trigger: 'Works with...',
                        content: (
                            <div className="space-y-1">
                                {product &&
                                    worksWith &&
                                    worksWith.map((product) => {
                                        if (!product) return null
                                        const { Icon, color, name, slug } = product
                                        return (
                                            <OSButton
                                                key={product.type}
                                                variant="underline"
                                                asLink
                                                align="left"
                                                width="full"
                                                size="md"
                                                icon={<Icon className={`text-${color}`} />}
                                                to={slug}
                                                className="text-primary hover:text-primary"
                                            >
                                                {name}
                                            </OSButton>
                                        )
                                    })}
                            </div>
                        ),
                    },
                ]}
            />
        </>
    )
}
