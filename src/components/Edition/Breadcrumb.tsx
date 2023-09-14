import Link from 'components/Link'
import React from 'react'
import Tooltip from 'components/Tooltip'
import { Info } from '@posthog/icons'

export default function Breadcrumb({ title }) {
    return (
        <div>
            <ul className="m-0 p-0 list-none flex items-center space-x-1 font-semibold mb-6">
                <li>
                    <Link className="!text-inherit" to="/posts">
                        Posts
                    </Link>
                </li>
                <li>&rarr;</li>
                <li>{title}</li>
                <li>
                    <Tooltip
                        content={() => (
                            <div>
                                <p className="text-sm font-bold m-0">This is just a portion of everything we post.</p>
                                <p className="text-sm m-0">
                                    Visit the{' '}
                                    <Link to="/posts" className="text-red font-semibold">
                                        posts hub
                                    </Link>{' '}
                                    to see more.
                                </p>
                            </div>
                        )}
                    >
                        <span className="relative">
                            <Info className="w-5- h-5" />
                        </span>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
