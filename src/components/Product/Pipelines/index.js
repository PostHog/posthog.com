import CloudinaryImage from 'components/CloudinaryImage'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useState, useCallback, useEffect, useLayoutEffect } from 'react'
import Link from 'components/Link'
import Layout from '../../Layout'
import { SEO } from 'components/seo'
import { AnimatePresence, motion } from 'framer-motion'
import { IconSearch, IconPlug, IconArrowRightDown } from '@posthog/icons'
import Fuse from 'fuse.js'
import TeamMembers from '../TeamMembers'
import SideModal from 'components/Modal/SideModal'
import Questions from '../Questions'
import { DocLinks } from 'components/Products/DocsLinks'
import { docsMenu } from '../../../navs'
import { MDXProvider } from '@mdx-js/react'
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useLayoutData } from 'components/Layout/hooks'
import { Hero } from 'components/Products/Hero'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { StaticImage } from 'gatsby-plugin-image'
import { MenuItem, menuVariants } from 'components/PostLayout/Menu'
import { CallToAction } from 'components/CallToAction'
import { Question } from 'components/Products/Question'
import { Badge } from 'components/Pricing/PricingTable/Plan'
import CTA from 'components/Home/CTA'
import { Subfeature } from 'components/Products/Subfeature'
import {
    IconAsterisk,
    IconBolt,
    IconDatabase,
    IconBuilding,
    IconCursorClick,
    IconEye,
    IconFlask,
    IconGraph,
    IconPeople,
    IconPerson,
    IconRevert,
    IconRewindPlay,
    IconServer,
    IconToggle,
    IconCrown,
    IconStack,
    IconHeadset,
    IconWarning,
    IconMessage,
} from '@posthog/icons'
import { Link as SmoothScrollLink } from 'react-scroll'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import ReactFlow, {
    ReactFlowProvider,
    Handle,
    Position,
    useNodesState,
    useEdgesState,
    useReactFlow,
    MarkerType,
    Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import Profile from '../../Team/Profile'
import APIExamples from './APIExamples'
import Configuration from './Configuration'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'

const team = 'CDP'
const teamSlug = '/teams/cdp'

const sources = [
    {
        id: 'source-stripe',
        name: 'Stripe',
        description: 'Payment processing platform',
        icon_url: '/static/services/stripe.png',
        category: ['Custom'],
    },
    {
        id: 'source-hubspot',
        name: 'Hubspot',
        description: 'CRM platform',
        icon_url: '/static/services/hubspot.png',
        category: ['CRM'],
    },
    {
        id: 'source-postgres',
        name: 'Postgres',
        description: 'Open source relational database',
        icon_url: '/static/services/postgres.png',
        category: ['Custom'],
    },
    {
        id: 'source-mysql',
        name: 'MySQL',
        description: 'Popular open-source database',
        icon_url: '/static/services/mysql.png',
        category: ['Custom'],
    },
    {
        id: 'source-mssql',
        name: 'MSSQL',
        description: 'Microsoft SQL Server',
        icon_url: '/static/services/sql-azure.png',
        category: ['Custom'],
    },
    {
        id: 'source-zendesk',
        name: 'Zendesk',
        description: 'Customer service software',
        icon_url: '/static/services/zendesk.png',
        category: ['Customer Success'],
    },
    {
        id: 'source-snowflake',
        name: 'Snowflake',
        description: 'Cloud data platform',
        icon_url: '/static/services/snowflake.png',
        category: ['Analytics'],
    },
    {
        id: 'source-salesforce',
        name: 'Salesforce',
        description: 'Customer relationship management',
        icon_url: '/static/services/salesforce.png',
        category: ['CRM'],
    },
    {
        id: 'source-vitally',
        name: 'Vitally',
        description: 'Customer success platform',
        icon_url: '/static/services/vitally.png',
        category: ['Customer Success'],
    },
    {
        id: 'source-bigquery',
        name: 'BigQuery',
        description: 'Google Cloud data warehouse',
        icon_url: '/static/services/bigquery.png',
        category: ['Analytics'],
    },
]

const pairsWithItemCount = 2
const PairsWithArray = [
    {
        icon: <IconGraph />,
        color: 'blue',
        product: 'Product analytics',
        description:
            'Get your source data into PostHog, then analyze it alongside your product data to unlock new insights and discover new user behaviours.',
        url: '/product-analytics',
    },
    {
        icon: <IconDatabase />,
        color: 'lilac',
        product: 'Data warehouse',
        description:
            'Build a data warehouse in PostHog and then pull in data from all your platforms to one place where it can be easily interrogated.',
        url: '/product-analytics',
    },
]

const Category = ({ onClick, value, active }) => {
    return (
        <>
            <button
                onClick={() => onClick(value)}
                className={`group text-left text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark flex justify-between items-center relative text-[15px] md:px-0 md:pl-3 py-0.5 rounded cursor-pointer px-2 md:border-none border border-input w-auto ${
                    active ? 'border-inherit dark:border-inherit' : ''
                }`}
            >
                <AnimatePresence>
                    {active && (
                        <motion.span
                            variants={menuVariants}
                            className="absolute w-[4px] bg-red rounded-[2px] top-[2px] h-[calc(100%_-_4px)] left-0 md:inline hidden"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        />
                    )}
                </AnimatePresence>
                <MenuItem color={active} name={value} />
            </button>
        </>
    )
}

const Categories = ({ type, categories, onClick, selectedCategory, selectedType }) => {
    return (
        <li className="mt-3">
            <p className="flex gap-2 items-baseline text-sm font-semibold md:mx-3 mb-1">
                <span className="opacity-25">{type}</span>
            </p>
            <ul className="list-none m-0 p-0 md:block flex whitespace-nowrap flex-wrap md:mx-0 -mx-1">
                {['All', ...categories].map((category) => {
                    const active = selectedType === type && selectedCategory === category
                    return (
                        <li className="md:m-0 m-1" key={category}>
                            <Category key={category} value={category} onClick={onClick} active={active} />
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

const PostHogNode = ({ data, isMobile }) => {
    return (
        <div>
            <div className="max-w-sm">
                <div className="p-3 rounded-full bg-white border border-primary">
                    {data.icons && <img src={data.icons[0]} alt={data.label} className="size-10" />}
                </div>
            </div>
            <Handle
                type="source"
                position={isMobile ? Position.Bottom : Position.Right}
                style={isMobile ? { bottom: -5 } : { right: -5 }}
                className="opacity-0"
            />
        </div>
    )
}

const CustomNode = ({ data }) => (
    <div>
        <Handle
            type="target"
            position={Position.Left}
            style={{ left: -5, transform: 'none', top: 14 }}
            className="opacity-0"
        />

        <div className="max-w-sm flex gap-3 items-start">
            <ul className="flex items-center m-0 p-0 list-none flex-shrink-0">
                {data.icons?.map((icon) => {
                    return (
                        <li
                            key={icon}
                            className="rounded-full bg-white size-8 overflow-hidden border border-primary inline-block even:!-ml-2 relative"
                        >
                            <img src={icon} alt={data.label} className="size-full absolute inset-0" />
                        </li>
                    )
                })}
            </ul>
            <div className={`mt-1 ${data.icons?.length === 1 ? 'pl-6' : ''}`}>
                <strong>{data.label}</strong>
                <p className="text-sm">{data.description}</p>
            </div>
        </div>
    </div>
)

const initialNodes = [
    {
        id: 'posthog',
        type: 'custom',
        data: {
            label: 'PostHog',
            icons: ['https://us.posthog.com/static/posthog-icon.svg'],
            description: 'Your data platform',
        },
        position: { x: 0, y: 0 },
    },
    {
        id: 'crm',
        type: 'custom',
        position: { x: 300, y: 0 },
        data: {
            label: 'CRM',
            icons: [
                'https://us.posthog.com/static/services/hubspot.png',
                'https://us.posthog.com/static/services/salesforce.png',
            ],
            description:
                'Sync PostHog with Hubspot or Salesforce to create a single view of each customer and auto-assign leads.',
        },
    },
    {
        id: 'support',
        type: 'custom',
        position: { x: 300, y: 100 },
        data: {
            label: 'Support',
            icons: [
                'https://us.posthog.com/static/services/zendesk.png',
                'https://us.posthog.com/static/services/intercom.png',
            ],
            description:
                'Update user information in Zendesk or Intercom to route requests based on priority, topic, or user payments.',
        },
    },
    {
        id: 'messaging',
        type: 'custom',
        position: { x: 300, y: 200 },
        data: {
            label: 'Messaging',
            icons: [
                'https://us.posthog.com/static/services/customerio.png',
                'https://us.posthog.com/static/services/braze.png',
            ],
            description:
                'Pipe data to Customer.io or Braze to power onboarding emails, run marketing campaigns, or send newsletters.',
        },
    },
    {
        id: 'enrichment',
        type: 'custom',
        position: { x: 300, y: 300 },
        data: {
            label: 'Enrichment',
            icons: ['https://us.posthog.com/static/services/clearbit.png'],
            description:
                'Load data from the Clearbit API to enrich user data and get user info automatically without having to ask.',
        },
    },
    {
        id: 'internal-alerts',
        type: 'custom',
        position: { x: 300, y: 400 },
        data: {
            label: 'Internal alerts',
            icons: [
                'https://us.posthog.com/static/services/slack.png',
                'https://us.posthog.com/static/services/zapier.png',
            ],
            description:
                'Trigger webhooks or send messages directly to Slack to alert you about errors, churns, new leads, and more.',
        },
    },
]

const initialEdges = [
    { id: 'e-posthog-crm', source: 'posthog', target: 'crm' },
    { id: 'e-posthog-support', source: 'posthog', target: 'support' },
    { id: 'e-posthog-messaging', source: 'posthog', target: 'messaging' },
    { id: 'e-posthog-enrichment', source: 'posthog', target: 'enrichment' },
    { id: 'e-posthog-internal-alerts', source: 'posthog', target: 'internal-alerts' },
]

const CustomNodePicker = (props) => {
    return props.id === 'posthog' ? <PostHogNode {...props} /> : <CustomNode {...props} />
}

const Flow = ({ isMobile }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, onEdgesChange] = useEdgesState(initialEdges)
    const { fitView } = useReactFlow()

    // Use useCallback to memoize the updateLayout function
    const updateLayout = useCallback(() => {
        setNodes((prevNodes) =>
            prevNodes.map((node, index) => {
                if (node.id === 'posthog') {
                    return { ...node, position: { x: 0, y: isMobile ? 0 : 284 } }
                }
                return {
                    ...node,
                    position: {
                        x: isMobile ? 80 : 200,
                        y: index * 115,
                    },
                }
            })
        )
    }, [isMobile])

    useLayoutEffect(() => {
        updateLayout()
        setTimeout(() => fitView(), 0)
    }, [isMobile])

    // Memoize edgeOptions
    const edgeOptions = useMemo(
        () => ({
            type: isMobile ? 'default' : 'smoothstep',
            style: {
                stroke: '#888',
                ...(isMobile ? { strokeWidth: 2 } : {}),
            },
            animated: true,
        }),
        [isMobile]
    )

    const proOptions = { hideAttribution: true }

    const nodeTypes = useMemo(
        () => ({
            custom: (props) => <CustomNodePicker {...props} isMobile={isMobile} />,
        }),
        [isMobile]
    )

    return (
        <ReactFlow
            className="!overflow-visible"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={edgeOptions}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnScroll={false}
            panOnDrag={false}
            zoomOnDoubleClick={false}
            preventScrolling={true}
            minZoom={1}
            maxZoom={1}
            proOptions={proOptions}
        />
    )
}

const CDPFlowChart = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="pointer-events-none px-12" style={{ height: isMobile ? '600px' : '500px', width: '100%' }}>
            <ReactFlowProvider>
                <Flow isMobile={isMobile} />
            </ReactFlowProvider>
        </div>
    )
}

export const getIconUrl = (iconUrl) => {
    return iconUrl?.startsWith('http') ? iconUrl : `https://us.posthog.com${iconUrl}`
}

export const NotifyMe = ({ pipeline }) => {
    const [submitted, setSubmitted] = useState(false)
    const { user } = useUser()
    const [email, setEmail] = useState('')
    const posthog = usePostHog()

    const handleNotifyMe = (pipeline) => {
        posthog?.capture('notify_me_pipeline', {
            name: pipeline.name,
            type: pipeline.type,
            email,
        })
        setSubmitted(true)
    }

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email)
        }
    }, [user])

    return (
        <div className="border border-input rounded p-4 bg-accent">
            {submitted ? (
                <p className="!m-0">
                    Thanks for your interest! We'll notify you when <strong>{pipeline.name}</strong> is available.
                </p>
            ) : (
                <>
                    <h3 className="!m-0 !leading-none !mb-0.5">Get notified</h3>
                    <p className="m-0 !mb-2.5">
                        Enter your email to get notified when this {pipeline.type} is available.
                    </p>
                    <div className="flex space-x-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-input rounded-md p-2 max-w-sm text-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="flex-shrink-0">
                            <CallToAction onClick={() => handleNotifyMe(pipeline)} type="primary">
                                Notify me
                            </CallToAction>
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}

const PipelinePreview = ({ pipeline }) => {
    return (
        <>
            <div className="article-content">
                {pipeline.mdx ? (
                    <MDXProvider
                        components={{
                            HideOnCDPIndex: () => null,
                        }}
                    >
                        <MDXRenderer>{pipeline.mdx.body}</MDXRenderer>
                    </MDXProvider>
                ) : (
                    <p>{pipeline.description}</p>
                )}
                {pipeline.status !== 'coming_soon' && pipeline.inputs_schema?.length > 0 && (
                    <>
                        <h2 className="!mt-2">Configuration</h2>
                        <Configuration inputs_schema={pipeline.inputs_schema} />
                    </>
                )}
                {pipeline.status !== 'coming_soon' && (
                    <APIExamples
                        name={pipeline.name}
                        inputs_schema={pipeline.inputs_schema}
                        id={pipeline.id}
                        type={pipeline.type}
                        initialOpen={pipeline.inputs_schema?.length <= 0}
                    />
                )}
            </div>

            <div className="border-t border-input pt-4">
                {pipeline.status === 'coming_soon' ? (
                    <NotifyMe pipeline={pipeline} />
                ) : (
                    <CallToAction
                        to={pipeline.mdx?.fields?.slug || `/docs/cdp/${pipeline.type}s/${pipeline.slug}`}
                        type="secondary"
                    >
                        Learn more in docs
                    </CallToAction>
                )}
            </div>
        </>
    )
}
