import React, { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import Modal from 'components/Modal'
import HubSpotForm from 'components/HubSpotForm'
import { Close2 } from 'components/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { MenuContainer } from 'components/PostLayout/MobileNav'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'

const AccessForm = () => {
    return (
        <HubSpotForm
            buttonOptions={{ size: 'lg' }}
            formID="58118087-6363-4889-b2ca-18e5e10cea1f"
            customFields={{
                maus: {
                    type: 'radioGroup',
                    options: [
                        { label: 'Under 10k/mo', value: 10_000 },
                        { label: '10k-50k/mo', value: 50_000 },
                        { label: '50k-100k/mo', value: 100_000 },
                        { label: '100k-500k/mo', value: 500_000 },
                        { label: '500k-1m/mo', value: 100_000_000 },
                        { label: 'More than 1m/mo', value: 100_000_000_000 },
                    ],
                },
            }}
        />
    )
}

export const Intro = ({ image = true }) => {
    const breakpoints = useBreakpoint()
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <>
            {breakpoints.md ? (
                modalOpen && (
                    <MenuContainer setOpen={(open) => setModalOpen(!!open)}>
                        <AccessForm />
                    </MenuContainer>
                )
            ) : (
                <Modal open={modalOpen} setOpen={setModalOpen}>
                    <div onClick={() => setModalOpen(false)} className="absolute w-full h-full">
                        <div
                            className="max-w-2xl bg-accent dark:bg-accent-dark relative w-full p-5 pt-12 ml-auto h-full border-l border-border dark:border-dark"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute right-5 top-3">
                                <button onClick={() => setModalOpen(false)}>
                                    <Close2
                                        className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
                                        fill="currentColor"
                                    />
                                </button>
                            </div>
                            <AccessForm />
                        </div>
                    </div>
                </Modal>
            )}
            <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row gap-8 pt-2 mb-8">
                <div className="p-4 md:p-8">
                    <h1 className="text-4xl mt-0 mb-2 flex items-center space-x-2">
                        <span>Data warehouse</span>
                    </h1>
                    <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                        A single source for all your important data
                    </h3>
                    <CallToAction onClick={() => setModalOpen(true)}>Join the waitlist</CallToAction>
                </div>

                {image && (
                    <figure className="m-0 p-0">
                        <StaticImage
                            alt=""
                            placeholder="none"
                            quality={100}
                            className=""
                            src="../../../contents/images/products/data-warehouse/data-warehouse.png"
                        />
                    </figure>
                )}
            </div>
        </>
    )
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && <QuickLinks items={docsMenu.children[7].children} />}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Article"
                        title="Creating a table"
                        description="Get started by creating your first table"
                        Image={
                            <StaticImage
                                alt=""
                                objectPosition="right"
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../../contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        }
                        url="/docs/data-warehouse/setup#creating-a-table"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to do time-based breakdowns"
                        description="Break down events by time of day, hourly, and even minute-by-minute"
                        Image={
                            <StaticImage
                                alt=""
                                objectPosition="right"
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../../contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        }
                        url="/tutorials/time-breakdowns"
                    />
                    <ResourceItem
                        type="Guide"
                        title="The power of HogQL’s sum() aggregation"
                        description="Unlock a new level of aggregation customization"
                        Image={
                            <StaticImage
                                alt=""
                                objectPosition="right"
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../../contents/images/products/data-warehouse/warehouse-hog.png"
                            />
                        }
                        url="/tutorials/hogql-sum-aggregation"
                    />
                </ul>
            </section>
        </>
    )
}

const DataWarehouse: React.FC = () => {
    return (
        <Layout>
            <SEO title="Data warehouse - Docs - PostHog" />

            <PostLayout title={'Data warehouse'} hideSurvey hideSidebar>
                <Intro />
                <Content />
                <CallToAction to="/docs/data-warehouse/setup" width="full">
                    Visit the manual
                </CallToAction>
            </PostLayout>
        </Layout>
    )
}

export default DataWarehouse
