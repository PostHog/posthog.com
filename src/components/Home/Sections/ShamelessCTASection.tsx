import React from 'react'
import ShamelessCTA from 'components/Home/ShamelessCTA'
import { useTranslation } from 'i18n'

export const ShamelessCTASection = () => {
    const { t } = useTranslation()

    return (
        <div id="shameless-cta" className="overflow-x-hidden">
            <h2>{t('section.8.heading')}</h2>
            <ShamelessCTA />
        </div>
    )
}

export default ShamelessCTASection
