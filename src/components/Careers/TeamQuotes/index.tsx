import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'

const TeamQuotes: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-8 pb-12 grid gap-12 xl:gap-16">
      <h2 className="text-center text-4xl mb-2">Things we definitely didn't coerce anyone into saying...</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-white dark:bg-accent-dark rounded px-6 py-4 mb-4 shadow-lg">
            <p className="mb-0 text-center">
              I wake up so excited to get to work that sometimes I pinch myself to make sure I'm not dreaming. The combination of high expectations, high trust, high autonomy, and high reward is so unique and drives me to improve every day.
            </p>
          </div>

          <div className="p-0.5 bg-white dark:bg-accent-dark rounded-full border-2 border-light dark:border-dark">
            <div className="bg-red size-20 rounded-full overflow-hidden">
              <StaticImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1688575125/paul_64ee2de98e.png"
                alt="John Doe"
                width={80}
                height={80}
                className=""
              />
            </div>
          </div>

          <div className="leading-tight text-center mt-1">
            <Link href="/handbook/team/paul" className="text-red dark:text-yellow font-semibold inline-block">Paul</Link><br />
            <span className="text-sm opacity-75">Product Manager</span>
          </div>
        </div>
      </div>


    </section>
  )
}

export default TeamQuotes
