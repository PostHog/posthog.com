import { CallToAction } from 'components/CallToAction/index.tsx'
import { SEO } from 'components/seo'
import React from 'react'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { SignupCTA } from 'components/SignupCTA'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { TrackedCTA } from 'components/CallToAction'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'

const heroTitle = 'PostHog for enterprise'

export default function Enterprise() {
    return (
        <Layout>
            <SEO
                title="PostHog for enterprise"
                description="The same great product - just with all the awards."
                image={`/images/enterprise.png`}
            />
            <div className={section('z-10 relative md:!mb-8')}>
                <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>
                    {heroTitle.split(' ').map((word, index) => (
                        <span
                            key={word}
                            className={`${index > 1 ? 'text-red dark:text-yellow' : ''} ml-4 first:ml-0 inline-block`}
                        >
                            {word}
                        </span>
                    ))}
                </h1>
                <h2 className={`mt-2 mb-6 text-xl font-semibold text-center home-hero-subtitle`}>
                    The same great product -{' '}
                    <span className="text-red dark:text-yellow">just with all the awards. And badges.</span>
                </h2>
                <div className="flex justify-center items-center gap-2 home-hero-cta mb-16">
                    <SignupCTA />
                    <TrackedCTA event={{ name: `clicked Get a demo` }} href="/book-a-demo" type="secondary" size="lg">
                        Get a demo
                    </TrackedCTA>
                </div>

                <section className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-16 mb-8 md:mb-20">
                    <div>
                        <h3 className="mb-1 text-3xl md:text-4xl text-balance">Flair transparency report</h3>
                        <p>We are actively working to increase our flair to match industry standards.</p>

                        <div className="flex items-center gap-2 mb-8">
                            <span className="whitespace-nowrap">Flair progress:</span>
                            <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-full h-4 w-full relative">
                                <div className="bg-red dark:bg-yellow rounded-full w-[20%] absolute -top-px -left-px -bottom-px"></div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-[15px]">20%</span>
                                <Tooltip
                                    content={() => (
                                        <p className="mb-0">
                                            A minimum of{' '}
                                            <a
                                                href="https://www.google.com/search?q=how+many+pieces+of+flair+is+the+minimum"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-red dark:text-yellow font-semibold"
                                            >
                                                15 pieces of flair is required
                                            </a>
                                            .
                                        </p>
                                    )}
                                >
                                    <span className="relative">
                                        <IconInfo className="w-5 h-5 opacity-75 hover:opacity-100" />
                                    </span>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <StaticImage
                                src="../images/enterprise/soc-2type1.png"
                                height={140}
                                alt="Soc 2 Type 1 certified"
                            />
                            <StaticImage
                                src="../images/enterprise/hipaa.webp"
                                height={120}
                                alt="HIPAA compliant"
                                className="relative md:top-2"
                            />
                            <StaticImage src="../images/enterprise/gdpr-ready.png" height={66.5} alt="GDPR ready" />
                        </div>
                    </div>

                    <aside className="md:w-[580px] md:h-[320px] max-w-full">
                        <StaticImage src="../images/enterprise/flair-hogs.png" alt="We need to talk about your flair" />
                    </aside>
                </section>

                <h3 className="md:text-center mb-1 text-3xl md:text-4xl">
                    Some people say we're a leader, others say we're a high performer.
                </h3>
                <p className="md:text-center mb-8 opacity-75 font-semibold text-lg">(But we'll let you decide...)</p>

                <section className="flex flex-wrap justify-center gap-4 mb-8">
                    <img
                        src="/images/g2/ABTesting_HighPerformer_EMEA_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ABTesting_HighPerformer_Europe_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ABTesting_HighPerformer_HighPerformer.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/ABTesting_HighPerformer_Small-Business_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ABTesting_HighPerformer_Small-Business_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ABTesting_Leader_Americas_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/ABTesting_Leader_Small-Business_EMEA_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ABTesting_Leader_Small-Business_Europe_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ABTesting_MostImplementable_Small-Business_Total.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ABTesting_MostImplementable_Total.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Canada_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_EMEA_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Europe_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_LatinAmerica_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Mid-Market_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_Asia_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_AsiaPacific_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_Canada_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_EMEA_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_Europe_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_Small-Business_UnitedKingdom_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/DigitalAnalytics_HighPerformer_UnitedKingdom_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/DigitalAnalytics_MomentumLeader_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/DigitalAnalytics_MostImplementable_Small-Business_Total.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_FastestImplementation_GoLiveTime.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_HighPerformer_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_HighPerformer_AsiaPacific_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_HighPerformer_EMEA_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_HighPerformer_Europe_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_HighPerformer_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_HighPerformer_Mid-Market_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/FeatureManagement_MostImplementable_Total.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/MobileAnalytics_HighPerformer_Small-Business_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/MobileAnalytics_Leader_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/MobileAppAnalytics_HighPerformer_Asia_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/MobileAppAnalytics_HighPerformer_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/MobileAppAnalytics_HighPerformer_Small-Business_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Australia_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Mid-Market_EMEA_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Mid-Market_Europe_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Mid-Market_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Small-Business_Asia_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Small-Business_India_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Small-Business_LatinAmerica_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_Small-Business_UnitedKingdom_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_HighPerformer_UnitedKingdom_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ProductAnalytics_Leader_Asia_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/ProductAnalytics_Leader_AsiaPacific_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ProductAnalytics_Leader_EMEA_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/ProductAnalytics_Leader_Europe_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/ProductAnalytics_Leader_India_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/ProductAnalytics_Leader_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/ProductAnalytics_Leader_Small-Business_Americas_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_Leader_Small-Business_AsiaPacific_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_Leader_Small-Business_EMEA_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_Leader_Small-Business_Europe_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/ProductAnalytics_Leader_Small-Business_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ProductAnalytics_MomentumLeader_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/ProductAnalytics_MostImplementable_Small-Business_Total.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/ProductAnalytics_MostImplementable_Total.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/SessionReplay_HighPerformer_Mid-Market_AsiaPacific_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/SessionReplay_HighPerformer_Mid-Market_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/SessionReplay_HighPerformer_Small-Business_Americas_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/SessionReplay_HighPerformer_Small-Business_Asia_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/SessionReplay_HighPerformer_Small-Business_AsiaPacific_HighPerformer.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/SessionReplay_Leader_Asia_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/SessionReplay_Leader_AsiaPacific_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/SessionReplay_Leader_EMEA_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/SessionReplay_Leader_Europe_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/SessionReplay_Leader_India_Leader.svg" width={94} height={106} alt="" />
                    <img src="/images/g2/SessionReplay_Leader_Leader.svg" width={94} height={106} alt="" />
                    <img
                        src="/images/g2/SessionReplay_Leader_Small-Business_EMEA_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/SessionReplay_Leader_Small-Business_Europe_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img
                        src="/images/g2/SessionReplay_Leader_Small-Business_Leader.svg"
                        width={94}
                        height={106}
                        alt=""
                    />
                    <img src="/images/g2/SessionReplay_MomentumLeader_Leader.svg" width={94} height={106} alt="" />
                </section>

                <section className="text-center mb-24">
                    <h3>Still not convinced?</h3>

                    <TrackedCTA event={{ name: `clicked Get a demo` }} href="/book-a-demo" type="secondary" size="lg">
                        Talk to sales
                    </TrackedCTA>
                </section>
            </div>
        </Layout>
    )
}
