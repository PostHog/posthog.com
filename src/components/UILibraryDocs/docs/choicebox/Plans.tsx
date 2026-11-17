import React, { useState } from 'react'
import { Choicebox } from 'components/UI/Choicebox'

const plans = [
    { value: 'starter', title: 'Starter', price: '$0 per month' },
    { value: 'team', title: 'Team', price: '$20 per month' },
    { value: 'business', title: 'Business', price: '$50 per month' },
    { value: 'enterprise', title: 'Enterprise', price: 'Custom pricing' },
]

export default function Plans(): JSX.Element {
    const [plan, setPlan] = useState('starter')
    const selected = plans.find((item) => item.value === plan)
    return (
        <div className="w-full">
            <Choicebox.Group aria-label="Plans" value={plan} onValueChange={setPlan}>
                {plans.map((item) => (
                    <Choicebox.Item key={item.value} value={item.value}>
                        <Choicebox.Title>{item.title}</Choicebox.Title>
                        <Choicebox.Description>{item.price}</Choicebox.Description>
                    </Choicebox.Item>
                ))}
            </Choicebox.Group>
            <p className="mb-0 mt-3 text-sm text-secondary">Selected: {selected?.title}</p>
        </div>
    )
}
