import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'

import { SEO } from 'components/seo'
import Link from 'components/Link'
import List from 'components/List'
import ReaderView from 'components/ReaderView'
import useServicesList from 'hooks/docs/useServicesList'

const Services: React.FC = () => {
    const services = useServicesList()

    return (
        <ReaderView>
            <SEO title="Services - Documentation - PostHog" />
            <CloudinaryImage
                alt=""
                className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
            />
            <h1 className="text-4xl mt-0 mb-2">Service integrations</h1>
            <h3 className="text-lg font-semibold text-secondary leading-tight">
                Connect PostHog with popular services, no-code builders, and automation tools.
            </h3>

            <section className="my-12 clear-both">
                <List
                    className="grid md:grid-cols-2 gap-1"
                    items={services.map(({ label, url, image }) => ({
                        label,
                        url,
                        image,
                    }))}
                />
            </section>

            <hr />

            <p>
                Interested in writing a service integration guide?{' '}
                <Link to="https://github.com/posthog/posthog.com" external>
                    Submit a PR to our website repo on GitHub.
                </Link>
            </p>
        </ReaderView>
    )
}

export default Services
