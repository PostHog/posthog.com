import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import Pricing from 'components/Home/New/Pricing'
import { ImageMoney } from 'components/Home/Decorations'
import { useTranslation } from 'i18n'

export const PricingSection = () => {
    const { t } = useTranslation()

    return (
        <div id="pricing">
            <h2>{t('section.5.heading')}</h2>

            <ImageMoney />

            <Markdown>{`${t('section.5.body.1')}

${t('section.5.body.2')}

${t('section.5.body.3')}

${t('section.5.body.4')}`}</Markdown>

            <Pricing />

            <Link to="/pricing" state={{ newWindow: true }}>
                {t('section.5.button')}
            </Link>
        </div>
    )
}

export default PricingSection
