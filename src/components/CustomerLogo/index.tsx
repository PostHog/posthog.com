import React from 'react'
import { Customer } from 'hooks/useCustomers'

const LOGO_CLASS = 'h-8 w-auto max-w-[180px] object-contain fill-current'

export interface CustomerLogoProps {
    customer: Customer
    className?: string
}

export const CustomerLogo = ({ customer, className = LOGO_CLASS }: CustomerLogoProps): JSX.Element => {
    if (!customer.logo) {
        return <span>{customer.name}</span>
    }

    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return <LogoComponent className={className} />
    }

    return (
        <>
            <img src={customer.logo.light} alt={customer.name} className={`${className} dark:hidden`} />
            <img src={customer.logo.dark} alt={customer.name} className={`${className} hidden dark:block`} />
        </>
    )
}

export default CustomerLogo
