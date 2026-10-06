import React from 'react'
import SEO, { buildProductStructuredData, type LanguageAlternate } from 'components/seo'
import { getDirection } from '../i18n/locales'
import Test from '../components/Home/Test'
import { useTranslation } from 'i18n'

// `/` and every translated copy of it (`/pt`, ...) render this page. See gatsby/i18n.ts.
export default function Home({
    pageContext,
}: {
    pageContext: { lang?: string; languageAlternates?: LanguageAlternate[]; ogImage?: string }
}) {
    const { locale, t } = useTranslation()

    return (
        <>
            <SEO
                title={t('meta.title')}
                updateWindowTitle={false}
                description={t('meta.description')}
                image={pageContext.ogImage || '/images/og/default.png'}
                lang={pageContext.lang}
                dir={getDirection(locale)}
                languageAlternates={pageContext.languageAlternates}
                structuredData={buildProductStructuredData({
                    name: 'PostHog',
                    description: t('meta.description'),
                    slug: locale === 'en' ? '' : locale,
                })}
            />
            <Test />
        </>
    )
}
