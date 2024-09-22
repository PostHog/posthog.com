import React from 'react'

const IdealEmployeeProfile: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 lg:gap-8">
      <div className="">
        <p className="opacity-60 mb-2">Who we look for</p>
        <h2 className="text-3xl xl:text-4xl font-bold mb-2">Our IEP (ideal <em>employee</em> profile)</h2>
        <p className="mb-2"><strong>TL;DR:</strong> We don't hire middle management.</p>
        <p className="text-[15px] max-w-md my-4 py-4 border-y lg:border-b-0 lg:pb-0 lg:mb-0 border-light dark:border-dark"><strong>Fun fact:</strong> We have an internal Slack channel called <span className="whitespace-nowrap">#do-more-weird</span> where we discuss crazy ideas that most people save for April Fool's Day.</p>
      </div>
      <div>
        <h3 className="text-lg mb-1">Weirdos</h3>
        <p>We look for adventurers. We're here to take a small company to IPO, and beyond. We will only get there if we think differently to everyone else. We're not a fit if you want a predictable career.</p>

        <h3 className="text-lg mb-1">Individual contributors</h3>
        <p>We think it's more important to hire exceptional people, then give them autonomy and plenty of context. We're not a fit if management responsibility is what motivates you.</p>

        <h3 className="text-lg mb-1">Low egos</h3>
        <p>Fast, scrappy people thrive here. We're informal, we use clear language and get a broad variety of work done fast. We're not a fit if you want process.</p>
      </div>

    </section>
  )
}

export default IdealEmployeeProfile
