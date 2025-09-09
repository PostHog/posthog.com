import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction/index.tsx'
import React from 'react'
import { SignupCTA } from 'components/SignupCTA'
import { TrackedCTA } from 'components/CallToAction'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import Editor from 'components/Editor'

const heroTitle = 'PostHog for enterprise'

export default function Enterprise() {
    return (
        <Editor
            // title="PostHog for enterprise"
            type="mdx"
            slug="/enterprise"
            bookmark={{
                title: 'PostHog for enterprise',
                description: 'The same great product - just with all the awards.',
            }}
        >
            <div className="@container">
                <h1 className="!text-4xl">
                    PostHog for <span className="text-red dark:text-yellow">enterprise</span>
                </h1>
                <h2 className="mt-2 mb-6 text-xl font-semibold">
                    The same great product -{' '}
                    <span className="text-red dark:text-yellow">just with all the awards. And badges.</span>
                </h2>
                <div className="flex items-center gap-2 mb-8">
                    <SignupCTA size="md" />
                    <TrackedCTA
                        event={{ name: `clicked Talk to a human` }}
                        href="/talk-to-a-human"
                        type="secondary"
                        size="md"
                        state={{ newWindow: true }}
                    >
                        Talk to a human
                    </TrackedCTA>
                </div>

                <section className="border-y border-primary py-8 flex flex-col @xl:flex-row gap-8">
                    <div>
                        <h2 className="mt-0">Flair transparency report</h2>
                        <p>We are actively working to increase our flair to match industry standards.</p>

                        <div className="flex items-center gap-2 mb-8">
                            <span className="whitespace-nowrap">Flair progress:</span>
                            <div className="bg-accent border border-primary rounded-full h-4 w-full relative">
                                <div className="bg-red dark:bg-yellow rounded-full w-[26.67%] absolute -top-px -left-px -bottom-px"></div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-[15px]">27%</span>
                                <Tooltip
                                    trigger={
                                        <span className="relative">
                                            <IconInfo className="w-5 h-5 opacity-75 hover:opacity-100" />
                                        </span>
                                    }
                                    delay={0}
                                >
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
                                </Tooltip>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-4 @sm:gap-8 @xl:gap-4 @2xl:gap-8">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/soc-2type1.png"
                                height={140}
                                width={140}
                                alt="SOC 2 Type II certified"
                                placeholder="blurred"
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/hipaa.webp"
                                height={120}
                                width={225}
                                alt="HIPAA compliant"
                                className="relative @xl:top-2"
                                placeholder="blurred"
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/gdpr-ready.png"
                                width={153}
                                height={66.5}
                                alt="GDPR ready"
                                placeholder="blurred"
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/dpf.png"
                                height={122}
                                width={266}
                                alt="EU-U.S. Data Privacy Framework"
                                placeholder="blurred"
                            />
                        </div>
                    </div>

                    <aside className="w-96 mx-auto @xl:w-[580px] max-w-full">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/flair-hogs.png"
                            alt="We need to talk about your flair"
                            placeholder="blurred"
                        />
                    </aside>
                </section>

                <h3>Some people say we're a leader, others say we're a high performer.</h3>
                <p>(But we'll let you decide...)</p>

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

                    <TrackedCTA
                        event={{ name: `clicked Talk to a human` }}
                        href="/talk-to-a-human"
                        type="secondary"
                        size="md"
                        state={{ newWindow: true }}
                    >
                        Talk to a human
                    </TrackedCTA>
                </section>
            </div>
        </Editor>
    )
}
