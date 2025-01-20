import TeamMember from 'components/TeamMember'
import React from 'react'
import { Link } from 'gatsby'

const IdealEmployeeProfile: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 md:gap-8">
            <div className="">
                <p className="opacity-60 mb-2">Who we look for</p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                    Our IEP (ideal <em>employee</em> profile)
                </h2>
                <p className="mb-2">
                    <strong>TL;DR:</strong> We don't hire middle management.
                </p>
                <p className="text-[15px] max-w-md my-4 py-4 border-y md:border-b-0 md:pb-0 md:mb-0 border-light dark:border-dark">
                    <strong>Fun fact:</strong> We have an internal Slack channel called{' '}
                    <span className="whitespace-nowrap">#do-more-weird</span> where we discuss crazy ideas that most
                    companies save for April Fool's Day.
                </p>
            </div>
            <div className="space-y-8 md:space-y-0">
                <div>
                    <h3 className="text-lg mb-1">Weirdos</h3>
                    <p className="mb-3">
                        We look for adventurers. We're here to take a small company to IPO, and beyond. We will only get
                        there if we think differently to everyone else. We're not a fit if you want a predictable
                        career.
                    </p>

                    <p className="text-[15px] text-primary/75 dark:text-primary-dark/75 border border-light dark:border-dark p-2 rounded-md bg-accent dark:bg-accent-dark mb-6">
                        <TeamMember name="Joe Martin" photo className="bg-white/50 dark:bg-dark/50" /> worked as a
                        clown, a morgue cleaner, and a chainsaw salesman before joining the Marketing team. He now leads
                        the <Link href="/teams/words-pictures">Words & Pictures team</Link>.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg mb-1">Individual contributors</h3>
                    <p className="mb-3">
                        We think it's more important to hire exceptional people, then give them autonomy and plenty of
                        context. We're not a fit if management responsibility is what motivates you.
                    </p>

                    <p className="text-[15px] text-primary/75 dark:text-primary-dark/75 border border-light dark:border-dark p-2 rounded-md bg-accent dark:bg-accent-dark mb-6">
                        <TeamMember name="Thomas Obermüller" photo className="bg-white/50 dark:bg-dark/50" /> was CTO
                        for his previous company of 120 people before joining PostHog as a software engineer on the{' '}
                        <Link href="/teams/product-analytics">Product Analytics team</Link>.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg mb-1">Low egos</h3>
                    <p className="mb-3">
                        Fast, scrappy people thrive here. We're informal, we use clear language and get a broad variety
                        of work done fast. We're not a fit if you want process.
                    </p>

                    <p className="text-[15px] text-primary/75 dark:text-primary-dark/75 border border-light dark:border-dark p-2 rounded-md bg-accent dark:bg-accent-dark">
                        <TeamMember name="Cameron DeLeone" photo className="bg-white/50 dark:bg-dark/50" /> worked for
                        an $11 billion startup, then was Vice President of a poultry farm before joining PostHog as a
                        CSM.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default IdealEmployeeProfile
