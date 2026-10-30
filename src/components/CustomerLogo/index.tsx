import React from 'react'
import { Customer } from 'hooks/useCustomers'

export default function CustomerLogo({
    customer,
    className = 'h-8 max-w-44',
}: {
    customer: Customer
    className?: string
}): JSX.Element {
    if (!customer.logo) {
        return <span>{customer.name}</span>
    }

    const classes = `w-auto object-contain fill-current ${className}`

    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return <LogoComponent className={classes} />
    }

    return (
        <>
            <img src={customer.logo.light} alt={customer.name} className={`${classes} dark:hidden`} />
            <img src={customer.logo.dark} alt={customer.name} className={`${classes} hidden dark:block`} />
        </>
    )
}
