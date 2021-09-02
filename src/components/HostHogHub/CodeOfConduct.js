import React from 'react'
import { section, heading } from './classes'
import Link from 'components/Link'

export default function CodeOfConduct() {
    return (
        <section className={section('text-center')}>
            <div className="bg-black rounded-lg py-14 px-16 w-9/12 mx-auto">
                <h2 className={heading('md', 'white')}>Code of Conduct</h2>
                <p className="text-white py-4 px-16">
                    We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and
                    healthy community. Read more about this in{' '}
                    <Link to="https://posthog.com/docs/contribute/code-of-conduct" className="text-white">
                        our full code of conduct
                    </Link>
                    .
                </p>
            </div>
        </section>
    )
}
