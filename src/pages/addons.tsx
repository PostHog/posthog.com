import React from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { IconAdvanced } from '@posthog/icons'

// ... other imports ...

const FeatureItem = ({ icon: Icon, name, description }) => (
    <div className="flex gap-2">
        <div className="shrink-0">
            <Icon className="size-8" />
        </div>
        <div className="flex-1">
            <h4 className="text-base my-1">{name}</h4>
            <p className="text-sm text-primary/75 dark:text-primary-dark/75">{description}</p>
        </div>
    </div>
)

const features = [
    {
        "group": "Features",
        "items": [
            {
                "name": "Unlimited projects",
                "description": "Create silos of data within PostHog. All data belongs to a single project and all queries are project-specific.",
                "icon": IconAdvanced
            },
            {
                "name": "Managed reverse proxy",
                "description": "Use our managed proxy service to send events through your own domain. Capture more usage data that might otherwise be intercepted by ad blockers without needing to set up and maintain the proxy yourself.",
                "icon": IconAdvanced
            },
            {
                "name": "White labeling",
                "description": "Use your own branding on surveys, shared dashboards, shared insights, and more.",
                "icon": IconAdvanced
            },
            {
                "name": "Ingestion taxonomy",
                "description": "Mark events as verified or unverified to help you understand the quality of your data.",
                "icon": IconAdvanced
            },
            {
                "name": "Dashboard tags",
                "description": "Organize dashboards with tags.",
                "icon": IconAdvanced
            }
        ]
    },
    {
        "group": "Security",
        "items": [
            {
                "name": "Enforce SSO login",
                "description": "Users can only sign up and log in to your PostHog organization with your specified SSO provider.",
                "icon": IconAdvanced
            },
            {
                "name": "Enforce 2FA",
                "description": "Require all users in your organization to enable two-factor authentication.",
                "icon": IconAdvanced
            },
            {
                "name": "Automatic provisioning",
                "description": "Verify your domains to enforce SSO and automatically add users with matching email addresses to your organization.",
                "icon": IconAdvanced
            },
            {
                "name": "Project permissions",
                "description": "Restrict access to data within the organization to only those who need it.",
                "icon": IconAdvanced
            },
            {
                "name": "Advanced permissions",
                "description": "Control who can access and modify data and features within your organization.",
                "icon": IconAdvanced
            },
            {
                "name": "Security assessment",
                "description": "Security assessment",
                "icon": IconAdvanced
            }
        ]
    },
    {
        "group": "Compliance",
        "items": [
            {
                "name": "Audit logs",
                "description": "See who in your organization has accessed or modified entities within PostHog.",
                "icon": IconAdvanced
            },
            {
                "name": "HIPAA BAA",
                "description": "Get a signed HIPAA Business Associate Agreement (BAA) to use PostHog in a HIPAA-compliant manner.",
                "icon": IconAdvanced
            }
        ]
    },
    {
        "group": "Support",
        "items": [
            {
                "name": "Priority support",
                "description": "Get help from our team faster than other customers with a 12-hour response time target",
                "icon": IconAdvanced
            },
            {
                "name": "Personalized onboarding",
                "description": "Get help from our team to create dashboards that will help you understand your data and your business.",
                "icon": IconAdvanced
            }
        ]
    }
]

const Addons = (): JSX.Element => {
    return <Layout parent={pricingMenu}>
        <section className="w-11/12 mx-auto px-4 2xl:px-12 py-8">
            <h1 className="text-4xl 2xl:text-5xl mb-1">Addons</h1>
            <p className="text-lg font-semibold opacity-75">We've moved specialized functionality into add-ons so you never pay for things you don't need.</p>
            <div className="grid md:grid-cols-12 gap-12 pt-8">
                <div className="md:col-span-4">
                    <h2>Teams</h2>
                    <p className="text-[15px]">A smorgasbord of features for teams, plus security and compliance tools to keep large teams happy.</p>
                    <div className="flex items-baseline">
                        <strong className="text-xl">$450</strong>
                        <span className="text-[15px] opacity-60">/mo</span>
                    </div>
                </div>
                <div className="md:col-span-8">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                        {features.map((featureGroup, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                <div className="md:col-span-2">
                                    <h3 className="text-lg pt-1 mb-0">{featureGroup.group}</h3>
                                </div>
                                {featureGroup.items.map((feature, itemIndex) => (
                                    <FeatureItem key={`${groupIndex}-${itemIndex}`} {...feature} />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    </Layout>
}

export default Addons
