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
import { Script } from 'gatsby'
import Editor from 'components/Editor'
import ScrollArea from 'components/RadixUI/ScrollArea'

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
        className={`overflow-hidden transition-all duration-300 h-auto max-h-[90vh] border border-primary rounded leading-[0] shadow-xl mb-8`}
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
        <>
            <Script
                id="default-form-script"
                dangerouslySetInnerHTML={{
                    __html: `!function(t,e){const o=509041,n=482;let a=0,i=!1;t.__default__={form_id:o,team_id:n,listenToIds:["contact-sales"]},function t(){const r=e.createElement("script");r.async=!0,r.src="https://import-cdn.default.com/v2/index.js",r.onload=()=>{i=!0,console.info("[Default.com] Powered by Default.com")},r.onerror=()=>{!function(t,e){try{fetch("https://nucleus.default.com/import/error",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({errorMessage:t,payload:{attempt:e,form_id:o,team_id:n,location:window.location.href,userAgent:navigator.userAgent,timestamp:Date.now()}})})}catch(t){}}("Script failed to load",a),++a<=3&&setTimeout(t,1e3*a)},e.head.appendChild(r)}()}(window,document);`,
                }}
            />
            <SEO
                title="Talk to a human – Book a PostHog demo"
                description="PostHog is self-serve, but our team is here if you need us. Book a demo to get setup help, discuss your technical requirements, or see features in action."
                image={`/images/og/talk-to-a-human.png`}
            />
            <ScrollArea>
                <div data-scheme="primary" className="bg-accent text-primary h-full" data-default-form-id="509041">
                    <SalesforceForm
                        type="lead"
                        buttonOptions={{
                            size: 'md',
                        }}
                        formOptions={{
                            className: 'pb-4 flex flex-col',
                        }}
                        form={{
                            fields: [
                                {
                                    label: 'From',
                                    placeholder: 'Your email',
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
                                {
                                    label: 'Where did you hear about us?',
                                    type: 'string',
                                    name: 'where_did_you_hear_about_us',
                                    required: false,
                                },
                            ],
                            buttonText: 'Send',
                            message: "Message received! We'll be in touch.",
                            name: 'Contact sales',
                        }}
                    />
                </div>
            </ScrollArea>
        </>
    )
}
