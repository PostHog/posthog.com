import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Import PNG logos (not converted to React components)
import AirbusLogo from '../components/CustomerLogos/AirbusLogo'
import ArenaLogo from '../components/CustomerLogos/ArenaLogo'
import AssemblyAILogo from '../components/CustomerLogos/AssemblyAILogo'
import BrainboardLogo from '../components/CustomerLogos/BrainboardLogo'
import CarVerticalLogo from '../components/CustomerLogos/CarVerticalLogo'
import CloudPeekLogo from '../images/customers/CloudPeek_Final_Logo_Transparent.png'
import CloudPeekLogoDark from '../images/customers/CloudPeek_Full_Logo_-_White_Transparent.png'
import ContraLogo from '../components/CustomerLogos/ContraLogo'
import CreatifyLogo from '../images/customers/creatify-light.png'
import CreatifyLogoDark from '../images/customers/creatify-dark.png'
import ConvexLogo from '../components/CustomerLogos/ConvexLogo'
import ElevenLabsLogo from '../components/CustomerLogos/ElevenLabsLogo'
import ExaLogo from 'components/CustomerLogos/ExaLogo'
import GanksterLogo from '../components/CustomerLogos/GanksterLogo'
import GrantableLogo from '../components/CustomerLogos/GrantableLogo'
import GreptileLogo from '../components/CustomerLogos/GreptileLogo'
import HasuraLogo from '../components/CustomerLogos/HasuraLogo'
import HeadshotProLogo from '../components/CustomerLogos/HeadshotProLogo'
import HeygenLogo from '../components/CustomerLogos/HeygenLogo'
import HostAILogo from '../components/CustomerLogos/HostAILogo'
import CounterPressLogo from '../images/customers/counterpress-light.svg'
import CounterPressLogoDark from '../images/customers/counterpress-dark.svg'
import CroissantLogo from '../images/customers/croissant-light.png'
import CroissantLogoDark from '../images/customers/croissant-dark.png'
import JuiceboxLogo from '../components/CustomerLogos/JuiceboxLogo'
import LovableLogo from 'components/CustomerLogos/LovableLogo'
import MentionMeLogo from '../components/CustomerLogos/MentionMeLogo'
import MistralAILogo from '../components/CustomerLogos/MistralAILogo'
import MintlifyLogo from '../components/CustomerLogos/MintlifyLogo'
import NationalDesignStudioLogo from '../components/CustomerLogos/NationalDesignStudioLogo'
import NetdataLogo from '../components/CustomerLogos/NetdataLogo'
import OpenSaucedLogo from '../components/CustomerLogos/OpenSaucedLogo'
import PhantomLogo from '../components/CustomerLogos/PhantomLogo'
import PostHogLogo from '../components/CustomerLogos/PostHogLogo'
import PryLogo from '../components/CustomerLogos/PryLogo'
import PurpleWaveLogo from '../components/CustomerLogos/PurpleWaveLogo'
import QredLogo from '../components/CustomerLogos/QredLogo'
import RaycastLogo from '../components/CustomerLogos/RaycastLogo'
import RayfitLogoDark from '../images/customers/rayfitLogodark.png'
import RayfitLogoLight from '../images/customers/rayfitLogolight.png'
import RebtelLogo from '../components/CustomerLogos/RebtelLogo'
import ResearchGateLogo from '../components/CustomerLogos/ResearchGateLogo'
import ResendLogo from '../components/CustomerLogos/ResendLogo'
import SignificaLogo from '../components/CustomerLogos/SignificaLogo'
import SupedLogo from '../images/customers/suped-light.png'
import SupedLogoDark from '../images/customers/suped-dark.png'
import SpeakeasyLogo from '../components/CustomerLogos/SpeakeasyLogo'
import SquadSVenturesLogo from '../components/CustomerLogos/SquadSVenturesLogo'
import StartEngineLogo from '../components/CustomerLogos/StartEngineLogo'
import SupabaseLogo from '../components/CustomerLogos/SupabaseLogo'
import TrustWalletLogo from '../components/CustomerLogos/TrustWalletLogo'
import UKGovtLogo from '../components/CustomerLogos/UKGovtLogo'
import VendastaLogo from '../components/CustomerLogos/VendastaLogo'
import WebshareLogo from '../components/CustomerLogos/WebshareLogo'
import WisprFlowLogo from 'components/CustomerLogos/WisprFlow'
import WittyWorksLogo from '../components/CustomerLogos/WittyWorksLogo'
import YCombinatorLogo from '../components/CustomerLogos/YCombinatorLogo'
import ZealotLogo from '../images/customers/zealot-light.png'
import ZealotLogoDark from '../images/customers/zealot-dark.png'
import useProducts from './useProducts'

export interface Customer {
    slug: string
    name: string
    toolsUsed: string[]
    toolsUsedHandles?: string[] // Original handles for product lookup
    industries?: string[]
    users?: string[]
    notes?: React.ReactNode
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    height?: number
    quotes?: Record<
        string,
        {
            name: string
            role: string
            image: {
                thumb: string
                url?: string
            }
            products?: Record<string, string>
            quotes?: string[]
        }
    >
    featured: boolean
    hasCaseStudy: boolean // Now always populated dynamically
}

interface BaseCustomer {
    name: string
    toolsUsed: string[]
    industries?: string[]
    users?: string[]
    notes?: React.ReactNode
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    legacyLogo?: string // Temporary until SVG component created
    legacyLogoDark?: string // Temporary until SVG component created
    height?: number
    quotes?: Record<
        string,
        {
            name: string
            role: string
            image: {
                thumb: string
                url?: string
            }
            products?: Record<string, string>
            quotes?: string[]
        }
    >
    featured: boolean
}

// Note: height needs to be a Tailwind class. Use /customers for reference as that's where it's balanced out.
// Product customer slides also use these, but use the value with a multiplier to make them larger for that slide.
const CUSTOMER_DATA: Record<string, BaseCustomer> = {
    '4dayweek': {
        name: '4DayWeek',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['Recruitment'],
        users: ['Marketing', 'Leadership', 'Founders'],
        notes: 'Job board',
        featured: false,
        // logo: 4DayWeekLogo, // TODO: Create SVG component
        legacyLogo:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/4dayweek/4dayweek-logo.png',
        legacyLogoDark:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/4dayweek/4dayweek-logo-dark.png',
        quotes: {
            phil_mcparlane: {
                name: 'Phil McParlane',
                role: 'Founder, 4DayWeek',
                image: {
                    thumb: '/images/customers/4dayweek_phil.jpg',
                },
                quotes: [
                    "I started testing, then I started tracking events and building dashboards too. I realized PostHog is something I've been looking for for a while — somewhere I can have all the tools and analytics I need all in one place.",
                ],
            },
        },
    },
    '11x': {
        name: '11x',
        toolsUsed: ['experiments', 'product_analytics', 'llm_analytics', 'cdp'],
        industries: ['AI'],
        users: ['Marketing', 'Leadership', 'Founders', 'Engineering'],
        notes: 'AI SDR',
        featured: false,
        // logo: 11xLogo, // TODO: Create SVG component
        legacyLogo: 'https://res.cloudinary.com/dmukukwp6/image/upload/11x_logo_light_8c7d326edb.png',
        legacyLogoDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/11x_logo_dark_0934407584.png',
        quotes: {
            keith_fearon: {
                name: 'Keith Fearon',
                role: 'Head of Growth, 11x',
                image: {
                    thumb: '/images/customers/keith.jpg',
                },
                quotes: [
                    "I've introduced PostHog to so many parts of our workflow and it's become known as the ten-in-one product thing that helps us get so much done. It really does have it all.",
                ],
            },
        },
    },
    adauris: {
        name: 'Adauris',
        toolsUsed: ['experiments', 'session_replay', 'product_analytics'],
        industries: ['SaaS', 'Publishing'],
        users: ['Growth', 'Engineering', 'Product', 'Marketing'],
        notes: 'Generative AI audio',
        featured: false,
        // logo: AdaurisLogo, // TODO: Create SVG component
        legacyLogo:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/adauris/logo.png',
        legacyLogoDark:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/adauris/logo-dark.png',
        quotes: {
            varun_sharma: {
                name: 'Varun Sharma',
                role: 'Co-founder & CTO, Adauris',
                image: {
                    thumb: '/images/customers/varun.jpg',
                },
                quotes: [
                    'I saw some engineers raving about PostHog and decided to check it out. I gave it a go, integrated it in a few minutes, and the team has just loved it ever since.',
                ],
            },
        },
    },
    airbus: {
        name: 'Airbus',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'They make airplanes',
        logo: AirbusLogo,
        height: 8,
        featured: true,
    },
    assemblyai: {
        name: 'AssemblyAI',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['API Platform'],
        users: ['Leadership', 'Marketing', 'Engineering'],
        notes: 'Speech-to-text and audio intelligence API',
        logo: AssemblyAILogo,
        featured: false,
        height: 10,
        quotes: {
            alberto_santos: {
                name: 'Alberto Santos',
                role: 'Web & Brand Lead, AssemblyAI',
                image: {
                    thumb: '/images/customers/alberto.jpg',
                },
                products: {
                    product_analytics:
                        "Finally having a full view of what users do has helped us so much. It's helped us improve conversion, improve our support, and optimize the user journey through the platform.",
                },
                quotes: [
                    'PostHog helps us debug support issues, because we push errors to PostHog as events. It may not be exactly what PostHog was intended for, but it is really useful and shows how adaptable PostHog is.',
                ],
            },
        },
    },
    arena: {
        name: 'Arena',
        toolsUsed: [
            'web_analytics',
            'product_analytics',
            'marketing_analytics',
            'feature_flags',
            'experiments',
            'error_tracking',
            'surveys',
            'posthog_ai',
        ],
        industries: ['LLMs'],
        users: ['Product', 'Engineering', 'Growth'],
        notes: 'AI model comparison platform',
        logo: ArenaLogo,
        height: 10,
        featured: true,
        quotes: {
            matt_hova: {
                name: 'Matt Hova',
                role: 'Member of Technical Staff',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/matt_hova_8c119a92ad.jpeg',
                },
                products: {
                    experiments:
                        "I can't recommend PostHog enough, especially if you're just getting started out. It really helped us move fast and we've been really happy with it as we continue to scale.",
                },
            },
            lily_dinh: {
                name: 'Lily Dinh',
                role: 'Growth Marketing Lead',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/lily_d_lmarena_7ce598fc8c.jpeg',
                },
                products: {
                    product_analytics:
                        "As a marketer, it's so important to understand which KPIs the company actually cares about. All of that data lives in PostHog. It's our source of truth for company performance.",
                },
            },
        },
    },
    brainboard: {
        name: 'Brainboard',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['SaaS', 'Devtool'],
        users: ['Product', 'Engineering', 'Growth', 'Marketing'],
        notes: 'Collaborative DevOps',
        logo: BrainboardLogo,
        featured: false,
        height: 14,
        quotes: {
            stephane_boghossian: {
                name: 'Stephane Boghossian',
                role: 'Growth Architect, Brainboard',
                image: {
                    thumb: '/images/customers/stephane.jpg',
                },
                quotes: [
                    "PostHog is the only tool that allows me to actually make changes and measure if they work or not. Other tools have nice graphs and such, but you can't do actionable things with them. You can with PostHog.",
                ],
            },
        },
    },
    carvertical: {
        name: 'carVertical',
        toolsUsed: ['feature_flags', 'product_analytics'],
        industries: ['Automotive'],
        users: ['Growth', 'Engineering', 'Product'],
        notes: 'Vehicle history reports',
        logo: CarVerticalLogo,
        featured: false,
        height: 10,
        quotes: {
            aleksandras_nelkinas: {
                name: 'Aleksandras Nelkinas',
                role: 'Head of Product Engineering, carVertical',
                image: {
                    thumb: '/images/customers/aleks.png',
                },
                products: {
                    feature_flags:
                        "Feature flags immediately bought a lot of value. What's really elegant is how flags interlink with product analytics too. We can see exactly how users react, when needed!",
                },
            },
        },
    },
    cloudpeek: {
        name: 'CloudPeek',
        toolsUsed: ['logs', 'error_tracking', 'llm_analytics'],
        industries: ['Cybersecurity'],
        users: ['Engineering'],
        notes: 'Agentic AI platform for cybersecurity',
        featured: false,
        logo: {
            light: CloudPeekLogo,
            dark: CloudPeekLogoDark,
        },
        height: 10,
        quotes: {
            craig_hollington: {
                name: 'Craig Hollington',
                role: 'CTO',
                image: {
                    thumb: '/images/customers/craig-hollington.png',
                },
                quotes: [
                    "We're probably five to ten times faster at debugging now, and it's enabled us to collaboratively work on issues as a team in a way we just couldn't before.",
                    'We spot an exception in Error Tracking and pivot straight into Logs to understand the full context of what went wrong. That link between the two is huge for us.',
                    "We used to get exception logs come through on PostHog, and then I'd have to log onto the server manually and search our log files which were written locally.",
                    "We automatically get AI to write triage scripts and fire them to see what works, and then from there we review the log files to see what it did and what it didn't do.",
                ],
            },
        },
    },
    contra: {
        name: 'Contra',
        toolsUsed: ['feature_flags', 'session_replay', 'product_analytics'],
        industries: ['SaaS'],
        users: ['Product', 'Engineering'],
        notes: 'Creative freelance marketplace',
        logo: ContraLogo,
        featured: false,
        height: 8,
        quotes: {
            allison_nulty: {
                name: 'Allison Nulty',
                role: 'Head of Product, Contra',
                image: {
                    thumb: '/images/customers/allison.jpg',
                },
                quotes: [
                    'A huge competitive advantage has been the ability to talk directly with PostHog engineers over Slack. We share feedback, ask questions, and make requests and always see a quick response time and thoughtful suggestions.',
                ],
            },
        },
    },
    convex: {
        name: 'Convex',
        toolsUsed: [],
        industries: ['SaaS'],
        users: [],
        notes: 'Backend web app platform',
        logo: ConvexLogo,
        featured: true,
        height: 8,
    },
    creatify: {
        name: 'Creatify',
        toolsUsed: ['web_analytics', 'product_analytics'],
        industries: ['AI'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI video editor',
        logo: {
            light: CreatifyLogo,
            dark: CreatifyLogoDark,
        },
        height: 12,
        featured: false,
        quotes: {
            xin_zhou: {
                name: 'Xin Zhou',
                role: 'CTO, Creatify',
                image: {
                    thumb: '/images/customers/creatify-xin.png',
                },
                products: {
                    web_analytics:
                        "I don't think I could ever go back to GA4 now that we've adopted PostHog. Web analytics gives us all the metrics we really care about. It is so much easier to use than GA4.",
                },
            },
        },
    },
    elevenlabs: {
        name: 'ElevenLabs',
        toolsUsed: ['feature_flags', 'product_analytics', 'surveys'],
        industries: ['AI'],
        users: ['Marketing', 'Growth', 'Engineering'],
        notes: 'AI voice generator',
        logo: ElevenLabsLogo,
        height: 8,
        featured: true,
        quotes: {
            sam_sklar: {
                name: 'Sam Sklar',
                role: 'Growth, ElevenLabs',
                image: {
                    thumb: '/images/customers/elevenlabs-sam.jpg',
                },
                products: {
                    feature_flags:
                        "During testing we monitor weekly retention especially. We've got a mobile app in TestFlight at the moment and we're tracking how it retains the users we invite to it. We want to make sure it's not a leaky bucket before we invite all our web users to try it out.",
                },
                quotes: [
                    "For a business like ours where we have so many different types of users, PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it's quite overwhelming to try and understand what's working and what's not.",
                ],
            },
        },
    },
    exa: {
        name: 'Exa',
        toolsUsed: ['posthog_ai', 'session_replay', 'product_analytics'],
        industries: ['AI', 'Search'],
        users: ['Engineering', 'Product'],
        notes: 'Search API for AI products',
        logo: ExaLogo,
        height: 9,
        featured: true,
        quotes: {
            liam_hinzman: {
                name: 'Liam Hinzman',
                role: 'Engineer, Exa',
                image: {
                    thumb: '',
                },
                products: {
                    posthog_ai:
                        "The best thing for me is PostHog AI. It's really nice to have it help with SQL queries when you're like 80-90% of the way there and it can finish them for you. If I get something wrong with one of my SQL operations, PostHog AI can just fix it up for me.",
                },
            },
        },
    },
    gankster: {
        name: 'Gankster',
        toolsUsed: ['posthog_ai', 'session_replay', 'product_analytics'],
        industries: ['Gaming'],
        users: ['Engineering', 'Growth', 'Marketing'],
        notes: 'Gaming platform',
        featured: false,
        logo: GanksterLogo,
        height: 10,
        quotes: {
            dan_rosenhain: {
                name: 'Dan Rosenhain',
                role: 'Co-founder, Gankster',
                image: {
                    thumb: '',
                },
                quotes: [
                    "We've made these sort of discoveries multiple times thanks to having all our data in PostHog — and this is why we're always so data driven. When you're making changes that drive a 5% improvement, you only need a few wins before things really start to snowball.",
                ],
            },
        },
    },
    'great-expectations': {
        name: 'Great Expectations',
        toolsUsed: ['product_analytics'],
        industries: ['SaaS', 'Data'],
        users: ['Growth', 'Engineering', 'Product', 'Marketing'],
        notes: 'Data quality SaaS platform',
        featured: false,
        // logo: GreatExpectationsLogo, // TODO: Create SVG component
        legacyLogo: 'https://res.cloudinary.com/dmukukwp6/image/upload/gx_logo_light_ce286f1955.png',
        legacyLogoDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/gx_logo_dark_5a1dba99f7.png',
        quotes: {
            erica_howard: {
                name: 'Erica Howard',
                role: 'Marketing Project Manager, Great Expectations',
                image: {
                    thumb: '/images/customers/erica.jpg',
                },
                products: {
                    product_analytics:
                        'I had always wanted a tool like PostHog that let me really follow user journeys and things like that. Other tools, like Google Analytics, just let you look at overall visitors. PostHog goes so much further!',
                },
            },
        },
    },
    grantable: {
        name: 'Grantable',
        toolsUsed: [
            'workflows_emails',
            'feature_flags',
            'session_replay',
            'experiments',
            'product_analytics',
            'surveys',
            'error_tracking',
            'llm_analytics',
            'data_warehouse',
        ],
        industries: ['SaaS'],
        users: ['Data', 'Product', 'Marketing'],
        notes: 'AI compliance and grant writing',
        featured: false,
        logo: GrantableLogo,
        height: 6,
        quotes: {
            evan_ralliss: {
                name: 'Evan Ralliss',
                role: 'Head of Product & Growth',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/evan_rallis_08cffd54f7.jpeg',
                },
                products: {
                    workflows:
                        'PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy.',
                },
            },
        },
    },
    croissant: {
        name: 'Croissant',
        toolsUsed: ['workflows_emails', 'product_analytics', 'surveys', 'web_analytics'],
        industries: ['SaaS'],
        users: ['Growth', 'Product', 'Marketing'],
        notes: 'Workspace finder',
        featured: false,
        logo: {
            light: CroissantLogo,
            dark: CroissantLogoDark,
        },
        height: 6,
        quotes: {
            jorge_lopez: {
                name: 'Jorge López',
                role: 'Growth',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/jorge_lopez_sarry_a9197f790d.jpeg',
                },
                products: {
                    workflows:
                        'Even at this early stage, Workflows is better for us than Zapier. It’s simpler, and it lets us move faster without adding another vendor to manage.',
                },
            },
        },
    },
    counterpress: {
        name: 'CounterPress',
        toolsUsed: ['endpoints', 'product_analytics'],
        industries: ['SaaS', 'Publishing'],
        users: ['Engineering', 'Product'],
        notes: 'Publishing platform for sports journalism',
        featured: false,
        logo: {
            light: CounterPressLogoDark,
            dark: CounterPressLogo,
        },
        height: 6,
        quotes: {
            jay_collett: {
                name: 'Jay Collett',
                role: 'Founder & CTO',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/jay_collett_b9f458e7f0.jpeg',
                },
                products: {
                    endpoints:
                        'The endpoints API has given us a simple and efficient solution to the complicated and daunting prospect of building a platform to consume data and create endpoints.',
                },
                quotes: [
                    'Endpoints has effectively given us the power to keep up with them without spending a penny on analytics.',
                ],
            },
        },
    },
    suped: {
        name: 'Suped',
        toolsUsed: ['workflows', 'product_analytics', 'session_replay'],
        industries: ['SaaS'],
        users: ['Leadership', 'Product', 'Engineering'],
        notes: 'Email authentication and deliverability platform',
        featured: false,
        logo: {
            light: SupedLogo,
            dark: SupedLogoDark,
        },
        height: 6,
        quotes: {
            michael_ko: {
                name: 'Michael Ko',
                role: 'Co-founder & CEO',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/suped/michael-suped.png',
                },
                quotes: [
                    "Product data was in PostHog, and messaging logic was somewhere else. Every time we wanted to use a new event or property in a campaign, we had to make sure it was synced properly. It's manageable, but it's extra coordination that doesn't really add value.",
                    "The biggest win is that the data's already there. All our events, all our user properties – we don't have to push them anywhere. We're building automation directly on top of the same events we use for analytics. There's no translation layer.",
                ],
            },
        },
    },
    kilocode: {
        name: 'KiloCode',
        toolsUsed: ['product_analytics', 'session_replay', 'feature_flags', 'experiments', 'cdp'],
        industries: ['AI'],
        users: ['Engineering', 'Product', 'Growth', 'Marketing'],
        featured: false,
        logo: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/kilocode_logo_c58c88f029.webp',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/kilocode_logo_c58c88f029.webp',
        },
        quotes: {
            job_rietbergen: {
                // This is the author handle used in OSQuote
                name: 'Job Rietbergen',
                role: 'Head of Growth',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/job_rietbergen_a86584acfc.jpeg',
                },

                quotes: [
                    "In other setups, you end up with four different tools–analytics, experiments, recordings,and they don't really talk to each other. With PostHog, you can actually see the full picture.",
                    "PostHog is really the connective tissue behind a lot of what we're doing. So many things depend on it, and it adapts as fast as the product does.",
                    "Everything we do is about speed. PostHog helps us move fast without losing visibility into what's actually happening.",
                ],
            },
        },
    },
    greptile: {
        name: 'Greptile',
        // toolsUsed: ['product_analytics'],
        industries: ['SaaS'],
        // users: ['Engineering', 'Product'],
        notes: 'AI code reviewer',
        logo: GreptileLogo,
        featured: true,
        height: 10,
    },
    groove: {
        name: 'Groove',
        toolsUsed: ['experiments', 'product_analytics', 'surveys'],
        industries: ['Support'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'Help desk platform',
        featured: false,
        // logo: GrooveLogo, // TODO: Create SVG component
        legacyLogo:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/groove/logo.png',
        legacyLogoDark:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/groove/logo-dark.png',
        quotes: {
            alex_turnbull: {
                name: 'Alex Turnbull',
                role: 'Founder, Groove',
                image: {
                    thumb: '/images/customers/alex.jpg',
                },
                quotes: [
                    'Our developers loved PostHog the more they got into it. They could see that it was super flexible, and they saw the value in the data stack. All of us are super happy with it!',
                ],
            },
        },
    },
    hasura: {
        name: 'Hasura',
        toolsUsed: ['funnels', 'session_replay'],
        industries: ['Devtool'],
        users: ['Engineering', 'User Experience', 'Marketing'],
        notes: 'Open source GraphQL engine',
        logo: HasuraLogo,
        featured: true,
        height: 10,
    },
    headshotpro: {
        name: 'HeadshotPro',
        toolsUsed: ['data_warehouse', 'product_analytics'],
        industries: ['AI'],
        users: ['Growth', 'Engineering', 'Product'],
        notes: 'AI photo generator',
        logo: HeadshotProLogo,
        featured: false,
        height: 10,
        quotes: {
            danny_postma: {
                name: 'Danny Postma',
                role: 'Founder, HeadshotPro',
                image: {
                    thumb: '',
                },
                products: {
                    data_warehouse:
                        'Honestly, my advice to new users would be: pull in everything you can. Avoid the clutter and the platform switching. Get it all into PostHog and it makes it so much easier to work with.',
                },
                quotes: [
                    'Once we had the data in PostHog, we realized it was actually a very profitable channel for us and we quickly started it back up. Now, we make sure to put everything in PostHog.',
                ],
            },
        },
    },
    heygen: {
        name: 'Heygen',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'AI video generator',
        logo: HeygenLogo,
        featured: true,
        height: 12,
    },
    hostai: {
        name: 'HostAI',
        toolsUsed: ['feature_flags', 'product_analytics', 'llm_analytics'],
        industries: ['AI'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI for vacation rentals managers',
        featured: false,
        logo: HostAILogo,
        height: 12,
        quotes: {
            punn_kam: {
                name: 'Punn Kam',
                role: 'Co-founder, HostAI',
                image: {
                    thumb: '/images/customers/punn-kam.jpeg',
                },
                products: {
                    llm_analytics:
                        "PostHog and LangFuse enable us to spot early signs of dissatisfaction with our app. So far, we've been able to reach out to 10 customers and prevent them from churning because of this.",
                },
            },
        },
    },
    lovable: {
        name: 'Lovable',
        toolsUsed: ['llm_analytics', 'experiments', 'feature_flags'],
        industries: ['Devtool'],
        users: ['Engineering'],
        notes: 'AI app & website builder',
        featured: true,
        logo: LovableLogo,
        height: 8,
        quotes: {
            viktor_eriksson: {
                name: 'Viktor Eriksson',
                role: 'Software Engineer',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/viktor_00c779a706.jpg',
                },
                quotes: [
                    "PostHog is super cool because it is such a broad platform. If you're building a new product or at a startup, it's a no-brainer to use PostHog. It's the only all-in-one platform like it for developers.",
                ],
            },
        },
    },
    juicebox: {
        name: 'Juicebox',
        toolsUsed: ['feature_flags', 'product_analytics', 'session_replay', 'llm_analytics'],
        industries: ['AI'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI recruitment platform',
        featured: false,
        logo: JuiceboxLogo,
        height: 10,
        quotes: {
            david_paffenholz: {
                name: 'David Paffenholz',
                role: 'Co-founder & CEO, Juicebox',
                image: {
                    thumb: '/images/customers/david-paffenholz.jpeg',
                },
                products: {
                    llm_analytics:
                        'Speed is crucial to our user experience. We now have the ability to see which specific prompt has biggest impact on latency.',
                },
            },
        },
    },
    'mention-me': {
        name: 'Mention Me',
        toolsUsed: ['funnels', 'session_replay'],
        industries: ['Marketing platform'],
        users: ['Product', 'Engineering', 'User Experience'],
        notes: 'Marketing referral campaigns',
        logo: MentionMeLogo,
        featured: false,
        height: 10,
        quotes: {
            joe_saunderson: {
                name: 'Joe Saunderson',
                role: 'Software Engineer, Mention Me',
                image: {
                    thumb: '/images/customers/joe.png',
                },
                quotes: [
                    'We looked at Amplitude, Mixpanel and Pendo and not only were they far too expensive but it was also very unclear how they worked in terms of data privacy.',
                ],
            },
            anca_filip: {
                name: 'Anca Filip',
                role: 'Head of Product, Mention Me',
                image: {
                    thumb: '/images/customers/anca.png',
                },
                products: {
                    product_analytics:
                        "PostHog has helped us improve our product and get a much better understanding of our users than we've ever been able to before.",
                },
            },
        },
    },
    mintlify: {
        name: 'Mintlify',
        toolsUsed: ['session_replay', 'api'],
        industries: ['SaaS', 'Devtool'],
        users: ['Leadership', 'Engineering', 'Product'],
        notes: 'Product and technical docs',
        logo: MintlifyLogo,
        featured: false,
        height: 10,
        quotes: {
            han_wang: {
                name: 'Han Wang',
                role: 'Founder & CEO, Mintlify',
                image: {
                    thumb: '/images/customers/han.png',
                },
                quotes: [
                    "You can quote me on this: PostHog is awesome. It's a great tool. I've used a bunch of different analytics platforms in the past and PostHog stands out for its developer friendliness and user experience. I really, really love it.",
                ],
            },
        },
    },
    mistralai: {
        name: 'Mistral AI',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Open source LLMs',
        logo: MistralAILogo,
        height: 12,
        featured: true,
    },
    nationaldesignstudio: {
        name: 'National Design Studio',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Design studio of the US Government',
        logo: NationalDesignStudioLogo,
        featured: true,
        height: 11,
    },
    netdata: {
        name: 'Netdata',
        toolsUsed: ['session_replay', 'product_analytics'],
        industries: ['SaaS', 'Devtool'],
        users: ['Product', 'Engineering'],
        notes: 'Open source monitoring',
        logo: NetdataLogo,
        height: 8,
        featured: false,
        quotes: {
            andy_maguire: {
                name: 'Andy Maguire',
                role: 'Analytics & Machine Learning Lead, Netdata',
                image: {
                    thumb: '/images/customers/andrewmaguire.jpeg',
                },
                products: {
                    product_analytics:
                        "I just trust that, when PostHog does something, it will do it the right way because it's not just open source code, it's all developed in the open too. You'd never get that modern thinking with the likes of Mixpanel, or other more 'Old School' platforms.",
                },
            },
        },
    },
    octomind: {
        name: 'Octomind',
        toolsUsed: ['experiments', 'surveys', 'product_analytics', 'web_analytics'],
        industries: ['Devtool', 'SaaS'],
        users: ['Marketing'],
        notes: 'AI-powered end-to-end testing',
        featured: false,
        // logo: OctomindLogo, // TODO: Create SVG component
        legacyLogo: 'https://res.cloudinary.com/dmukukwp6/image/upload/octomind_logo_dark_a89deeee90.png',
        legacyLogoDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/octomind_logo_673e0ed777.png',
        quotes: {
            maria_zahorcova: {
                name: 'Maria Zahorcova',
                role: 'Chief Marketing Officer, Octomind',
                image: {
                    thumb: '/images/customers/maria_octomind.jpg',
                },
                products: {
                    web_analytics:
                        'PostHog helped us understand our users and that we have a lot more global impact than we thought. We have a lot more users in the US than we expected, for example. This is something every marketer needs to understand: who are your users and where are they coming from?',
                },
            },
        },
    },
    opensauced: {
        name: 'OpenSauced',
        toolsUsed: ['product_analytics'],
        industries: ['SaaS', 'Devtool'],
        users: ['Leadership', 'Investors', 'Founders', 'Marketing', 'Design', 'Engineering'],
        notes: 'Open source contribution tracker',
        logo: OpenSaucedLogo,
        featured: false,
        height: 10,
        quotes: {
            brian_douglas: {
                name: 'Brian Douglas',
                role: 'Founder & CEO, OpenSauced',
                image: {
                    thumb: '',
                },
                quotes: [
                    "I actually added PostHog to OpenSauced even before we started raising money. That ended up being one of the best things I'd ever done too, because I could track the weekly active users in some of the default insights. It helped me validate the idea even before we started raising and building the team.",
                ],
            },
        },
    },
    phantom: {
        name: 'Phantom',
        toolsUsed: ['data_warehouse', 'feature_flags'],
        industries: ['Cryptocurrency & blockchain'],
        users: ['Leadership', 'Product', 'Engineering'],
        notes: 'Crypto wallet',
        logo: PhantomLogo,
        featured: false,
        height: 10,
        quotes: {
            francesco_agosti: {
                name: 'Francesco Agosti',
                role: 'CTO & Co-founder, Phantom',
                image: {
                    thumb: '/images/customers/francesco.jpg',
                },
                products: {
                    feature_flags:
                        "Feature flags are really, really critical for us and you don't see them as a feature in other analytics tools. They are very valuable though, because you can often use feature flag data to make other product decisions.",
                },
                quotes: [
                    'I liked how PostHog was open-source and how it just worked out of the box from the get-go. It lets you use your own database and it was really easy to deploy and get going.',
                ],
            },
        },
    },
    pry: {
        name: 'Pry',
        toolsUsed: ['product_analytics', 'funnels', 'session_replay', 'heatmaps'],
        industries: ['Financial planning software'],
        users: ['Leadership', 'Product', 'Engineering'],
        notes: 'Financial planning for SMBs, acquired by Brex',
        logo: PryLogo,
        height: 8,
        featured: false,
        quotes: {
            andy_su: {
                name: 'Andy Su',
                role: 'Founder and CEO, Pry',
                image: {
                    thumb: '/images/customers/andy.jpeg',
                },
                products: {
                    product_analytics:
                        "For us, PostHog isn't just about making decisions. A lot of our product and marketing ideas come from looking at the analytics too. There are things you don't even think of until you see the data.",
                },
            },
        },
    },
    posthog: {
        name: 'PostHog',
        toolsUsed: [
            'web_analytics',
            'product_analytics',
            'session_replay',
            'feature_flags',
            'experiments',
            'surveys',
            'data_warehouse',
            'error_tracking',
            'cdp',
            'posthog_ai',
        ],
        notes: <>Would it be clever or lame if we included our own company here?</>,
        logo: PostHogLogo,
        height: 10,
        featured: true,
    },
    purplewave: {
        name: 'Purple Wave',
        toolsUsed: ['surveys'],
        industries: ['E-commerce'],
        users: ['Product'],
        notes: 'Heavy duty equipment marketplace',
        logo: PurpleWaveLogo,
        height: 24,
        featured: false,
        quotes: {
            matt_amick: {
                name: 'Matt Amick',
                role: 'Product Owner',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/purplewave_matt_175a82bf75.jpg',
                },
                products: {
                    surveys:
                        'I love everything about PostHog from the design to the culture, just everything. When the team launched the surveys beta and we could make no-code surveys and have everything in one place too? That was just phenomenal.',
                },
            },
        },
    },
    qred: {
        name: 'Qred',
        toolsUsed: ['feature_flags', 'session_replay', 'experiments', 'product_analytics', 'cdp'],
        industries: ['Fintech'],
        users: ['Engineering', 'Product', 'Marketing'],
        notes: 'Business loans and financial services',
        featured: false,
        logo: QredLogo,
        height: 8,
        quotes: {
            lezgin_zilan: {
                name: 'Lezgin Zilan',
                role: 'CTO',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/pasted_image_2025_11_10_T20_01_06_489_Z_deeb25027d.png',
                },
                quotes: [
                    'One thing I have to say is that PostHog’s support is awesome. There’s no outsourced first line or call centers — you get real answers fast, straight from the actual engineers. If you find a bug, they show you the GitHub issue and you can literally watch it get fixed. I love that.',
                ],
            },
        },
    },
    raycast: {
        name: 'Raycast',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'The MacOS Spotlight that Apple should have built',
        logo: RaycastLogo,
        featured: true,
        height: 11,
    },
    rayfit: {
        name: 'RayFit',
        toolsUsed: ['product_analytics', 'experiments', 'feature_flags', 'data_warehouse', 'posthog_ai'],
        industries: ['Fitness'],
        users: ['Product', 'Engineering'],
        notes: 'AI personal training app',
        quotes: {
            alan_yang: {
                name: 'Alan Yang',
                role: 'Full Stack Engineering Leader',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/alan_yang_1611287c98.png',
                },
                products: {
                    posthog_ai:
                        "We're evolving our data model and events all the time, so having an easy way to explore what's there is incredibly valuable. PostHog AI helps our product engineers build dashboards without needing to understand PostHog in depth — and it gives them real ownership over feature performance.",
                },
            },
        },
        logo: {
            light: RayfitLogoLight,
            dark: RayfitLogoDark,
        },
        featured: false,
        height: 6,
    },
    rebtel: {
        name: 'Rebtel',
        toolsUsed: ['product_analytics', 'experiments'],
        industries: ['Telecom'],
        users: ['Data'],
        notes: 'International calling and messaging',
        logo: RebtelLogo,
        featured: false,
        height: 10,
        quotes: {
            chandan_singh: {
                name: 'Chandan Singh',
                role: 'Head of Data, Rebtel',
                image: {
                    thumb: '',
                },
                quotes: [
                    "Unlike other tools, PostHog's product offered us a way to get immediate value now and a clear roadmap to increase our adoption later.",
                    "Using PostHog lets us stay flexible. We didn't want a months-long migration project. We wanted to integrate quickly and run experiments now, while also having room to grow later without having to start the whole process again.",
                ],
            },
        },
    },
    researchgate: {
        name: 'ResearchGate',
        toolsUsed: ['experiments', 'feature_flags', 'product_analytics'],
        industries: ['Science', 'Social network'],
        users: ['Growth', 'Engineering', 'Product', 'Marketing'],
        notes: "World's largest professional network for scientists",
        logo: ResearchGateLogo,
        height: 8,
        featured: true,
        quotes: {
            paul_mccloud: {
                name: 'Paul McCloud',
                role: 'Head of Product Engineering, ResearchGate',
                image: {
                    thumb: '/images/customers/paul_mccloud.jpg',
                },
                quotes: [
                    "Something I didn't get at the start was the clip at which PostHog adds new products. What you don't really understand until you've experienced it is that, because all these tools are built on the same fundamental architecture, the value of PostHog becomes exponential as new tools get connected!",
                ],
            },
        },
    },
    resend: {
        name: 'Resend',
        // toolsUsed: ['product_analytics', 'experiments'],
        notes: 'Email delivery service',
        logo: ResendLogo,
        featured: true,
        height: 7,
    },
    significa: {
        name: 'Significa',
        toolsUsed: ['web_analytics', 'product_analytics'],
        industries: ['Agency'],
        users: ['Marketing'],
        notes: 'Digital agency',
        logo: SignificaLogo,
        height: 12,
        featured: false,
        quotes: {
            tomas_gouveia: {
                name: 'Tomás Gouveia',
                role: 'Digital Marketer',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/significa_tomas_thumb_51eaed534c.jpg',
                    url: 'https://res.cloudinary.com/dmukukwp6/image/upload/significa_tomas_baced563d7.jpg',
                },
                products: {
                    web_analytics:
                        "PostHog gives me all the same information Plausible used to give us, and a lot more. It's way more powerful and insightful than Plausible.",
                },
            },
        },
    },
    speakeasy: {
        name: 'Speakeasy',
        toolsUsed: ['feature_flags', 'product_analytics', 'dashboards'],
        industries: ['Devtool'],
        users: ['Product', 'Engineering', 'Growth', 'Developer Relations'],
        notes: 'API generator',
        logo: SpeakeasyLogo,
        featured: false,
        height: 6,
        quotes: {
            nolan_sullivan: {
                name: 'Nolan Sullivan',
                role: 'Founding Developer Relations Lead, Speakeasy',
                image: {
                    thumb: '/images/customers/speakeasy-nolan.jpg',
                },
                quotes: [
                    'I love that PostHog is an all-in-one tool, with all the features of LaunchDarkly and all those other enterprise platforms. It is just so nice not having to go into multiple UIs to make changes and manage things.',
                ],
            },
        },
    },
    squadsventures: {
        name: 'SquadS Ventures',
        toolsUsed: ['product_analytics', 'session_replay', 'error_tracking'],
        notes: 'Venture funding for LatAm startups',
        logo: SquadSVenturesLogo,
        featured: false,
        height: 12,
        quotes: {
            luciano_trujillo: {
                name: 'Luciano Trujillo',
                role: 'Head of Engineering',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/luciano_trujullo_thumb_50ac708fc7.jpg',
                    url: 'https://res.cloudinary.com/dmukukwp6/image/upload/luciano_trujullo_3bb80fa039.jpg',
                },
                products: {
                    error_tracking:
                        "My smartwatch indicates a 20% increase in sleep quality after using PostHog's Error Tracking. We ditched our previous error tracking SaaS so we could manage errors, see session replays, and do analytics all in one place. It's exactly what we were looking for.",
                },
            },
        },
    },
    supabase: {
        name: 'Supabase',
        toolsUsed: ['posthog_ai', 'experiments', 'product_analytics'],
        industries: ['Devtool'],
        users: ['Engineering', 'Growth', 'Marketing'],
        notes: 'Postgres in the cloud',
        logo: SupabaseLogo,
        featured: true,
        height: 10,
        quotes: {
            aleksi_immonen: {
                name: 'Aleksi Immonen',
                role: 'Growth Marketer, Supabase',
                image: {
                    thumb: '/images/customers/aleksi.jpg',
                },
                products: {
                    posthog_ai:
                        'I like PostHog AI as a helper because it knows PostHog terminology, as well as the data model, and schemas. It can fix my mistakes, help me join the right tables, and more. It makes everything a lot easier and faster.',
                },
                quotes: [
                    "I think PostHog is just super. It's great for data collection, A/B testing, and web analytics. Plus, I also just really love James' meme game.",
                    'So, yeah, PostHog has literally helped us get 10X more weekly new users than we did a year ago.',
                ],
            },
        },
    },
    startengine: {
        name: 'StartEngine',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Crowdfunding for startups',
        logo: StartEngineLogo,
        height: 14,
        featured: true,
    },
    trust: {
        name: 'Trust',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Crypto wallet',
        logo: TrustWalletLogo,
        featured: true,
        height: 10,
    },
    ukgovt: {
        name: 'UK Government',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Most popular country with a King',
        logo: UKGovtLogo,
        featured: true,
        height: 9,
    },
    vendasta: {
        name: 'Vendasta',
        toolsUsed: ['experiments', 'cdp'],
        industries: ['SaaS'],
        users: ['Product', 'Engineering'],
        notes: 'Channel partner platform',
        logo: VendastaLogo,
        featured: false,
        height: 10,
        quotes: {
            taric_santos: {
                name: 'Taric Santos de Andrade',
                role: 'Product Manager, Vendasta',
                image: {
                    thumb: '/images/customers/taric.jpg',
                },
                quotes: [
                    'I use PostHog on a daily basis. My team has four engineers, as well as designers, and we need to collaborate closely across areas of the product we own, such as our onboarding flow.',
                ],
            },
        },
    },
    webshare: {
        name: 'Webshare',
        toolsUsed: ['experiments', 'product_analytics', 'session_replay', 'feature_flags'],
        industries: ['Devtool'],
        users: ['Marketing', 'Leadership', 'Customer Success'],
        notes: 'Proxy server',
        logo: WebshareLogo,
        featured: false,
        height: 10,
        quotes: {
            utku_zihnioglu: {
                name: 'Utku Zihnioglu',
                role: 'Founder & CEO, Webshare',
                image: {
                    thumb: '/images/customers/utku.jpg',
                },
                products: {
                    experiments:
                        'We saw PostHog, and saw that it does everything that we needed, and had all these syncing capabilities too. We just knew right away that it was the right tool for us. We started using all of its capabilities.',
                },
                quotes: [
                    "That's why PostHog is our favorite tool; it's the single source of truth for us. We knew exactly what we wanted to do when we were coming from Mixpanel and Hotjar. We wanted to move away from all these separate tools, and put everything in one place. PostHog absolutely nails it.",
                ],
            },
        },
    },
    wisprflow: {
        name: 'WisprFlow',
        //toolsUsed: [''],
        //industries: ['Devtool'],
        // users: ['Marketing', 'Leadership', 'Customer Success'],
        notes: 'AI voice dictation',
        logo: WisprFlowLogo,
        featured: true,
        height: 9,
    },
    wittyworks: {
        name: 'Witty Works',
        toolsUsed: ['dashboards'],
        industries: ['SaaS', 'Browser extension'],
        users: ['Marketing', 'Engineering'],
        notes: 'AI writing assistant',
        logo: WittyWorksLogo,
        featured: false,
        height: 10,
        quotes: {
            lukas_smith: {
                name: 'Lukas Smith',
                role: 'CTO & Co-founder, Witty Works',
                image: {
                    thumb: '/images/customers/lukas-witty.jpeg',
                },
                quotes: [
                    "I have a long history in open source. I found the community very responsive and open to both feedback and even to code changes. That gave me assurance that, if PostHog can't do something, there's a realistic path to building it myself.",
                    "The app system is sort of like an insurance policy. We don't know everything we'll need in the future, but if we need Feature X then apps give us a path to getting it even if it isn't part of PostHog.",
                ],
            },
        },
    },
    ycombinator: {
        name: 'Y Combinator',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['SaaS', 'Education'],
        users: ['Leadership', 'Engineering', 'Product'],
        notes: "World's premier startup accelerator",
        logo: YCombinatorLogo,
        height: 10,
        featured: true,
        quotes: {
            cat_li: {
                name: 'Cat Li',
                role: 'Product & Engineering Lead, Y Combinator',
                image: {
                    thumb: '/images/customers/cat.jpeg',
                },
                products: {
                    experiments:
                        "PostHog's experimentation suite is really great. We recently used it to improve our matching algorithm by running an experiment which hides profiles that have been stale for 3, 6, 9 or 12 weeks. We found that users in the 6-week group sent 40% more messages than the control group - a huge improvement for us!",
                },
                quotes: [
                    "One thing I love about PostHog is that we have a shared Slack channel, for support and feedback. We can chat directly to the engineers building PostHog and they're always really responsive.",
                ],
            },
        },
    },
    zealot: {
        name: 'Zealot',
        toolsUsed: ['llm_analytics', 'session_replay', 'error_tracking', 'product_analytics'],
        industries: ['Recruitment'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI customer activation platform',
        logo: {
            light: ZealotLogo,
            dark: ZealotLogoDark,
        },
        featured: false,
        quotes: {
            brandon_jakobson: {
                name: 'Brandon Jakobson',
                role: 'Co-founder & CTO',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/zealot_brandon_thumb_6c4b5ea067.png',
                    url: 'https://res.cloudinary.com/dmukukwp6/image/upload/zealot_brandon_ef6f4241d7.png',
                },
                quotes: [
                    "I'm so glad you guys don't price based on seats. As soon as I realized that, I invited my whole team.",
                ],
                products: {
                    error_tracking:
                        'I can look at an error and see everyone who had it, then view their replays, in two clicks. That’s the part about PostHog that’s so cool: you get all these tools for free and the more you use, the more powerful they become.',
                },
            },
        },
    },
    // New customers from MDX files
    // rebtel: { // Will be added via PR
    //     name: 'Rebtel',
    //     toolsUsed: ['product_analytics', 'experiments'],
    //     industries: ['Telecom'],
    //     users: [],
    //     notes: 'International calling and messaging',
    //     featured: false,
    //     // logo: RebtelLogo, // Logo not available
    // },
    // swype: {
    //     name: 'Swype',
    //     toolsUsed: ['session_replay', 'product_analytics'],
    //     industries: ['Recruitment', 'Data'],
    //     users: ['Founders', 'Engineering'],
    //     notes: 'Talent acquisition platform',
    //     featured: false,
    //     // logo: SwypeLogo, // Logo not available
    // },
    // wowzer: {
    //     name: 'Wowzer',
    //     toolsUsed: ['experiments', 'product_analytics', 'surveys', 'llm_analytics'],
    //     industries: ['AI'],
    //     users: ['Growth', 'Engineering', 'Product'],
    //     notes: 'AI-powered platform',
    //     featured: false,
    //     // logo: WowzerLogo, // Logo not available
    // },
}

export const useCustomers = () => {
    const { products } = useProducts()

    // Query only to detect which customers have case studies
    const data = useStaticQuery(graphql`
        query {
            allCustomers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
    `)

    // Create a set of customer slugs that have MDX case studies
    const customersWithCaseStudies = new Set(
        data.allCustomers.nodes.map((node: any) => node.fields.slug.split('/').pop() || '')
    )

    const getProductTitleByHandle = (handle: string) => {
        return products.find((product) => product.handle === handle)?.name
    }

    // Transform customer data with product titles and case study info
    const customers = Object.entries(CUSTOMER_DATA).reduce((acc, [key, customer]) => {
        // Use logo if available, otherwise fall back to legacy logo URLs
        let logo = customer.logo
        if (!logo && customer.legacyLogo && customer.legacyLogoDark) {
            logo = {
                light: customer.legacyLogo,
                dark: customer.legacyLogoDark,
            }
        }

        const customerWithSlug: Customer = {
            ...customer,
            slug: key,
            logo,
            // Keep original handles for product lookup
            toolsUsedHandles: customer.toolsUsed || [],
            // Convert handles to human-readable product names for display
            toolsUsed:
                customer.toolsUsed
                    ?.map((tool) => getProductTitleByHandle(tool))
                    .filter((name): name is string => name !== undefined) || [],
            // Dynamically check if customer has a case study
            hasCaseStudy: customersWithCaseStudies.has(key),
        }

        // Remove legacy fields from final object
        delete (customerWithSlug as any).legacyLogo
        delete (customerWithSlug as any).legacyLogoDark

        return {
            ...acc,
            [key]: customerWithSlug,
        }
    }, {} as Record<string, Customer>)

    const getCustomer = (slug: string): Customer | undefined => {
        return customers[slug]
    }

    const getCustomers = (slugs: string[]): Customer[] => {
        return slugs.map((slug) => customers[slug]).filter(Boolean) as Customer[]
    }

    const hasCaseStudy = (slug: string): boolean => {
        return customers[slug]?.hasCaseStudy ?? false
    }

    const isFeatured = (slug: string): boolean => {
        return !!customers[slug]?.featured
    }

    return {
        customers,
        getCustomer,
        getCustomers,
        hasCaseStudy,
        isFeatured,
    }
}
