import CloudinaryImage from 'components/CloudinaryImage'
import { Check2 } from 'components/Icons'
import Layout from 'components/Layout'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import * as Yup from 'yup'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import SEO from 'components/seo'
import HubSpotForm from 'components/HubSpotForm'
import SalesforceForm from 'components/SalesforceForm'

const benefits = [
    '$50k in PostHog credit',
    '$25k in DigitalOcean credit',
    'A whole year of PostHog',
    'Free PostHog merch',
    'Exclusive newsletters',
    'Referral bonuses',
]

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Please enter your first name'),
    lastname: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Please enter a valid email address').required('Please enter a valid email address'),
    name: Yup.string().required('Please enter your company name'),
    domain: Yup.string()
        .url('Please enter your company domain, beginning with https://')
        .required('Please enter your company domain, beginning with https://'),
    self_registration_organization_name: Yup.string().required('Please enter your PostHog organization name'),
    self_registration_raised: Yup.number().required('Please select a value'),
    self_registration_company_founded: Yup.string().required('Please enter a date'),
    who_referred_you_to_posthog_: Yup.string(),
})

const Spotlight = ({ frontmatter: { title, featuredImage }, excerpt, fields: { slug } }) => {
    return (
        <div className="p-4 border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded-md md:max-w-sm">
            <h4>{title}</h4>
            <GatsbyImage className="rounded-md" image={getImage(featuredImage)} />
            <p className="my-4 text-[15px]">{excerpt}</p>
            <Link to={slug} external>
                Read the full story
            </Link>
        </div>
    )
}

export default function Startups() {
    const { spotlight } = useStaticQuery(graphql`
        {
            spotlight: mdx(fields: { slug: { eq: "/spotlight/startup-bugprove" } }) {
                frontmatter {
                    title
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                fields {
                    slug
                }
                excerpt(pruneLength: 200)
            }
        }
    `)

    return (
        <Layout>
            <SEO title={'Startups - PostHog'} />
            <section className="text-center py-20 max-w-screen-lg mx-auto relative px-5">
                <div className="absolute right-0 -bottom-12 md:-bottom-20 md:max-w-[240px] max-w-[150px]">
                    <CloudinaryImage width={240} src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Startups/images/belay-on.png" />
                </div>
                <div className="absolute left-0 bottom-0 max-w-[120px] md:max-w-[200px]">
                    <CloudinaryImage width={200} src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Startups/images/on-belay.png" />
                </div>
                <div className="relative hidden lg:block">
                    <h1 className="max-w-lg mx-auto pb-2 text-center">Apply for PostHog's startup program</h1>

                    <div className="max-w-sm rounded p-4 text-left bg-accent dark:bg-accent-dark border border-border dark:border-dark mx-auto">
                        <h3 className="text-lg mb-1">How to apply:</h3>
                        <ol>
                            <li>
                                <Link to="https://app.posthog.com/signup" externalNoIcon>
                                    Sign up
                                </Link>{' '}
                                for PostHog Cloud
                            </li>
                            <li>
                                Visit the billing page and upgrade to the <em>Paid</em> plan
                            </li>
                            <li>Complete the application below</li>
                        </ol>
                    </div>
                </div>
            </section>

            <div className="relative lg:hidden -mb-12">
                <h1 className="max-w-lg mx-auto pb-2 text-center leading-tight px-4">
                    Apply for PostHog's startup program
                </h1>

                <div className="text-left mx-4">
                    <h4>How to apply:</h4>
                    <ol>
                        <li>
                            <Link to="https://app.posthog.com/signup" externalNoIcon>
                                Sign up
                            </Link>{' '}
                            for PostHog Cloud
                        </li>
                        <li>
                            Visit the billing page and upgrade to the <em>Paid</em> plan
                        </li>
                        <li>Complete the application below</li>
                    </ol>
                </div>
            </div>

            <section className="grid md:grid-cols-2 gap-y-8 md:gap-y-0 md:gap-x-12 max-w-[1100px] mx-auto px-5 my-24">
                <div>
                    <h4>Here's what you'll get...</h4>
                    <ul className="list-none p-0 m-0 grid grid-flow-row md:grid-cols-2 gap-y-4">
                        {benefits.map((benefit) => {
                            return (
                                <li className="flex items-start space-x-2" key={benefit}>
                                    <Check2 className="w-4 opacity-57 flex-shrink-0 mt-[2px]" />
                                    <span className="leading-tight text-[15px]">{benefit}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="mt-6 md:mt-8">
                        <Spotlight {...spotlight} />
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <h3 className="mb-0">Finish your application</h3>
                    <p>Remember to complete the steps listed above!</p>
                    <SalesforceForm
                        type="contact"
                        source="startup"
                        customMessage={
                            <>
                                <h4>
                                    ✅ <strong>Application received!</strong>
                                </h4>
                                <p>We'll get back to you once we've had a chance to review your information.&nbsp;</p>
                                <p>
                                    <strong>Reminder:</strong> If you haven't signed up for PostHog yet, be sure to
                                    follow steps 1-2 above!
                                </p>
                                <p className="mb-0">
                                    In the meantime, why not checkout our <Link to="/questions">community forum</Link>?
                                </p>
                            </>
                        }
                        form={{
                            fields: [
                                {
                                    label: 'Email',
                                    name: 'email',
                                    type: 'string',
                                    fieldType: 'email',
                                    required: true,
                                },
                                {
                                    label: 'First name',
                                    name: 'first_name',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    label: 'Last name',
                                    name: 'last_name',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    label: 'Company name',
                                    name: 'company',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    label: 'Company domain',
                                    name: 'startup_domain',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    label: 'PostHog organization name',
                                    name: 'posthog_organization_name',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    label: 'How much in total funding have you raised (USD)',
                                    name: 'raised',
                                    type: 'enumeration',
                                    options: [
                                        { label: 'Bootstrapped', value: 0 },
                                        { label: 'Under $100k', value: 100_000 },
                                        { label: '$100k - $500k', value: 500_000 },
                                        { label: '$500k - $1m', value: 1_000_000 },
                                        { label: '$1m - $5m', value: 5_000_000 },
                                        { label: 'More than $5m', value: 100_000_000_000 },
                                    ],
                                    required: true,
                                },
                                {
                                    label: 'The date that your company was incorporated',
                                    name: 'incorpation_date',
                                    type: 'string',
                                    fieldType: 'date',
                                    required: true,
                                },
                                {
                                    label: 'The company that referred you',
                                    name: 'referrer',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    label: 'Are you building LLM-powered features?',
                                    name: 'is_building_with_llms',
                                    type: 'enumeration',
                                    required: true,
                                    options: [
                                        { label: 'Yes', value: 'true' },
                                        { label: 'No', value: 'false' },
                                    ],
                                },
                            ],
                            name: 'Startup application',
                        }}
                    />
                </div>
            </section>
        </Layout>
    )
}
