import React from 'react'
import KoreanHomePage from './_KoreanHome'
import { translateKo, translateKoHomeBody } from './_translations'

export default function KoreanHome() {
    return (
        <KoreanHomePage
            translate={translateKo}
            translateBody={translateKoHomeBody}
            seo={{
                title: 'PostHog - 제품 엔지니어를 위한 올인원 개발 도구',
                description:
                    'PostHog는 제품 분석, 세션 리플레이, 피처 플래그, 실험, 데이터 웨어하우스를 한곳에서 제공하는 오픈소스 Product OS입니다.',
                lang: 'ko',
                canonicalUrl: 'https://posthog.com/ko',
                languageAlternates: [
                    { hrefLang: 'en', href: '/' },
                    { hrefLang: 'ko', href: '/ko' },
                    { hrefLang: 'x-default', href: '/' },
                ],
            }}
        />
    )
}
