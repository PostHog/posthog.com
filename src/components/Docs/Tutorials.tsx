import React from 'react'
import List from 'components/List'
import { CallToAction } from 'components/CallToAction'

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
                <CallToAction to="/docs/tutorials" type="secondary" size="sm">
                    View all
                </CallToAction>
            </div>
            <List
                className="grid gap-2"
                items={tutorials.edges.map(
                    ({
                        node: {
                            excerpt,
                            frontmatter: { title },
                            fields: { slug },
                        },
                    }) => ({
                        label: title,
                        url: slug,
                        description: excerpt,
                    })
                )}
            />
        </section>
    )
}
