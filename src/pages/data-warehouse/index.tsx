import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { dataWarehouse } from '../../hooks/productData/data_warehouse'
import SEO from 'components/seo'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { ZoomImage } from 'components/ZoomImage'
import OSTable from 'components/OSTable'
import { useCustomers } from '../../hooks/useCustomers'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function DataWarehouse(): JSX.Element {
    const { getCustomer, hasCaseStudy } = useCustomers()

    // Create table structure for customers
    const customerTableColumns = [
        { name: '', width: 'minmax(auto,80px)', align: 'center' as const },
        { name: 'Company', width: 'minmax(150px,200px)', align: 'center' as const },
        { name: '', width: 'minmax(auto,1fr)', align: 'left' as const },
        { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    ]

    const customerTableRows = Object.entries(dataWarehouse.customers).map(([slug, customer], index) => {
        const customerData = getCustomer(slug)

        // Determine logo rendering logic
        const renderLogo = () => {
            if (!customerData?.logo) {
                return (
                    <span className="text-xl font-semibold">
                        {customerData?.name || slug.charAt(0).toUpperCase() + slug.slice(1)}
                    </span>
                )
            }

            // Check if logo is a React component (single SVG format)
            if (typeof customerData.logo === 'function') {
                const LogoComponent = customerData.logo
                const heightClass = customerData.height ? `h-${customerData.height / 2}` : ''
                const className = `fill-current object-contain ${heightClass}`.trim()

                return (
                    <div className="" style={{ maxHeight: customerData.height ? customerData.height * 2 + 'px' : '' }}>
                        <LogoComponent className={`${className}`} />
                    </div>
                )
            }

            // Otherwise, it's the existing light/dark object format
            const heightClass = customerData.height ? `max-h-${customerData.height / 2}` : 'max-h-6'

            return (
                <>
                    <img
                        src={customerData.logo.light}
                        alt={customerData.name}
                        className={`w-auto object-contain dark:hidden ${heightClass}`}
                    />
                    <img
                        src={customerData.logo.dark}
                        alt={customerData.name}
                        className={`w-auto object-contain hidden dark:block ${heightClass}`}
                    />
                </>
            )
        }

        return {
            cells: [
                { content: index + 1 },
                {
                    content: renderLogo(),
                    className: '!p-2',
                },
                {
                    content: (
                        <>
                            <strong>...{customer.headline}</strong>
                            <span className="text-sm italic">"{customer.description}"</span>
                        </>
                    ),
                    className: '!px-4 !py-2',
                },
                {
                    content: hasCaseStudy(slug) ? (
                        <Link to={`/customers/${slug}`} state={{ newWindow: true }} className="underline font-semibold">
                            Link
                        </Link>
                    ) : null,
                    className: 'text-sm',
                },
            ],
        }
    })

    return (
        <>
            <SEO
                title={dataWarehouse.seo.title}
                description={dataWarehouse.seo.description}
                image="images/og/data-warehouse.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title={dataWarehouse.overview.title}>
                <p className="text-base font-semibold">{dataWarehouse.overview.description}</p>

                <ZoomImage>
                    <CloudinaryImage src={dataWarehouse.screenshots[0].src} alt={dataWarehouse.screenshots[0].alt} />
                </ZoomImage>

                <h3>Customers who love PostHog's Data Warehouse</h3>
                <OSTable columns={customerTableColumns} rows={customerTableRows} className="bg-primary" size="sm" />

                <h3>Features</h3>
                <ul>
                    {dataWarehouse.features.map((feature, index) => (
                        <li key={index}>
                            <strong>{feature.title}:</strong> {feature.description}
                            {feature.features && (
                                <ul>
                                    {feature.features.map((subFeature, subIndex) => (
                                        <li key={subIndex}>
                                            <strong>{subFeature.title}:</strong> {subFeature.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                <h3>Common questions</h3>
                <ul>
                    {dataWarehouse.questions.map((question, index) => (
                        <li key={index}>
                            <Link to={question.url} state={{ newWindow: true }}>
                                {question.question}
                            </Link>
                        </li>
                    ))}
                </ul>

                <h3>Works great with</h3>
                <ul>
                    {dataWarehouse.pairsWith.map((pair, index) => (
                        <li key={index}>
                            <Link to={`/${pair.slug}`} state={{ newWindow: true }}>
                                {pair.slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                            </Link>
                            : {pair.description}
                        </li>
                    ))}
                </ul>
            </ReaderView>
        </>
    )
}
