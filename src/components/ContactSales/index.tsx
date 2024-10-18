import CloudinaryImage from 'components/CloudinaryImage'
import { Check2 } from 'components/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import SEO from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useRef, useEffect } from 'react'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import KeyboardShortcut from 'components/KeyboardShortcut'
import SalesforceForm from 'components/SalesforceForm'
import TeamMember from 'components/TeamMember'

const features = [
    'Volume discounts',
    'SAML SSO',
    'Custom MSA',
    'Dedicated support',
    'Personalized onboarding',
    'Advanced permissions & audit logs',
]

const VideoSection = () => (
    <section
        id="demo-video"
        className={`overflow-hidden transition-all duration-300 h-auto max-h-[90vh] border border-light dark:border-dark rounded leading-[0] shadow-xl mb-8`}
    >
        <iframe
            src="https://www.youtube-nocookie.com/embed/2jQco8hEvTI?autoplay=1"
            className="rounded w-full aspect-video m-0"
            allow="autoplay"
        />
    </section>
)

export default function ContactSales({ location }) {
    const [showVideo, setShowVideo] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleShowVideo = () => {
        setShowVideo(true)
        if (!isMobile) {
            setTimeout(() => {
                window.scrollTo({
                    top: document.getElementById('demo-video').offsetTop - 80,
                    behavior: 'smooth',
                })
            }, 100)
        }
    }

    return (
        <Layout>
            <SEO
                title="Talk to a human - PostHog"
                description="PostHog is self-serve, but you can talk to a real person if you need to!"
                image={`/images/og/talk-to-a-human.png`}
            />

            <div className="lg:py-12 py-4 px-5">
                <section className="mb-6">
                    <div className="text-center">
                        <CloudinaryImage
                            loading="eager"
                            placeholder="none"
                            width={600}
                            height={309}
                            alt="Sales hedgehogs"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/ContactSales/images/sales-hogs.png"
                        />
                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">Let's chat</h1>
                    </div>
                </section>
                {!isMobile && showVideo && <VideoSection />}
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div className="">
                        <div
                            className={`space-y-3 transition-all duration-300 ${
                                showVideo
                                    ? isMobile
                                        ? 'h-0 opacity-0 overflow-hidden'
                                        : 'opacity-0 h-0'
                                    : 'h-auto opacity-100 mb-6'
                            }`}
                        >
                            <h3 className="text-lg mb-3 text-center md:text-left">Quick demo first?</h3>

                            <button
                                className="aspect-video cursor-pointer relative hover:-top-0.5 active:top-[2px] hover:scale-[1.005] active:scale-[.995] transition-all hover:duration-100 rounded border border-light dark:border-dark p-1 leading-[0] bg-accent dark:bg-accent-dark shadow-xl !m-0"
                                onClick={handleShowVideo}
                            >
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/demo_thumb_68d0d8d56d.jpg"
                                    className="rounded"
                                />
                            </button>
                        </div>
                        {isMobile && showVideo && <VideoSection />}
                        <div className="border border-light dark:border-dark px-4 py-3 mb-6 bg-accent dark:bg-accent-dark rounded">
                            <p className="m-0 text-[15px]">
                                <strong>Need help with your bill?</strong>{' '}
                                <Link
                                    to="/docs/billing/estimating-usage-costs#how-to-reduce-your-posthog-costs"
                                    className="inline-block"
                                >
                                    Learn how to reduce your costs.
                                </Link>
                            </p>
                        </div>
                        <h3 className="text-lg mt-1 mb-3">Benefits of an enterprise plan</h3>
                        <ul className="list-none m-0 p-0 mt-2 grid sm:grid-flow-col sm:grid-rows-3 space-y-1">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-4 opacity-60 text-green" />
                                        <span>{feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="mb-3">Contact us</h3>
                        <SalesforceForm
                            type="lead"
                            buttonOptions={{
                                size: 'lg',
                            }}
                            form={{
                                fields: [
                                    {
                                        label: 'Email',
                                        type: 'string',
                                        name: 'email',
                                        required: true,
                                        fieldType: 'email',
                                    },
                                    {
                                        label: 'Company',
                                        type: 'string',
                                        name: 'company',
                                        required: true,
                                    },
                                    {
                                        label: 'Role',
                                        name: 'role',
                                        type: 'enumeration',
                                        options: [
                                            {
                                                label: 'Engineering',
                                                value: 'Engineering',
                                            },
                                            {
                                                label: 'Founder',
                                                value: 'Founder',
                                            },
                                            {
                                                label: 'Leadership',
                                                value: 'Leadership',
                                            },
                                            {
                                                label: 'Marketing',
                                                value: 'Marketing',
                                            },
                                            {
                                                label: 'Product',
                                                value: 'Product',
                                            },
                                            {
                                                label: 'Sales',
                                                value: 'Sales',
                                            },
                                            {
                                                label: 'Other',
                                                value: 'Other',
                                            },
                                        ],
                                        required: true,
                                    },
                                    {
                                        label: 'Monthly active users',
                                        name: 'monthly_active_users',
                                        type: 'string',
                                        fieldType: 'number',
                                        required: true,
                                    },
                                    {
                                        label: 'What do you want to talk about on the call?',
                                        name: 'talk_about',
                                        type: 'string',
                                        required: true,
                                        fieldType: 'textarea',
                                    },
                                ],
                                buttonText: 'Submit',
                                message: "Message received. We'll be in touch!",
                                name: 'Contact sales',
                            }}
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
