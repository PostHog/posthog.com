import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { usePost } from './hooks'

export default function NextPost() {
    const { nextPost, contentContainerClasses } = usePost()
    if (!nextPost) return null
    const { frontmatter, excerpt, fields } = nextPost
    return (
        <div className="mx-5 lg:mx-6 xl:mx-12 mb-8 p-2 rounded-md bg-accent dark:bg-accent-dark border border-light dark:border-dark">
            <div className={contentContainerClasses}>
                <p className="text-lg text-black/40 dark:text-white/40 m-0 font-bold">Next article</p>
                <h3 className="text-xl font-bold m-0 my-1">{frontmatter?.title}</h3>
                <p className="relative max-h-24 overflow-hidden">
                    {excerpt}
                    <span className="bg-gradient-to-t from-accent dark:from-accent-dark to-transparent absolute w-full h-full inset-0" />
                </p>
                <CallToAction to={fields?.slug}>Read next article</CallToAction>
            </div>
        </div>
    )
}
