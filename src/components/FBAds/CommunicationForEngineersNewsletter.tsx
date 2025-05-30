import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'

export default function CommunicationForEngineersNewsletter(): JSX.Element {
    return (
        <div className="max-w-3xl py-8">
            <div className="mb-8">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/image_1_2594402957.png"
                    className="w-full rounded-lg overflow-hidden shadow-xl"
                    alt="What engineers get wrong about communication"
                />
            </div>
            <h1 className="text-3xl font-bold mb-6">What engineers get wrong about communication</h1>

            <div className="article-content prose dark:prose-invert max-w-none">
                <p>
                    Engineers spend most of their time doing two things: coding and communicating. The first has endless
                    amounts written about it; the second much less so.
                </p>

                <p>To address this injustice, we're sharing:</p>

                <ol>
                    <li>The biggest mistakes we see engineers make when communicating.</li>
                    <li>
                        What we do as a <Link to="/newsletter/remote-working">remote</Link>,{' '}
                        <Link to="/newsletter/how-we-work-async">async</Link>,{' '}
                        <Link to="/newsletter/small-teams">engineering-led</Link> company to eliminate them.
                    </li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Forgetting about your users</h2>
                <p>
                    It's easy to get caught up in the technical details of a project, such as overcoming constraints,
                    optimizing performance, and following best practices.
                </p>

                <p>
                    But companies don't succeed based on their ability to solve{' '}
                    <Link to="/newsletter/choosing-technologies">technical problems</Link>. They win when they solve
                    their user's{' '}
                    <Link to="/newsletter/how-to-uncover-your-users-real-problems">
                        most painful and valuable problems
                    </Link>
                    .
                </p>

                <p>
                    This should be reflected in your communication. At PostHog, our communication connects to users in
                    one of two ways:
                </p>

                <ol>
                    <li>
                        <strong>It's about a user issue.</strong> Top priorities for us include feature requests from
                        customers, solving confusions about features, or fixing bugs affecting them. These often require
                        coordination and collaboration.
                    </li>
                    <li>
                        <strong>It's backed by a user experience.</strong> We build features because users want them.
                        This means their specific needs are often our best guide for what to work on or how to implement
                        it.
                    </li>
                </ol>

                <p>
                    To give you a sense of what this actually looks like, a snapshot of the last 10 Slack messages in
                    our `#team-product-analytics` channel includes:
                </p>

                <ul>
                    <li>Two bug reports from support</li>
                    <li>Two feature requests from other members of our team</li>
                    <li>Four customer problems or requests</li>
                    <li>One change needing a review</li>
                    <li>One general team announcement</li>
                </ul>

                <p>
                    In other words, 80% of the communication was about problems customers had, or requests for features
                    of changes to improve the experience.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/pie_c45c71d96a.png"
                        className="w-full rounded-lg"
                        alt="Pie chart showing communication breakdown"
                    />
                </div>

                <p>
                    This user focus does have tradeoffs: we spend less time discussing technical details, figuring out
                    the best way to do things, and collecting input from stakeholders.
                </p>

                <p>Instead, we rely on:</p>

                <ul>
                    <li>
                        <Link to="/founders/cracked-manifesto">Hiring great people</Link> who can deal with technical
                        problems as they arise.
                    </li>
                    <li>
                        Making ownership clear. It lies with individuals, or at most{' '}
                        <Link to="/newsletter/small-teams">a small team</Link>.
                    </li>
                    <li>
                        Focusing on <Link to="/handbook/engineering/development-process">shipping things</Link> users
                        will actually see. Outcomes &gt; implementation.
                    </li>
                </ul>

                <p>
                    Sometimes this means we aren't shipping a perfectly polished feature right away, but the benefit is
                    we can get to something that users actually care about faster.
                </p>

                <blockquote>
                    <strong>Try this:</strong> Include a link to the Zendesk issue, customer Slack thread, tweet, or{' '}
                    <Link to="/product-engineers/interview-snapshot-guide">user interview note</Link> in your next
                    message about development. If you don't have access to these, the first step is changing that.
                </blockquote>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Hoarding information (aka Squirrel Mode)</h2>
                <p>
                    People tend to hoard information. They are scared sharing it will make them look silly, or lose the
                    power they think it provides.
                </p>

                <p>
                    But this attitude kills companies. Knowing things isn't a super power, sharing what you know is.
                    You're not a squirrel.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/image_1_2594402957.png"
                        className="w-full rounded-lg"
                        alt="Squirrel mode"
                    />
                </div>

                <p>Hoarding information causes three problems:</p>

                <ol>
                    <li>
                        <strong>It creates unnecessary communication</strong>, like people repeatedly asking about a
                        process or policy. Individuals with knowledge become bottlenecks to progress.
                    </li>
                    <li>
                        <strong>It generates duplication of effort</strong>. When information isn't freely available,
                        people end up working on solved problems, or features that already exist.
                    </li>
                    <li>
                        <strong>It creates silos and reduces trust</strong>, and a negative feedback loop where sharing
                        information is seen as a sign of weakness, and knowledge is wielded as a weapon.
                    </li>
                </ol>

                <p>
                    The solution is to make communication legible:{' '}
                    <Link to="/newsletter/remote-working#1-they-write-everything-down">write it down</Link> and work in
                    public.
                </p>

                <p>
                    This means avoiding closed door meetings, private Slack conversations, and email threads, whenever
                    possible. Instead, move communication to public channels, have an accessible wiki or{' '}
                    <Link to="/handbook">handbook</Link>, and default to giving everyone access to everything.
                </p>

                <p>
                    But this only works if it comes from the top. At PostHog, the{' '}
                    <Link to="/teams/exec">exec team</Link> shares details that are often private at other companies,
                    like <Link to="/handbook/people/finance">company finances</Link>, slides from{' '}
                    <Link to="/handbook/exec/annual-planning">board meetings</Link>, or the reasons for{' '}
                    <Link to="/handbook/strong-team#a-small-group-of-stronger-people-and-compensation">
                        letting people go
                    </Link>
                    . In doing this, they encourage everyone else to do the same. Hiding engineering knowledge looks
                    trivial in comparison.
                </p>

                <p>
                    We also take "working in public" a step further by sharing as much as possible publicly, outside our
                    company. This includes our <Link to="https://github.com/PostHog/">code</Link>,{' '}
                    <Link to="/roadmap">roadmap</Link>, and even{' '}
                    <Link to="/handbook/why-does-posthog-exist">strategy</Link>.
                </p>

                <p>
                    Sharing so much context publicly compounds its impact. It builds trust with customers, and means
                    potential candidates and new starters arrive having already consumed the context they need to have
                    an immediate impact.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/transparent_5e2a33f68d.png"
                        className="w-full rounded-lg"
                        alt="Transparent communication"
                    />
                </div>

                <p>
                    We realize external openness doesn't work for everyone, but that doesn't mean you should return to
                    hoarding information. Companies like{' '}
                    <Link to="https://nabeelqu.substack.com/i/150188028/secrets">Palantir</Link>,{' '}
                    <Link to="https://hbr.org/2008/09/how-pixar-fosters-collective-creativity">Pixar</Link>, and{' '}
                    <Link to="https://alvinwan.com/why-and-why-not-work-at-meta/">Meta</Link> are all secretive
                    externally, but have internal openness. This has helped them build the massively successful
                    companies they are today.
                </p>

                <blockquote>
                    <strong>Try this:</strong> Write a guide or runbook on an undocumented process you're responsible
                    for. Refer to it the next time someone asks you about it. We have a ton of public examples of these
                    from <Link to="/handbook/engineering/databases/schema-changes">making schema changes safely</Link>{' '}
                    to{' '}
                    <Link to="/handbook/engineering/databases/query-performance-optimization">optimizing queries</Link>{' '}
                    to <Link to="/handbook/product/per-product-growth-reviews">running growth reviews</Link>.
                </blockquote>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Lacking an opinion</h2>
                <p>
                    Opinions are direction. They are what your product and company become. People who don't communicate
                    in an opinionated way are easily ignored, and often resent their lack of influence.
                </p>

                <p>
                    To avoid this outcome, it's critical to do the work to actually <strong>form an opinion</strong>.
                    Relying on whatever comes to mind (or whatever ChatGPT tells you) will leave you directionless and
                    undifferentiated.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/self_proclaimed_b2e77537be.png"
                        className="w-full rounded-lg"
                        alt="Self proclaimed free thinkers"
                    />
                </div>

                <p>When sharing an opinion, ask yourself:</p>

                <ol>
                    <li>Is this really true?</li>
                    <li>What evidence do I have to support this?</li>
                </ol>

                <p>
                    One way I do this is to anticipate what my smartest coworkers (or competitors) might say in
                    opposition to an idea or opinion, and then ensure I back up my points with enough to stand them up.
                    A process sometimes referred to as{' '}
                    <Link to="https://en.wikipedia.org/wiki/Straw_man#Steelmanning">steelmanning</Link>.
                </p>

                <p>
                    Our{' '}
                    <Link to="/newsletter/choosing-technologies#4-we-make-decisions-asynchronously">
                        request for comments
                    </Link>{' '}
                    (RFC) process exemplifies this approach. When someone creates an RFC, they don't just say there is a
                    problem, they propose a specific solution, take a stand on why it's right, mention alternatives, and
                    invite feedback.
                </p>

                <p>
                    Once you've done the work to form an opinion, be confident and direct in sharing it. Don't hedge by
                    saying "this might be a good idea" or "maybe we could do this." Vague, non-committal communication
                    might feel safer, but it rarely leads to action.
                </p>

                <p>
                    Being opinionated (and sharing those opinions clearly) enables us to move faster and more
                    autonomously. Teams don't wait to be assigned tasks or told what to do. They identify problems and
                    go solve them.
                </p>

                <blockquote>
                    <strong>Remember this:</strong> It's better to say "I need more time to think about this" than share
                    a vague, uncommitted opinion. We prefer async communication precisely because it gives people the
                    time to digest context and develop informed opinions.
                </blockquote>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Not including enough context</h2>
                <p>
                    Low context messages like "this isn't working" or "what do you think of this?" suck. They burden the
                    receiver with figuring out the context, so they can work towards a solution. They sap energy out of
                    others.
                </p>

                <p>
                    This problem is common in <Link to="/newsletter/remote-working">remote companies</Link>, especially
                    ones wedded to old habits formed from working in an office. In remote settings, you can't see the
                    blank stares and distracted looks of people you're losing.
                </p>

                <p>
                    You need to account for this by including all the context a reader needs to succeed. This usually
                    means sharing:
                </p>

                <ol>
                    <li>
                        <strong>Data.</strong> Communication often includes the link to the{' '}
                        <Link to="/docs/product-analytics/sql">query</Link>,{' '}
                        <Link to="/docs/product-analytics/insights">insight</Link>,{' '}
                        <Link to="/docs/product-analytics/dashboards">dashboard</Link>, or{' '}
                        <Link to="/docs/error-tracking/monitoring">error trace</Link>. Say what metric you care about.
                        Query performance, revenue churn, error volumes, and{' '}
                        <Link to="/docs/product-analytics/funnels">conversion</Link> are all common metrics at PostHog.
                    </li>
                    <li>
                        <strong>Feedback.</strong> It is common to see "
                        <Link to="/tutorials/feedback-interviews-site-apps">X gave feedback that…</Link>" or "X is
                        having trouble with Y" when communicating at PostHog. This often includes a link to the message
                        from the user, or the problem area in-app, and a potential solution for it.
                    </li>
                </ol>

                <p>
                    Sharing the context gives the receiver more of the information they need to evaluate the problem as
                    well as a jumping off point for finding a solution.
                </p>

                <p>
                    Likewise, when asking a question, provide both the question you have <strong>AND</strong> the reason
                    you're asking. This can save a lot of back and forth, and often leads to a better solution than the
                    one you assumed existed.
                </p>

                <blockquote>
                    <strong>Remember this:</strong> Put yourself in your recipient's shoes. Would you be able to
                    accomplish what you want them to given the context you provide?
                </blockquote>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Being completely unstructured</h2>
                <p>
                    People want to communicate. They want to distribute information with each other. Information wants
                    to be free.
                </p>

                <p>
                    It can be tempting to let people do whatever they feel is best, but this can quickly devolve into
                    one of two problems:
                </p>

                <ul>
                    <li>
                        <strong>Over-communication.</strong> Noise and mess makes it difficult to find what's actually
                        relevant and valuable.
                    </li>
                    <li>
                        <strong>Under-communication.</strong> Others become blocked because they don't know what you're
                        working on, or don't have all the information they need to succeed.
                    </li>
                </ul>

                <p>
                    Fixing this requires giving people a time and place to communicate. You can think of these as
                    "rituals," repeated, formatted moments to encourage communication. They help teams stay aligned and
                    make sure everyone has what they need to succeed.
                </p>

                <p>Our rituals include:</p>

                <ol>
                    <li>
                        <strong>Weekly all-hands.</strong> A 30-minute call where the most important updates are shared
                        with the team, like revenue, hiring, and a{' '}
                        <Link to="/handbook/exec/all-hands-topics">topic of the day</Link>. A Q&A with our founders,
                        James and Tim. Demos of what anyone built in the last week.
                    </li>
                    <li>
                        <strong>Sprint planning.</strong> A{' '}
                        <Link to="https://github.com/PostHog/posthog/issues/28840">review</Link> done by each product
                        team every two weeks. Combines retrospectives, planning for the next two weeks, and progress
                        towards quarterly goals.
                    </li>
                    <li>
                        <strong>Growth reviews.</strong> For products with product-market fit, we hold{' '}
                        <Link to="/handbook/growth/growth-engineering/growth-sessions">monthly meetings</Link> to review
                        metrics like revenue, churn, usage, activation, and more. Teams then discuss how they can
                        improve these and agree actions.
                    </li>
                    <li>
                        <strong>Request for comments.</strong> This is how we coordinate large, cross-team decisions
                        async. <Link to="/handbook/company/communication#requests-for-comment-rfcs">An RFC</Link> shares
                        a problem, a potential solution, and gathers feedback. Team members share opinions and feedback,
                        then the owner makes a decision.
                    </li>
                    <li>
                        <strong>Quarterly planning.</strong> Teams reflect before the meeting using our version of SWOT
                        named <Link to="/handbook/company/goal-setting">HOGS</Link> (Hopes, Obstructions, Growth
                        Opportunity, Sneak Attack). We take an hour to brainstorm goals. These are focused on what we
                        will ship over with owners, what we'll ship, and successful metrics.
                    </li>
                </ol>

                <p>
                    Rituals aren't unique to PostHog. Zapier requires{' '}
                    <Link to="https://zapier.com/blog/friday-updates-at-work/">Friday Updates</Link> from everyone on
                    their internal blog.{' '}
                    <Link to="https://github.com/basecamp/handbook/blob/master/how-we-work.md">Basecamp</Link> has daily
                    and weekly check-ins as well as kickoffs and heartbeats.{' '}
                    <Link to="https://linear.app/method/introduction">Linear</Link> works in two-week cycles, writes
                    project specs, and keeps an updated changelog.
                </p>

                <p>
                    All rituals, including ours, are downstream from the culture you want to create. For us, that means
                    they are as async as possible and involve as few meetings as possible. This ensures that we have
                    enough time to work on what's important.
                </p>

                <blockquote>
                    <strong>Try this:</strong> Write down the rituals you're a part of and reflect on their purpose. Do
                    they overlap? Are they all necessary? Would they benefit from a bit more structure?
                </blockquote>

                <h2 className="text-2xl font-bold mt-8 mb-4">6. Not making communication actionable</h2>
                <p>
                    Organizations tend to{' '}
                    <Link to="/handbook/values#4-trust-and-feedback-over-process">add process</Link> and structure as
                    they grow, which slows them down. Communication is one of the areas that this can pop up, so you
                    need to be constantly fighting against this tendency.
                </p>

                <p>We do this by:</p>

                <ol>
                    <li>
                        <strong>Prioritizing pull requests over anything else.</strong> We have a hierarchy of
                        communication with pull requests on the top and email on the bottom. Pull requests are very
                        close to being shipped code and all other communication gets progressively further from that
                        being the case.
                    </li>
                    <li>
                        <strong>Having a clear owner, next steps, and deadline.</strong> This makes it clear how
                        progress is going to follow from communication. Without this purpose, communication is often
                        wasted and becomes noise.
                    </li>
                    <li>
                        <strong>Having empathy.</strong> Take the perspective of the recipient into account. Communicate
                        like you'd want to be communicated with. For example, you need to communicate differently with
                        non-technical people than with technical ones.
                    </li>
                    <li>
                        <strong>Being direct.</strong> At PostHog, we{' '}
                        <Link to="/handbook/company/communication#our-communication-values">
                            assume positive intent
                        </Link>{' '}
                        and realize that feedback is essential (these are two of our communication values). If you're
                        not direct, you're wasting time and doing more harm than good.
                    </li>
                </ol>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/tierlist_39eb9fd367.png"
                        className="w-full rounded-lg"
                        alt="Communication tier list"
                    />
                </div>

                <p>
                    A piece of communication that best represents this action-orientation is our team splits. Usually, a
                    new team forming would take weeks (or months) of meetings and planning. At PostHog, it takes the
                    form of a single message with a lot of 🪓 and 🚨 emojis.
                </p>

                <div className="my-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/james_f703debec3.jpg"
                        className="w-full rounded-lg"
                        alt="James axe"
                    />
                </div>

                <p>
                    This is direct, gives only the important context, and provides clear owners and next steps. This
                    helps everyone get back to what's important: shipping.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">What happens when you avoid these mistakes?</h2>
                <ul>
                    <li>
                        You create a culture of communication that prioritizes shipping features that users actually
                        care about, rather than planning or theorizing them.
                    </li>
                    <li>
                        Because the information you need is available at the right time, everyone can work more
                        autonomously with fewer meetings and less back and forth.
                    </li>
                    <li>
                        When making decisions, more perspectives are taken into account, not just the "highest paid
                        person's opinion."
                    </li>
                    <li>Knowledge you've gained gets shared and built upon, rather than lost and forgotten.</li>
                </ul>

                <p>
                    Don't believe this is real? This is largely how communication works at PostHog and based on a recent{' '}
                    <Link to="/handbook/people/feedback#team-surveys">internal survey</Link>, it seems to be working.
                </p>

                <ul>
                    <li>95% of people said PostHog has open and honest two-way communication</li>
                    <li>97% of people said leaders at PostHog keep people informed about what is happening.</li>
                    <li>
                        98% of people said they understand PostHog's goals and can see how their work contributes to
                        them.
                    </li>
                </ul>

                <p>
                    Although communication can always be improved, avoiding these mistakes goes a long way in doing it
                    as well as possible.
                </p>
            </div>
        </div>
    )
}
