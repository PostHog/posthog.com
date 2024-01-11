import React, { useContext } from 'react'
import { PostsContext } from '../Posts'
import FeaturedPost from '../FeaturedPost'
import PostsGrid from '../PostsGrid'
import LandingPageNotice from '../LandingPageNotice'
import { StaticImage } from 'gatsby-plugin-image'
import SEO from 'components/seo'

export default function Newsletter() {
    const { posts, isLoading } = useContext(PostsContext)
    const [featuredPost, ...rest] = posts.slice(0, 10)

    return (
        <div className="mx-auto max-w-screen-xl">
            <SEO title="Newsletter - PostHog" />
            <LandingPageNotice title="Newsletter" />
            <FeaturedPost {...featuredPost?.attributes} />
            <div className="md:grid md:grid-cols-5 md:gap-12 px-4 lg:px-12 pb-0 max-w-4xl mx-auto items-center border-border dark:border-dark border-2 rounded-md my-12 mt-24">
                <div className="col-span-2 text-right -mt-32 -mb-12">
                    <StaticImage
                        src="../../../images/newsletter-signup.png"
                        objectFit="contain"
                        className="w-full h-full"
                    />
                </div>
                <div className="col-span-3 pt-6">
                    <p className="text-sm opacity-50 m-0">Subscribe to...</p>
                    <h4 className="relative text-xl m-0">Product for engineers</h4>
                    <p className="m-0">Helping engineers and founders flex their product muscles</p>
                    <div className="max-w-lg -ml-[15px] dark:ml-0">
                        <iframe
                            src="https://newsletter.posthog.com/embed"
                            frameBorder="0"
                            scrolling="no"
                            className="h-36 dark:rounded dark:bg-dark"
                        />
                        <div className="hidden dark:block text-sm dark:text-primary-dark max-w-sm opacity-50 -mt-2">
                            (Just imagine how much nicer this form would look in dark mode if Substack had better
                            embedding options!)
                        </div>
                    </div>
                </div>
            </div>
            <PostsGrid posts={rest} />
        </div>
    )
}
