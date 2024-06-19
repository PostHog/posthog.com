import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'

const librariesData = {
    web: {
        name: 'Web (front end)',
        description: 'Our front-end libraries support all PostHog features',
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
                icon: '<IconJava />',
            },
            {
                name: 'PHP',
                url: '/docs/libraries/php',
                icon: '<IconPhp />',
            },
            {
                name: 'Ruby',
                url: '/docs/libraries/ruby',
                icon: '<IconRuby />',
            },
            {
                name: 'Python',
                url: '/docs/libraries/python',
                icon: '<IconEllipsis />',
            },
        ],
    },
    mobile: {
        name: 'Mobile libraries',
        description: 'Capture events and identify users. Record mobile sessions and use feature flags.',
        items: [
            {
                name: 'Android',
                url: '/docs/libraries/android',
                icon: '<IconAndroid />',
            },
            {
                name: 'iOS',
                url: '/docs/libraries/ios',
                icon: '<IconIos />',
            },
        ],
    },
}

export default function Libraries() {
    return (
        <section className="max-w-7xl mx-auto px-5 pb-8 md:pb-16">
            <div className="md:grid grid-cols-3 gap-12">
                <div className="col-span-2">
                    <h3 className="text-5xl xl:text-6xl">
                        SDKs for <span className="text-blue">web</span> and{' '}
                        <span className="text-red dark:text-yellow">mobile</span>
                    </h3>

                    {Object.values(librariesData).map((category) => (
                        <div key={category.name} className="mb-8">
                            <h4 className="mb-0">{category.name}</h4>
                            <p className="opacity-70 mb-4">{category.description}</p>
                            <ul className="inline-grid grid-cols-4 gap-4 list-none p-0 pb-2 m-0">
                                {category.items.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.url} className="flex flex-col gap-2 items-center p-0">
                                            <figure className="size-16 bg-accent dark:bg-accent-dark p-4 rounded-md text-center flex items-center justify-center">
                                                {item.icon}
                                            </figure>
                                            <span className="text-red dark:text-yellow font-semibold text-[15px]">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div>image</div>
            </div>
        </section>
    )
}
