import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import React, { useEffect, useState } from 'react'
import { heading, section } from './classes'
import Link from 'components/Link'
import { Bang, Eco, TrendUp } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import usePostHog from 'hooks/usePostHog'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { useLocale } from '../../context/Locale'

const ProductDetails = () => {
    const locale = useLocale()
    const isKo = locale === 'ko'
    return (
        <>
            <span className="bg-green inline-flex items-center gap-1 px-2 py-1 rounded-sm">
                <span className="w-3 h-3">
                    <Eco />
                </span>
                <span className="uppercase font-semibold text-xs text-white">{isKo ? '친환경' : 'Eco-friendly'}</span>
            </span>
            <p className="text-4xl font-bold m-0 @xl:mt-2">PostHog Cloud</p>
            <p className="opacity-50 m-0 mb-4 text-sm">{isKo ? '디지털 다운로드*' : 'Digital download*'}</p>
        </>
    )
}

const SignupEmbed = () => {
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Signup trends')
        }
    }, [])

    return (
        <iframe
            className="m-0 size-full"
            width="100%"
            height="100%"
            src="https://app.posthog.com/embedded/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q?refresh=true"
        />
    )
}

export default function CTA({ headline = true }) {
    const { addWindow } = useApp()
    const posthog = usePostHog()
    const locale = useLocale()
    const isKo = locale === 'ko'
    const [version, setVersion] = useState('us')
    const [signupCountToday, setSignupCountToday] = useState(0)
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true })

    useEffect(() => {
        if (posthog?.isFeatureEnabled('direct-to-eu-cloud')) {
            setVersion('eu')
        }
        fetch(`/api/signup-count`)
            .then((res) => res.json())
            .then((count) => setSignupCountToday(count))
            .catch((err) => console.error(err))
    }, [])

    return (
        <>
            <section id="cta" ref={ref} className="pt-8 @xl:pt-0 px-5 lg:px-0">
                {headline && (
                    <>
                        <h2 className={heading('lg')}>
                            {isKo ? (
                                <>
                                    바로 이거예요, <span className="text-red inline-block">콜 투 액션.</span>
                                </>
                            ) : (
                                <>
                                    This is the <span className="text-red inline-block">call to action.</span>
                                </>
                            )}
                        </h2>
                        <h3 className={heading('sm')}>
                            {isKo
                                ? '다른 건 몰라도 이 클래식한 마케팅 문구만큼은 PostHog를 선택하는 계기가 되길 바랍니다.'
                                : 'If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.'}
                        </h3>
                    </>
                )}

                <div className="@xl:hidden py-12">
                    <ProductDetails />
                </div>

                <div className="@xl:grid grid-cols-2 gap-16 @xl:pt-16 max-w-5xl mx-auto">
                    <div className="relative text-right">
                        <div className="mb-2">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/cloud-cd.jpg"
                                alt="PostHog Cloud"
                                className="max-w-[443px]"
                            />
                        </div>
                        <div className="absolute -left-4 bottom-12 @xl:left-[-8px] @xl:bottom-24">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/g2-badge.png"
                                alt={isKo ? 'G2에서 좋은 평가를 받고 있어요' : "People on G2 think we're great"}
                                className="w-[90px]"
                            />
                        </div>

                        {inView && (
                            <motion.div
                                transition={{ duration: 1, type: 'tween' }}
                                initial={{ translateX: '-100vw' }}
                                animate={{ translateX: 0 }}
                                className="bg-blue text-left leading-none px-4 py-2 absolute -top-12 left-4 right-4 @xl:-left-4 @xl:right-auto rounded @xl:rounded-none"
                            >
                                <span className="text-sm font-bold text-white">
                                    {isKo ? (
                                        <>
                                            3명이 <span className="text-xs text-normal">(가상으로)</span> PostHog를
                                            장바구니에 넣었어요*
                                        </>
                                    ) : (
                                        <>
                                            3 people <span className="text-xs text-normal">(would have)</span> added
                                            PostHog to their cart*
                                        </>
                                    )}
                                </span>
                                <br />
                                <span className="text-xs text-white">
                                    *{isKo ? '실제 장바구니가 있었다면' : 'if this were a real cart'}
                                </span>
                            </motion.div>
                        )}
                        <div className="absolute top-4 -right-12">
                            <div className="relative">
                                <Bang className="w-[189px] animate-grow" />
                                <p className="px-8 text-center m-0 absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-black uppercase leading-none font-bold text-lg rotate-6">
                                    {isKo ? (
                                        <>
                                            Kim K<br />
                                            추천 아님
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-xs">Not</span>
                                            endorsed <br />
                                            by Kim K
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                        <p className="text-xs opacity-60 text-right">
                            *
                            {isKo
                                ? 'PostHog는 웹 제품이라 CD로 설치할 수 없어요.'
                                : 'PostHog is a web product and cannot be installed by CD.'}
                            <br />
                            {isKo ? (
                                '플로피 디스크로 보내드린 적은 있는데, 릭롤이었습니다.'
                            ) : (
                                <>
                                    We <em>did</em> once send some customers a floppy disk but it was a Rickroll.
                                </>
                            )}
                        </p>
                    </div>
                    <div>
                        <div className="hidden @xl:block">
                            <ProductDetails />
                        </div>

                        <ul className="p-0 m-0 space-y-5">
                            <li className="list-none">
                                <strong className="text-lg block pb-1">
                                    {isKo ? '클라우드 선택' : 'Select your cloud'}
                                </strong>
                                <ul className="flex gap-2 p-0 list-none">
                                    <li>
                                        <button
                                            onClick={() => setVersion('us')}
                                            className={`py-2 px-3 font-bold border ${
                                                version === 'us'
                                                    ? 'border-black dark:border-white'
                                                    : 'border-transparent dark:border-transparent'
                                            }  hover:border-black dark:hover:border-white`}
                                        >
                                            US (Virginia)
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setVersion('eu')}
                                            className={`py-2 px-3 font-bold border ${
                                                version === 'eu'
                                                    ? 'border-black dark:border-white'
                                                    : 'border-transparent dark:border-transparent'
                                            }  hover:border-black dark:hover:border-white`}
                                        >
                                            EU (Frankfurt)
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="list-none">
                                <strong className="text-lg block">{isKo ? '시작 가격:' : 'Starts at:'}</strong>
                                <div className="flex items-baseline gap-1">
                                    <s className="font-bold text-xl">$0</s>
                                    <span className="font-bold text-red text-xl uppercase">
                                        {isKo ? '무료' : 'Free'}
                                    </span>
                                    <span className="text-xs opacity-50">
                                        &gt;
                                        <span className="text-sm">
                                            {isKo ? '이 가격으로 1자리 남음!!' : '1 left at this price!!'}
                                        </span>
                                    </span>
                                </div>
                            </li>
                        </ul>

                        <div className="py-6">
                            <CallToAction
                                type="primary"
                                size="absurd"
                                width="64"
                                to={`https://${version === 'us' ? 'app' : 'eu'}.posthog.com/signup`}
                                className="animate-grow-sm"
                                state={{ initialTab: 'signup' }}
                            >
                                {isKo ? '시작하기' : 'Get started'}
                            </CallToAction>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="bg-accent rounded h-8 w-8 p-1">
                                <TrendUp className="opacity-75" />
                            </span>
                            <p className="text-sm text-secondary leading-tight mb-0">
                                <strong>{isKo ? '서두르세요:' : 'Hurry:'}</strong>{' '}
                                {isKo
                                    ? `${signupCountToday || '많은'}개 기업이 `
                                    : `${signupCountToday || 'Tons of '} companies signed up `}
                                <button
                                    onClick={() =>
                                        addWindow(
                                            <SignupEmbed
                                                location={{ pathname: 'signup-embed' }}
                                                key="signup-embed"
                                                newWindow
                                            />
                                        )
                                    }
                                    className="font-bold dark:text-yellow text-red"
                                >
                                    {isKo ? '오늘' : 'today'}
                                </button>
                                {isKo ? ' 가입했습니다. ' : '. '}
                                <br className="hidden sm:block" />
                                {isKo
                                    ? '지금 시작하면 첫 주문에서 $0 할인 혜택.'
                                    : 'Act now and get $0 off your first order.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
