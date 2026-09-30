import React from 'react'
import SEO, { buildProductStructuredData, type LanguageAlternate } from 'components/seo'
import Test from '../components/Home/Test'
import { useTranslation } from '../i18n'

// `/` and every translated copy of it (`/pt`, ...) render this page. See gatsby/i18n.ts.
export default function Home({
    pageContext,
}: {
    pageContext: { lang?: string; languageAlternates?: LanguageAlternate[] }
}) {
    const { locale, t } = useTranslation()

    return (
        <>
            <SEO
                title={t('home.seo.title')}
                updateWindowTitle={false}
                description={t('home.seo.description')}
                image="/images/og/default.png"
                lang={pageContext.lang}
                languageAlternates={pageContext.languageAlternates}
                structuredData={buildProductStructuredData({
                    name: 'PostHog',
                    description: t('home.seo.description'),
                    slug: locale === 'en' ? '' : locale,
                })}
            />
            <Test />
        </>
    )
}
