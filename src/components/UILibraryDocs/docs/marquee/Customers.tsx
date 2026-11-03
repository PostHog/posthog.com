import React from 'react'
import { Marquee } from 'components/UI/Marquee'
import RaycastLogo from 'components/CustomerLogos/RaycastLogo'
import RailwayLogo from 'components/CustomerLogos/RailwayLogo'
import SupabaseLogo from 'components/CustomerLogos/SupabaseLogo'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'

const customers = [
    { name: 'Raycast', Logo: RaycastLogo },
    { name: 'Railway', Logo: RailwayLogo },
    { name: 'Supabase', Logo: SupabaseLogo },
    { name: 'ElevenLabs', Logo: ElevenLabsLogo },
]

export default function Customers(): JSX.Element {
    return (
        <Marquee label="PostHog customers" gap={48} speed={36}>
            {customers.map(({ name, Logo }) => (
                <span
                    key={name}
                    role="img"
                    aria-label={name}
                    className="flex h-20 w-40 items-center justify-center text-primary"
                >
                    <Logo className="h-8 w-auto max-w-full fill-current" />
                </span>
            ))}
        </Marquee>
    )
}
