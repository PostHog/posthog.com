import React, { useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import MDXEditor from 'components/MDXEditor'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { ProductVideo } from 'components/ProductVideo'
import WistiaVideo from 'components/WistiaVideo'
import TeamMember from 'components/TeamMember'
import Link from 'components/Link'
import ProductList from 'components/ProductList'
import { getLogo } from '../../constants/logos'
import WizardCommand from 'components/WizardCommand'

function WizardHeader(): JSX.Element {
    return (
        <header
            className="relative -mt-4 mb-6 overflow-hidden rounded-t-sm"
            style={{
                width: '100cqw',
                marginLeft: 'calc(50% - 50cqw)',
            }}
        >
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                className="dark:hidden absolute inset-0"
                imgClassName="h-full w-full"
            />
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                className="hidden dark:block absolute inset-0"
                imgClassName="h-full w-full"
            />
            <div className="relative flex flex-col-reverse @lg:flex-row items-center px-5 pt-4 pb-10 max-w-3xl mx-auto">
                <div className="flex-1 text-center @lg:text-left">
                    <h1 className="text-2xl @sm:text-3xl font-bold !mb-0">Don't add PostHog to your codebase.</h1>
                    <p className="!mt-2 !mb-4 text-base">
                        (Make AI do it for you – <em>with one swift terminal command</em>.)
                    </p>
                    <WizardCommand latest={false} slim />
                </div>
                <div className="shrink-0">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_3f8bb7a240.png"
                        alt="PostHog Wizard hedgehog"
                        className="w-40 @lg:w-56"
                    />
                </div>
            </div>
        </header>
    )
}

function DemoVideo(): JSX.Element {
    return (
        <ProductVideo
            videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/ai_wizard_install_cursor_331d174d75.mp4"
            videoDark=""
            autoPlay={true}
            classes="rounded"
        />
    )
}

function SupportedProducts(): JSX.Element {
    return (
        <div className="border border-border rounded-md p-4 not-prose @lg:float-right @lg:ml-6 @lg:mb-2 @lg:max-w-[200px]">
            <p className="text-sm font-semibold mb-2 opacity-70">Supported products</p>
            <ProductList
                sourceField="wizardSupport"
                sourceValues={[
                    true,
                    { value: 'In development', color: 'blue' },
                    { value: 'Coming soon', color: 'yellow' },
                ]}
                className="space-y-1.5"
                itemClassName="flex items-center gap-2 text-sm !text-inherit hover:opacity-75"
                iconSize="size-5"
            />
        </div>
    )
}

const frameworkCategories = [
    {
        label: 'Full stack',
        frameworks: [
            { name: 'Rails', logo: 'rails', url: '/docs/libraries/ruby-on-rails' },
            { name: 'Next.js', logo: 'nextjs', url: '/docs/libraries/next-js' },
            { name: 'Nuxt', logo: 'nuxt', url: '/docs/libraries/nuxt-js' },
            { name: 'Remix', logo: 'remix', url: '/docs/libraries/remix' },
            { name: 'Tanstack Start', logo: 'tanstack', url: '/docs/libraries/tanstack-start' },
        ],
    },
    {
        label: 'Frontend',
        frameworks: [
            { name: 'React', logo: 'react', url: '/docs/libraries/react' },
            { name: 'Vue', logo: 'vue', url: '/docs/libraries/vue-js' },
            { name: 'Svelte', logo: 'svelte', url: '/docs/libraries/svelte' },
            { name: 'Angular', logo: 'angular', url: '/docs/libraries/angular' },
        ],
    },
    {
        label: 'Backend',
        frameworks: [
            { name: 'Laravel', logo: 'laravel', url: '/docs/libraries/laravel' },
            { name: 'Django', logo: 'django', url: '/docs/libraries/django' },
            { name: 'Flask', logo: 'flask', url: '/docs/libraries/flask' },
            { name: 'FastAPI', logo: 'python', url: '/docs/libraries/python' },
        ],
    },
    {
        label: 'Mobile',
        frameworks: [
            { name: 'React Native', logo: 'reactNative', url: '/docs/libraries/react-native' },
            { name: 'iOS', logo: 'ios', url: '/docs/libraries/ios' },
            { name: 'Android', logo: 'android', url: '/docs/libraries/android' },
        ],
    },
]

function SupportedFrameworks(): JSX.Element {
    return (
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 not-prose">
            {frameworkCategories.map((category) => (
                <div key={category.label}>
                    <p className="text-sm font-semibold mb-2 opacity-60">{category.label}</p>
                    <ul className="list-none m-0 p-0 space-y-2">
                        {category.frameworks.map((fw) => {
                            const logoUrl = getLogo(fw.logo)
                            return (
                                <li key={fw.name}>
                                    <Link
                                        to={fw.url}
                                        className="flex items-center gap-2 text-sm !text-inherit hover:underline"
                                        state={{ newWindow: true }}
                                    >
                                        {logoUrl && <img src={logoUrl} alt={fw.name} className="size-5 rounded-sm" />}
                                        <span>{fw.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </div>
    )
}

function SkillStructure(): JSX.Element {
    return (
        <pre className="bg-accent border border-border rounded-md p-4 text-sm font-mono overflow-x-auto not-prose [&_code]:border-0">
            <code>
                {`.claude/
└── skills/
    └── posthog-nextjs/
        ├── references/
        └── SKILL.md`}
            </code>
        </pre>
    )
}

function GetStarted(): JSX.Element {
    const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-75">
            {children}
        </a>
    )

    return (
        <div className="not-prose">
            <p className="mb-4">
                PostHog Wizard takes around 8 minutes to run. So copy the command below, fire up your terminal, hit
                enter, and make your way to our <ExtLink href="https://www.youtube.com/posthog">YouTube</ExtLink> where
                you can watch approximately 1.76{' '}
                <ExtLink href="https://www.youtube.com/playlist?list=PLnOY1RYHjDfzBX5wsSUHwLj91xuGnH5Ci">
                    PostHog Demos
                </ExtLink>
                , 1.9{' '}
                <ExtLink href="https://www.youtube.com/playlist?list=PLnOY1RYHjDfyW1w0OZwf8zlnkJNfQ_kki">
                    PostHog AI tutorials
                </ExtLink>
                , or 2.7{' '}
                <ExtLink href="https://www.youtube.com/playlist?list=PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL">
                    changelog videos
                </ExtLink>
                .
            </p>
            <WizardCommand latest={false} slim />
        </div>
    )
}

function ExplainerVideo(): JSX.Element {
    return (
        <div className="not-prose">
            <p className="text-sm opacity-70">
                Here&apos;s <TeamMember name="Matt Brooker" photo /> explaining the{' '}
                <Link to="/docs/model-context-protocol">PostHog MCP server</Link>.
            </p>
            <div className="mb-3">
                <div className="aspect-video">
                    <WistiaVideo videoId="tjc4o4lldr" className="!aspect-video" autoPlay={false} />
                </div>
            </div>
        </div>
    )
}

function Hr(): JSX.Element {
    return <hr className="my-6 border border-primary" />
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'WizardHeader',
        kind: 'flow',
        props: [],
        Editor: () => <WizardHeader />,
    },
    {
        name: 'DemoVideo',
        kind: 'flow',
        props: [],
        Editor: () => <DemoVideo />,
    },
    {
        name: 'SupportedProducts',
        kind: 'flow',
        props: [],
        Editor: () => <SupportedProducts />,
    },
    {
        name: 'SkillStructure',
        kind: 'flow',
        props: [],
        Editor: () => <SkillStructure />,
    },
    {
        name: 'SupportedFrameworks',
        kind: 'flow',
        props: [],
        Editor: () => <SupportedFrameworks />,
    },
    {
        name: 'ExplainerVideo',
        kind: 'flow',
        props: [],
        Editor: () => <ExplainerVideo />,
    },
    {
        name: 'GetStarted',
        kind: 'flow',
        props: [],
        Editor: () => <GetStarted />,
    },
    {
        name: 'Hr',
        kind: 'flow',
        props: [],
        Editor: () => <Hr />,
    },
]

export default function Wizard() {
    const {
        mdx: { rawBody, mdxBody },
    } = useStaticQuery(graphql`
        query {
            mdx(slug: { eq: "wizard" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'wizard.mdx')
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog Wizard – Add PostHog to your codebase automatically"
                description="One small terminal command to install and configure PostHog in your codebase. The Wizard analyzes your project and sets up the right tools, custom events, and dashboards."
                image="/images/og/default.png"
            />
            <MDXEditor
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody}
                mdxBody={mdxBody}
                maxWidth={900}
            />
        </>
    )
}
