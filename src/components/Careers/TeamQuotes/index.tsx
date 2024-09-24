import React from 'react'
import Link from 'components/Link'


const TeamQuotes: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-8 pb-12 grid gap-12 xl:gap-16">
      <h2 className="text-center text-4xl mb-2">Things we definitely didn't coerce anyone into saying...</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-accent dark:bg-accent-dark p-4 rounded-lg">
          <div className="bg-white dark:bg-accent-dark rounded-md p-2">
            <p className="mb-0">Quote goes here</p>
          </div>

          <p className="text-sm opacity-75">- John Doe, Product Manager</p>
        </div>
      </div>


    </section>
  )
}

export default TeamQuotes
