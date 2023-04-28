import { Check2 } from 'components/Icons'
import Layout from 'components/Layout'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Contact from 'components/ContactSales/Contact'
import Form, { IField, Input, RadioGroup, TextArea } from 'components/Contact/Form'
import * as Yup from 'yup'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import SEO from 'components/seo'
import { useLocation } from '@reach/router'

const benefits = [
    'A year of PostHog',
    'Free PostHog merch',
    '50k of credit',
    'Private office hours',
    'Startup spotlight',
    'Opportunities for extra credit',
]

const fields = [
    {
        name: 'email',
        placeHolder: 'Email',
        Component: Input,
        hubspotField: 'email',
    },
    {
        name: 'firstName',
        placeHolder: 'First name',
        Component: Input,
        hubspotField: 'firstname',
    },
    {
        name: 'lastName',
        placeHolder: 'Last name',
        Component: Input,
        hubspotField: 'lastname',
    },
    {
        name: 'companyName',
        placeHolder: 'Company name',
        Component: Input,
        hubspotField: 'name',
        objectTypeId: '0-2',
    },
    {
        name: 'companyDomain',
        placeHolder: 'Company domain',
        Component: Input,
        hubspotField: 'domain',
    },
    {
        name: 'postHogOrganizationName',
        placeHolder: 'PostHog organization name',
        Component: Input,
        hubspotField: 'self_registration_organization_name',
    },
    {
        name: 'totalFunding',
        placeHolder: 'How much in total funding have you raised (USD)',
        Component: RadioGroup,
        options: [
            { label: 'Boostrapped', hubspotValue: -1 },
            { label: 'Under $100k', hubspotValue: 100_000 },
            { label: '$100k - $500k', hubspotValue: 500_000 },
            { label: '$500k - $1m', hubspotValue: 1_000_000 },
            { label: '$1m - $5m', hubspotValue: 5_000_000 },
            { label: 'More than $5m', hubspotValue: 100_000_000_000 },
        ],
        hubspotField: 'self_registration_raised',
        objectTypeId: '0-2',
    },
    {
        name: 'dateIncorporated',
        placeHolder: 'The date that your company was incorporated',
        Component: Input,
        type: 'date',
        hubspotField: 'self_registration_company_founded',
        objectTypeId: '0-2',
    },
]

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string(),
    email: Yup.string().email('Please enter a valid email address').required('Please enter a valid email address'),
    companyName: Yup.string().required('Please enter your company name'),
    companyDomain: Yup.string().required('Please enter your company name'),
    postHogOrganizationName: Yup.string().required('Please enter your company name'),
    totalFunding: Yup.number().required('Please select a value'),
    dateIncorporated: Yup.string().required('Please enter a date'),
})

const Spotlight = ({ frontmatter: { title, featuredImage }, excerpt, fields: { slug } }) => {
    return (
        <div className="p-4 border border-gray-accent-light rounded-md">
            <h4>{title}</h4>
            <GatsbyImage className="rounded-md" image={getImage(featuredImage)} />
            <p className="my-4">{excerpt}</p>
            <Link to={slug}>Read the full article here</Link>
        </div>
    )
}

export default function Startups() {
    const { href } = useLocation()

    const { spotlight } = useStaticQuery(graphql`
        {
            spotlight: mdx(fields: { slug: { eq: "/blog/startup-tigris" } }) {
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

    const handleSubmit = async (values, setSubmitted) => {
        const submission = {
            pageUri: href,
            pageName: 'Startups',
            fields: fields.map((field) => {
                const value = values[field.name]
                const option = field.options?.find((option) => value === option.value)?.hubspotValue
                return {
                    objectTypeId: field.objectTypeId ?? '0-1',
                    name: field.hubspotField,
                    value: option || value,
                }
            }),
        }

        const res = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/6958578/aa91765b-e790-4e90-847e-46c7ebf43705`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(submission),
            }
        ).catch((err) => {
            console.log(err)
            return err
        })

        if (res.status === 200) {
            setSubmitted(true)
            scroll.scrollToTop()
        }
    }

    return (
        <Layout>
            <SEO title={'Startups - PostHog'} />
            <section className="text-center py-40 max-w-screen-lg mx-auto relative px-5">
                <StaticImage
                    width={240}
                    className="absolute right-0 md:bottom-0 -bottom-12 md:max-w-[240px] max-w-[150px]"
                    src="./images/belay-on.png"
                />
                <StaticImage
                    width={200}
                    className="absolute left-0 bottom-0 max-w-[120px] md:max-w-[200px]"
                    src="./images/on-belay.png"
                />
                <div className="relative">
                    <h1>Let's do this together</h1>
                    <p>PostHog can help your startup get to where it needs to be</p>
                </div>
            </section>
            <section className="grid md:grid-cols-2 gap-y-8 md:gap-y-0 md:gap-x-12 max-w-[1100px] mx-auto px-5 my-16">
                <div>
                    <h4>Benefits with PostHog for startups</h4>
                    <ul className="list-none p-0 m-0 grid grid-flow-row md:grid-cols-2 gap-y-4">
                        {benefits.map((benefit) => {
                            return (
                                <li className="flex items-start space-x-2" key={benefit}>
                                    <Check2 className="w-4 opacity-57 flex-shrink-0 mt-[2px]" />
                                    <span className="leading-tight">{benefit}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="mt-6 md:mt-8">
                        <Spotlight {...spotlight} />
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <h3>Apply for the PostHog for startups program</h3>
                    <Form
                        pageName="Startups"
                        validationSchema={validationSchema}
                        fields={fields}
                        onSubmit={handleSubmit}
                    />
                </div>
            </section>
        </Layout>
    )
}
