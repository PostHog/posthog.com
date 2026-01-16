import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Intro from 'components/Docs/Intro'
import ResourceItem from 'components/Docs/ResourceItem'
import { CalloutBox } from 'components/Docs/CalloutBox'

const ProductTours: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Product Tours - Docs - PostHog" />
            <CalloutBox icon="IconFlask" title="Product tours is in private alpha" type="info">
                <p>
                    Product Tours is currently in private alpha.{' '}
                    <a href="https://us.posthog.com/external_surveys/019af5f5-a50e-0000-b10f-e8c30c0b73a0">
                        Share your thoughts
                    </a>{' '}
                    and we'll reach out with early access.
                </p>
            </CalloutBox>
            <Intro
                subheader="Getting started"
                title="Product Tours"
                description="Guide users through your product with interactive tours, announcements, and banners."
                buttonText="Create your first tour"
                buttonLink="/docs/product-tours/start-here"
                imageClasses="max-h-48 md:max-h-64"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_tours_3b98daa3aa.png"
            />
            <section className="mb-12">
                <h3 className="m-0 text-xl">
                    Tours, but also <em>more</em>
                </h3>
                <p className="text-[15px]">Everything you need to communicate in-app</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        title="Product tours"
                        description="Multi-step walkthroughs that highlight UI elements and guide users through features"
                        url="/docs/product-tours/creating-product-tours"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Announcements"
                        description="Modal pop-ups for feature launches, changelogs, or important messages"
                        url="/docs/product-tours/creating-announcements"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Banners"
                        description="Top-of-page alerts for promotions, notices, or subtle CTAs"
                        url="/docs/product-tours/creating-announcements"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                </ul>
            </section>
        </ReaderView>
    )
}

export default ProductTours
