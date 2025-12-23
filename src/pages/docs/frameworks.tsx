import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'

import { SEO } from 'components/seo'
import Link from 'components/Link'
import List from 'components/List'
import ReaderView from 'components/ReaderView'
import useFrameworkList from 'hooks/docs/useFrameworkList'

const Frameworks: React.FC = () => {
    const frameworks = useFrameworkList()

    return (
        <ReaderView>
            <SEO title="Frameworks - Documentation - PostHog" />
            <CloudinaryImage
                alt=""
                className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
            />
            <h1 className="text-4xl mt-0 mb-2">Framework guides</h1>
            <h3 className="text-lg font-semibold text-secondary leading-tight">
                PostHog works with most popular web frameworks and services.
            </h3>

            <section className="my-12 clear-both">
                <List
                    className="grid md:grid-cols-2 gap-1"
                    items={frameworks.map(({ label, url, image }) => ({
                        label,
                        url,
                        image,
                    }))}
                />
            </section>

            <hr />

            <p>
                Interested in writing a framework guide?{' '}
                <Link to="https://github.com/posthog/posthog.com" external>
                    Submit a PR to our website repo on GitHub.
                </Link>
            </p>
        </ReaderView>
    )
}

export default Frameworks
