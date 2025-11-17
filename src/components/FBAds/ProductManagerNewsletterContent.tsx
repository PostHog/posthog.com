import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'

export default function ProductManagerNewsletterContent(): JSX.Element {
    return (
        <div className="max-w-3xl py-8">
            <div className="mb-8">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/390823720_35b0d6be_f823_4c45_8e80_cfc0727e8827_128b8bbd57.jpg"
                    className="w-full rounded-lg overflow-hidden shadow-xl"
                    alt="Product management is broken. Engineers can fix it"
                />
            </div>
            <h1 className="text-3xl font-bold mb-6">Product management is broken. Engineers can fix it</h1>

            <div className="article-content prose dark:prose-invert max-w-none">
                <p>
                    When Tim and I first started PostHog in 2020, I was adamant we would <strong>never</strong> hire a
                    product manager. I wanted engineers to wrestle with hard product problems. Product managers, I
                    believed, would just get in the way.
                </p>

                <p>
                    Four years on, I admit I was (partially) wrong. We need product managers. In fact, we couldn't have
                    shipped 8+ products, or hit our revenue goals without them.
                </p>

                <p>But I was right about one thing: there is a better way.</p>

                <p>
                    Over the past two years, we've <strong>redefined how PMs and engineers work together</strong>, and
                    optimized everything we do for speed and autonomy.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. PMs don't control engineers</h2>
                <p>At many companies, product management looks something like this:</p>
                <ol>
                    <li>Get a list of features the founders or sales team wants.</li>
                    <li>Tell the engineering team the bare minimum they need to know.</li>
                    <li>Get them to build as many of these features as possible.</li>
                </ol>

                <p>Obviously this isn't how it's supposed to work, but we've all seen it, right?</p>

                <p>
                    Too often product managers exist to control engineers, or shield them from organizational
                    dysfunction. It sucks for everyone involved and it's bad for the product.
                </p>

                <p>
                    You end up with a maze of half-baked features, and it's just plain slow. PMs become the bottleneck
                    and gatekeeper for all decisions, and engineers feel frustrated.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/445c908d_5612_4861_9161_f31463ee2023_1301x1040_069cae2754.png"
                        className="w-full rounded-lg"
                        alt="Why engineers ship slowly"
                    />
                </div>

                <p>And, let me be clear: this isn't the fault of product managers.</p>

                <p>
                    Leaders think{' '}
                    <em>"we can give our engineers more time to code if we don't bother them with other things."</em>{' '}
                    So, they create all this process that PMs are tasked with managing.
                </p>

                <p>
                    But this means engineers get a sanitized version of the truth, so they don't have the right
                    information to make the best decisions.
                </p>

                <p>Instead, we offer an alternative…</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Engineers make product decisions</h2>
                <p>The most important thing we've built at PostHog came from an engineer deciding what to build.</p>

                <p>
                    Back when PostHog only offered <Link to="/product-analytics">product analytics</Link>, an engineer
                    named <Link to="https://www.linkedin.com/in/karlakselpuulmann/">Karl</Link> noticed that many
                    customers were asking for <Link to="/session-replay">session replays</Link>.
                </p>

                <p>
                    He wanted to build it, but I thought it was a terrible idea. I thought it would take him ages, and I
                    didn't want to split the focus of the company on multiple products.
                </p>

                <p>
                    Karl disagreed and built it anyway. It ended up being wildly popular with customers, and changed our
                    entire company strategy!
                </p>

                <p>
                    This success made me realize PostHog could be more than just product analytics. So we built{' '}
                    <Link to="/feature-flags">feature flags</Link>, <Link to="/experiments">experiments</Link>,{' '}
                    <Link to="/surveys">surveys</Link>, and we're still extending it with{' '}
                    <Link to="/web-analytics">web analytics</Link>, a <Link to="/data-warehouse">data warehouse</Link>,
                    and error monitoring (currently in alpha).
                </p>

                <p>And all this because a single engineer disagreed with the CEO.</p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/c5daaeee_9c9c_4f55_a972_1b484e1e37f7_1648x400_17d59bddad.png"
                        className="w-full rounded-lg"
                        alt="James Hawkins is an idiot"
                    />
                </div>

                <p>
                    The reason Karl was right – and why engineers are usually right – is they have the deepest
                    understanding of what can be built. They understand the technical constraints, see patterns across
                    features, and know exactly how to solve a problem.
                </p>

                <p>
                    So we decided to lean into this. At PostHog, PMs no longer own the roadmap, make product decisions,
                    or shield engineers from users or the wider business goals.
                </p>

                <p>
                    Instead, our engineers run the show. They manage product teams. They have complete autonomy and
                    drive our products forward. They even <em>gasp</em>{' '}
                    <Link to="/newsletter/talk-to-users">talk to users</Link>.
                </p>

                <p>
                    This is why developers at PostHog are called{' '}
                    <Link to="/blog/what-is-a-product-engineer">product engineers</Link>. We want them to be opinionated
                    and customer obsessed, and that's only possible if they have genuine autonomy and responsibility for
                    product decisions.
                </p>

                <p>However, if engineers are to make all the decisions, they still need support…</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Product managers give engineers context</h2>
                <p>
                    Engineers often don't have the bandwidth to gather and distill all the information they need. This
                    is where PMs can help. At PostHog, it's their job to:
                </p>

                <ul>
                    <li>Analyze product analytics</li>
                    <li>Investigate opportunities</li>
                    <li>Do competitor research</li>
                    <li>Conduct user research (although engineers should still talk to users)</li>
                    <li>Share industry news</li>
                    <li>Track the results of the team's work</li>
                </ul>

                <p>
                    Notice that none of these responsibilities include managing the team, or defining the roadmap. At
                    PostHog, PMs exist to empower the engineers, not control them.
                </p>

                <p>
                    We think of PMs as the team's compass. They don't decide the destination, but they provide
                    information to let the team know if they're headed in the right direction.
                </p>

                <p>
                    PMs can and should challenge the team's decisions, but ultimately it's the engineers who make the
                    final call.
                </p>

                <p>
                    Of course, this requires an extremely high-level of trust in your engineer's decision-making, which
                    brings me to the next point…
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Accountability through feedback loops</h2>
                <p>
                    A giant checklist of processes and reviews is a tell-tale sign that a company doesn't trust their
                    engineers. This is an anti-pattern. You drastically slow them down, the team gets frustrated, and
                    the best people leave.
                </p>

                <p>
                    But it's also a mistake to blindly trust engineers to always make the right decisions. No one is
                    right 100% of the time. We've created a simple feedback loop that gives them more autonomy, but with
                    the context and accountability they need to succeed.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-4">a. Product engineers set their own quarterly goals</h3>
                <p>We used to do OKRs and metric-based goals, but we ran into two problems with it:</p>

                <ol>
                    <li>Teams wasted too much time coming up with the right metric to focus on.</li>
                    <li>
                        Engineers focused on small quick wins to move those metrics, rather than building what our users
                        actually wanted.
                    </li>
                </ol>

                <p>
                    Now, the outcome of our quarterly planning sessions is a list of things teams are going to build.
                    Here's a simplified version of the process:
                </p>

                <ol>
                    <li>
                        <strong>Execs share the company's goals at a high level</strong>, such as "we need to increase
                        top of funnel adoption", or "we want to become an all-in-one tool, so we need to build more
                        products". This happens before product teams decide their goals.
                    </li>
                    <li>
                        <strong>Engineers brainstorm what they should build to achieve them</strong>. If needed, they
                        ask for advice or guidance from the exec team, but it's ultimately up to engineers to decide
                        what they build.
                    </li>
                    <li>
                        <strong>Product teams meet to decide goals</strong>. The output will be a list of things they
                        want to build, and who is owning them.
                    </li>
                </ol>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/d36eb308_0253_46b1_919e_cf0270cbf02d_1584x1818_b0379e47e4.png"
                        className="w-full rounded-lg"
                        alt="Example of product analytics team's Q4 objectives"
                    />
                </div>

                <p>
                    This approach works better because teams aren't stressed about hitting specific metrics. They can
                    focus entirely on building and because engineers pick their own work, they're naturally more
                    motivated.
                </p>

                <p>
                    As the CEO, I make the assumption that what the team has come up with is correct. That said, I do
                    need to validate that the work they're doing is having a meaningful impact. Enter the growth review…
                </p>

                <h3 className="text-xl font-bold mt-6 mb-4">b. Product managers run monthly growth reviews</h3>
                <p>
                    Growth reviews exist to evaluate the impact of each team's work and PMs own them. First a team's PM
                    collects all available data, gathering insights from:
                </p>

                <ul>
                    <li>
                        <strong>Revenue metrics:</strong> e.g., MRR, month-on-month growth, revenue churn rate, total
                        paying customers count.
                    </li>
                    <li>
                        <strong>Product analytics:</strong> e.g., active users, user growth rate, organization growth
                        rate, user retention rate.
                    </li>
                    <li>
                        <strong>User feedback:</strong> e.g., NPS score, customer interviews, support tickets, any other
                        requests.
                    </li>
                </ul>

                <p>
                    They compile it and put it together in an easy to understand format. Next, they do a deep dive and
                    highlight interesting findings we should discuss further.
                </p>

                <p>The PM, engineers and exec team then meet to discuss questions like:</p>

                <ul>
                    <li>Are our 10 biggest customers happy users of the product?</li>
                    <li>
                        Do <Link to="/newsletter/ideal-customer-profile-framework">high ICP</Link> and non-ICP customers
                        use the product differently?
                    </li>
                    <li>Why was churn high last month? Can we identify any reasons?</li>
                    <li>
                        Can we find leading indicators that predict long-term product usage? (e.g. Facebook's 7 friends
                        in 10 days)
                    </li>
                    <li>Where in the onboarding funnel do new users struggle?</li>
                </ul>

                <p>
                    This paints a full picture of how the team and product are doing. It's then up to the product team
                    lead (an engineer) to decide if the team should continue on their course, or if something needs to
                    change.
                </p>

                <p>
                    They can choose to reprioritize their projects, change their goals, or come up with new projects
                    entirely. It's the job of the CEO or senior leader to challenge assumptions, ask hard questions, and
                    ultimately hold the team accountable.
                </p>

                <p>
                    This creates a healthy tension. Engineers maintain their autonomy in decision-making, but there's a
                    clear feedback loop to ensure those decisions are delivering real value. Without this
                    accountability, autonomy can become directionless. With it, teams are empowered to experiment, and
                    pivot quickly based on real-time feedback.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Learn fast by optimizing for speed</h2>
                <p>
                    These changes unblock engineers and free product managers from the (not very fun) gatekeeper role,
                    but there's one final step.
                </p>

                <p>
                    Most humans aren't as magical at product as Steve Jobs. They don't just "know" what to build from
                    the start, or have a grand vision.
                </p>

                <p>Instead, to build the best products you need to:</p>

                <ol>
                    <li>Ship things</li>
                    <li>Get it into the hands of users</li>
                    <li>Iterate on their feedback</li>
                    <li>Repeat</li>
                </ol>

                <p>The faster you can do this, the better your product will be. It's that simple.</p>

                <p>
                    To give you some ideas of how you can do this, here are actionable tips we've found that help our
                    teams.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-4">a. No designer by default</h3>
                <p>The fewer dependencies a project has, the faster it moves.</p>

                <p>
                    Design is no exception to this rule, so we have no expectation that projects should start by running
                    through design <em>first</em>.
                </p>

                <p>
                    Instead, we encourage engineers to identify the goals of their project and the stage that they're
                    at, then decide how much design help they need.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/86068163_7f95_41cf_9028_5eb4aa799db9_1295x1040_9247e766ee.webp"
                        className="w-full rounded-lg"
                        alt="Design at PostHog"
                    />
                </div>

                <p>
                    We also have a{' '}
                    <Link to="https://storybook.posthog.net/?path=/story/exporter-exporter--trends-bar-breakdown-insight">
                        design system
                    </Link>{' '}
                    to help engineers self-serve their design needs and move faster.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-4">b. Radically transparent communication</h3>
                <p>
                    We communicate <Link to="/founders/how-to-run-a-transparent-company">everything in the open</Link>.
                </p>

                <p>
                    This includes team roadmaps, sprint notes, board meeting notes, company finances, fundraising
                    updates, and more. We even eliminated many 1-on-1s, since we found they were a breeding ground for
                    information silos.
                </p>

                <p>
                    The benefits are countless. Not only does it help build context across teams, but it also cuts down
                    on meetings, and speeds up decision making. It even reduces politics – you can't be sneaky if
                    everything is public!
                </p>

                <p>
                    To do this, we set up <Link to="/handbook/company/communication">communication guidelines</Link>:
                    everything should be done{' '}
                    <Link to="https://newsletter.posthog.com/p/how-we-work-asynchronously">asynchronously</Link>, and
                    there is a clear hierarchy for communication preferences.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/1baf3af1_1c6d_4385_85fd_9215b01ff749_1681x1325_084cd4b44e.png"
                        className="w-full rounded-lg"
                        alt="Communication guidelines at PostHog"
                    />
                </div>

                <h3 className="text-xl font-bold mt-6 mb-4">c. Small teams</h3>
                <p>
                    No more than six people per team. Any more than that and it all goes to hell: more meetings, more
                    process, more bottlenecks, and more bullshit. 💩
                </p>

                <p>
                    Here's how we <Link to="/newsletter/small-teams">keep teams small</Link> and effective:
                </p>

                <ul>
                    <li>
                        Give them a clear mission – e.g. "Make PostHog the best experimentation platform for engineers"
                    </li>
                    <li>Put an engineer in charge</li>
                    <li>Let them work however they want</li>
                    <li>Split the team when it hits 6 people. No exceptions.</li>
                </ul>

                <p>Want proof it works? Here's what a typical week looks like for an engineer at PostHog:</p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/a0d634a2_bd3e_4229_ae8f_f98269a6c4f7_2268x1473_06595e2e80.jpg"
                        className="w-full rounded-lg"
                        alt="Screenshot of an engineer's calendar at PostHog"
                    />
                </div>

                <p>
                    The magic of small teams isn't just about speed – it's about ownership. When six or fewer people own
                    a problem, there's nowhere to hide and no way to pass the buck. Everyone has to pull their weight,
                    and everyone's contribution matters.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">In summary</h2>
                <p>This is our playbook in its simplest terms:</p>

                <ul>
                    <li>
                        <strong>Great PMs don't control the team or roadmap</strong>. They uncover insights that amplify
                        the team's impact, and ensure they don't drift off course.
                    </li>
                    <li>
                        <strong>Great product engineers don't need instructions</strong>. They drive product decisions
                        using context PMs provide, and their knowledge of what's possible.
                    </li>
                </ul>

                <p>Getting this dynamic right is how we ship fast, build right, and win.</p>
            </div>
        </div>
    )
}
