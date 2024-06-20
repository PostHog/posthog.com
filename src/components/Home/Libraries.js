import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import { IconEllipsis } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

const librariesData = {
    web: {
        name: 'Web (front end)',
        description: 'Use autocapture to collect client-side events without any special instrumentation.',
        items: [
            {
                name: 'JavaScript',
                url: '/docs/libraries/js',
                icon: <StaticImage src="../../../contents/images/docs/integrate/js.svg" alt="JavaScript" />,
            },
            {
                name: 'React',
                url: '/docs/libraries/react',
                icon: <StaticImage src="../../../contents/images/docs/integrate/react.svg" alt="React" />,
            },
            {
                name: 'Node.js',
                url: '/docs/libraries/node',
                icon: <StaticImage src="../../../contents/images/docs/integrate/nodejs.svg" alt="Node.js" />,
            },
            {
                name: 'Next.js',
                url: '/docs/libraries/next',
                icon: <StaticImage src="../../../contents/images/docs/integrate/frameworks/nextjs.svg" alt="Next.js" />,
            },
        ],
    },
    'server-side': {
        name: 'Server-side libraries',
        description: 'Capture server-side events - best used in conjunction with a front end web library',
        items: [
            {
                name: 'Java',
                url: '/docs/libraries/java',
                icon: <StaticImage src="../../../contents/images/docs/integrate/java.svg" alt="Node.js" />,
            },
            {
                name: 'PHP',
                url: '/docs/libraries/php',
                icon: <StaticImage src="../../../contents/images/docs/integrate/php.svg" alt="Node.js" />,
            },
            {
                name: 'Ruby',
                url: '/docs/libraries/ruby',
                icon: <StaticImage src="../../../contents/images/docs/integrate/ruby.svg" alt="Node.js" />,
            },
            {
                name: 'Python',
                url: '/docs/libraries/python',
                icon: <StaticImage src="../../../contents/images/docs/integrate/python.svg" alt="Node.js" />,
            },
            {
                name: 'More',
                url: '/docs/libraries',
                icon: <IconEllipsis />,
            },
        ],
    },
    mobile: {
        name: 'Mobile libraries',
        description: 'Send custom events and identify users. Record mobile sessions and use feature flags.',
        items: [
            {
                name: 'Android',
                url: '/docs/libraries/android',
                icon: <StaticImage src="../../../contents/images/docs/integrate/android.svg" alt="Node.js" />,
            },
            {
                name: 'iOS',
                url: '/docs/libraries/ios',
                icon: <StaticImage src="../../../contents/images/docs/integrate/ios.svg" alt="Node.js" />,
            },
        ],
    },
}

export default function Libraries() {
    return (
        <section className="max-w-7xl mx-auto px-5 mb-12 md:-mb-24">
            <div className="md:grid grid-cols-12">
                <div className="col-span-5">
                    <div className="rotate-3 md:rotate-0">
                        <StaticImage src="./images/hogflix-mobile.png" alt="Hogflix mobile" placeholder="blurred" />
                    </div>
                </div>

                <div className="col-span-7 -mt-48 md:mt-0 relative z-10 after:absolute after:left-0 after:w-full after:-top-60 after:h-60 after:bg-gradient-to-b after:from-tan/0 after:via-tan/75 after:to-tan md:overflow-hidden bg-tan dark:bg-dark">
                    <h3 className="text-5xl xl:text-6xl text-center md:text-left mb-8">
                        SDKs for <span className="text-blue">web</span> and{' '}
                        <span className="text-red dark:text-yellow">mobile</span>
                    </h3>

                    <div className="flex flex-col gap-4 mb-4">
                        {Object.values(librariesData).map((category) => (
                            <div key={category.name}>
                                <h4 className="mb-0">{category.name}</h4>
                                <p className="opacity-70 mb-4">{category.description}</p>
                                <ul className="flex gap-3 md:gap-4 list-none p-0 pb-2 m-0">
                                    {category.items.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.url}
                                                className="flex flex-col gap-2 items-center p-0 relative transition-all hover:scale-[1.02] hover:top-[-.5px] active:scale-[.98] active:top-[.5px]"
                                            >
                                                <figure className="size-14 bg-accent dark:bg-accent-dark p-3 rounded-md text-center flex items-center justify-center text-primary/50 dark:text-primary-dark/50">
                                                    {item.icon}
                                                </figure>
                                                <span className="text-red dark:text-yellow font-semibold text-sm">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <CallToAction href="/docs/libraries" size="sm" type="secondary">
                        Browse all libraries
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}
