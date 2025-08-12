import React from 'react'
import Link from './Link'
import WizardCommand from './WizardCommand'

export default function IntegrationPrompt() {
    return (
        <div className="md:block">
            <div className="rounded border border-border dark:border-border-dark px-5 py-4 bg-white dark:bg-accent-dark">
                <div className=" items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold m-0">
                        <span className=" mr-1">Install in 90 seconds with this command</span>
                        <span className="bg-orange/10 !text-orange px-1 rounded-sm text-[13px] font-semibold flex-shrink-0 border border-orange">
                            BETA
                        </span>
                    </h4>
                </div>
                <p className="text-[15px] text-primary dark:text-primary-dark mb-4">
                    Works in your terminal or with tools like{' '}
                    <Link to="https://cursor.com/api/auth/login" external={true}>
                        Cursor
                    </Link>
                    ,{' '}
                    <Link to="https://replit.com/" external={true}>
                        Replit
                    </Link>{' '}
                    and{' '}
                    <Link to="https://bolt.new" external={true}>
                        Bolt
                    </Link>
                    .
                </p>
                <WizardCommand />
                <p className="text-[13px] text-primary/85 dark:text-primary-dark/85 m-0 -mt-0.5">
                    Supports Next.js, React, React Native, Svelte, and Astro.{' '}
                    <Link
                        to="/docs/getting-started/install?tab=wizard"
                        className="text-red dark:text-yellow hover:text-red dark:hover:text-yellow font-semibold"
                    >
                        More on the way!
                    </Link>
                </p>
            </div>
        </div>
    )
}
