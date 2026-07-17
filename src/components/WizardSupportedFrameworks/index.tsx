import React, { useMemo } from 'react'
import List from 'components/List'
import { getWizardFrameworkRows } from 'constants/installation-taxonomy'

export interface WizardSupportedFrameworksProps {
    className?: string
}

/**
 * Wizard “Frameworks and languages” grid for docs — data from installation taxonomy (`wizard` flags).
 */
export default function WizardSupportedFrameworks({ className }: WizardSupportedFrameworksProps): JSX.Element {
    const items = useMemo(
        () =>
            getWizardFrameworkRows().map((row) => ({
                label: row.label,
                url: row.url,
                image: row.image,
                badge: row.badge,
            })),
        []
    )

    return <List className={className} items={items} />
}
