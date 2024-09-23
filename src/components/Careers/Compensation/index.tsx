import React from 'react'
import Link from 'components/Link'
import { CompensationCalculator } from 'components/CompensationCalculator'
import { IconChevronDown } from '@posthog/icons'



const Compensation: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-2 text-center">Compensation &amp; equity</h2>
      <p className="text-center text-balance">We hire the best talent and pay accordingly. We want everyone to feel invested in the company's success, so we offer equity with very employee-friendly terms.</p>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-accent dark:bg-accent-dark p-4 lg:p-6 rounded">
          <h3 className="text-xl mb-1">Transparent pay</h3>
          <p>Use our <Link href="/handbook/people/compensation">full salary calculator</Link> to see what you'll make here. You’ll know your approximate starting salary before you even apply.</p>
          <CompensationCalculator />
        </div>
        <div className="bg-accent dark:bg-accent-dark p-4 lg:p-6 rounded">
          <h3 className="text-xl mb-4">(Really) employee-friendly equity terms</h3>

          <ul className="list-none p-0 grid gap-2">
            <li>
              <p className="relative pl-7">
                <IconChevronDown className="w-6 h-6 inline-block -rotate-90 absolute top-0 left-0 opacity-50" />
                <strong>10 years to exercise your options</strong> <span className="opacity-60">(if you leave)</span><br />
                <span className="opacity-60 text-[15px]">Most companies give you 90 days</span>
              </p>
            </li>
          </ul>

          <p>Learn more about <Link href="handbook/people/share-options">share options</Link>.</p>
        </div>
      </div>
    </section>
  )
}

export default Compensation
