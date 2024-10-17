import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import chapters from '../../../navs/handbook.json'
import { StaticImage } from 'gatsby-plugin-image'

const CompanyHandbook: React.FC = () => {
  return (
    <section className="grid md:grid-cols-2 md:items-center gap-8 max-w-7xl mx-auto px-4 xl:px-8 py-8">
      <div className="relative pb-[150px] md:pb-[200px]">
        <h2 className="text-3xl lg:text-4xl font-bold mb-2">Get to know us in our company handbook</h2>
        <p className="mb-2">Almost any question you'll have about working here is answered in our public handbook. But here are some highlights you might be interested to know:</p>
        <ul className="mb-4 pl-4">
          <li>Our revenue is over $10 million a year</li>
          <li>We're <Link href="/handbook/finance">default alive</Link></li>
          <li>If you join us, you will be expected to take a stance on if pineapple belongs on pizza</li>
        </ul>
        <CallToAction href="/handbook" type="secondary" size="sm">Visit the handbook</CallToAction>
        <div className="absolute bottom-12 md:bottom-0 -right-8 md:right-0 h-[150px] lg:h-[250px] scale-75 md:scale-100">
          <CloudinaryImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/search-hog-4.png"
            alt="This hog has an answer"
            height={250}
            width={330}
            placeholder="blurred"
          />
        </div>
      </div>
      <aside>
        <div className="bg-white dark:bg-accent-dark rounded-md p-4 md:px-6 xl:py-6 xl:px-8 shadow-xl w-[calc(100%_-_1rem)] md:w-auto dark:border dark:border-dark">
          <h4 className="mb-3">Handbook chapters</h4>
          {chapters.map((category) => {
            return (
              <div key={category.name} className="">
                <ol className="p-0 -ml-3 -mr-2">
                  {category.links.map((link) => {
                    return (
                      <li key={link.to} className="list-none">
                        <Link
                          to={link.to}
                          className="group flex justify-between baseline relative bg-bullet-light dark:bg-bullet-dark bg-repeat-x bg-center bg-[length:8px_8px] text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[28px] py-1 text-sm font-medium"
                        >
                          <span className="relative inline-block pl-3 pr-2 bg-white -ml-px group-hover:ml-0 dark:bg-accent-dark truncate">
                            {link.name}
                          </span>
                          <span className="relative pr-2 bg-white dark:bg-accent-dark w-10 -mr-px group-hover:mr-0 text-center text-sm">
                            {link.order}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              </div>
            )
          })}
        </div>
      </aside>
    </section>
  )
}

export default CompanyHandbook
