import React from 'react'

import Link from 'components/Link'
import { Posts } from 'components/Blog'

type TutorialsProps = {
    tutorials: {
        edges: {
            node: any
        }[]
    }
}

export const Tutorials: React.FC<TutorialsProps> = ({ tutorials }) => {
    return (
        <section className="my-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="m-0">Tutorials</h3>
                <Link to="/docs/tutorials">View all</Link>
            </div>
            <Posts posts={tutorials.edges} action={<Link to="/tutorials/all">View all</Link>} />
        </section>
    )
}
