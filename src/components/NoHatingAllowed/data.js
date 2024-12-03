import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'

export const HomepageCards = [
    {
        top: 'You enjoy "jumping on a quick call" with sales',
        bottom: (
            <>
                Sorry, we don't force you to talk to anyone. But you can{' '}
                <Link to="/demo" className="!text-red">
                    watch a recorded demo
                </Link>{' '}
                (at your own pace) or{' '}
                <Link to="/talk-to-a-human" className="!text-red">
                    request a personalized demo
                </Link>{' '}
                if you like.
            </>
        ),
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/i_love_telemarketing_d72bc8079b.png"
            />
        ),
        ImageSize: 'w-[calc(100%_+_5rem)] -mt-4',
    },
    {
        top: 'You love needlessly wasting company money',
        bottom: (
            <>
                We only have usage-based pricing that{' '}
                <Link to="/pricing" className="!text-red">
                    decreases exponentially
                </Link>{' '}
                with scale.
            </>
        ),
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/wasting_money_decf55197a.png"
            />
        ),
        ImageSize: 'w-full mt-8',
    },
    {
        top: (
            <>
                You'd rather <span className="text-red">buy</span> before you <span className="text-red">try</span>
            </>
        ),
        bottom: (
            <>
                We offer a free tier so large that only a fraction of our customers pay us anything. Even worse, we
                continually try to{' '}
                <Link to="/blog/multi-product-pricing" className="!text-red">
                    reduce our pricing
                </Link>
                .
            </>
        ),
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/try_buy_3c54a911c5.png"
            />
        ),
        ImageSize: 'w-[240px] -mt-4',
    },
    {
        top: 'You think your email is a good trade for that free whitepaper',
        bottom: <>Please press Ctrl + W now, or ask your network administrator to close your window.</>,
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/bad_trade_81f36c9a2a.png"
            />
        ),
        ImageSize: 'w-full mt-4',
    },
    {
        top: 'You give out your credit card details to strangers',
        bottom: <>You'd rather buy a product you've never used instead of a generous free trial?</>,
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/stranger_danger_eb6694e03d.png"
            />
        ),
        ImageSize: 'w-[230px] mt-6',
    },
    {
        top: "You're desperate for commitment",
        bottom: (
            <>
                Sadly, we don't offer annual contracts (unless you{' '}
                <Link to="/talk-to-a-human" className="!text-red">
                    ask for one
                </Link>
                ).
            </>
        ),
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/commitment_issues_d433b343b5.png"
            />
        ),
        ImageSize: 'w-full mt-4',
    },
    {
        top: 'You loathe new features, and bug fixes',
        bottom: (
            <>
                Unfortunately we release{' '}
                <Link to="/changelog" className="!text-red">
                    new updates weekly
                </Link>
                .
            </>
        ),
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/i_hate_change_6e54f0e9cc.png"
            />
        ),
        ImageSize: 'w-full',
    },
    {
        top: "You'd rather buy disparate tools and mangle them together",
        bottom: <>Apologies. Our focus is for you to engineer your product, not your data.</>,
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/mangle_ec73b24da8.png"
            />
        ),
        ImageSize: 'w-[230px] mt-6',
    },
    {
        top: 'You like buying a whole product suite to get access to one tool',
        bottom: <>Alas we don't force people to buy stuff they don't use. We suit people who want to pay by product.</>,
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/creative_suite_sucks_07b81c5a82.png"
            />
        ),
        ImageSize: 'w-[230px] mt-4',
    },
    {
        top: 'You think CSMs are your friends',
        bottom: <>Honey, those emails are automated.</>,
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage width={250} src="https://res.cloudinary.com/dmukukwp6/image/upload/csms_ce310839fd.png" />
        ),
        ImageSize: 'w-[230px] mt-8',
    },
    {
        top: 'You enjoy sitting through hours of training more than using the product',
        bottom: (
            <>
                No training is required to use PostHog, though we have plenty of{' '}
                <Link to="/docs" className="!text-red">
                    docs
                </Link>{' '}
                and{' '}
                <Link to="/guides" className="!text-red">
                    guides
                </Link>{' '}
                if you need some guidance.
            </>
        ),
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/training_c209c09991.png"
            />
        ),
        ImageSize: 'w-[250px] mt-8',
    },
    {
        top: "Data privacy isn't a big deal to you. (GDP-what now?)",
        bottom: <>Get cookie-less tracking, regional hosting, and raw database access.</>,
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/gdpwut_aaec809dca.png"
            />
        ),
        ImageSize: 'w-[250px] mt-8',
    },
    {
        top: 'Networking events are your things',
        bottom: <>We put on an event once. It was a disaster. Never again.</>,
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/ru_bizdev_9fcd6556d0.png"
            />
        ),
        ImageSize: 'w-[250px]',
    },
    {
        top: 'You love being out of the loop',
        bottom: (
            <>
                We publish our{' '}
                <Link to="/roadmap" className="!text-red">
                    roadmap
                </Link>
                ,{' '}
                <Link to="/handbook/company/strategy" className="!text-red">
                    strategy
                </Link>
                , and{' '}
                <Link to="/handbook" className="!text-red">
                    company handbook
                </Link>
                .
            </>
        ),
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/loop_hole_f5f7d3eb18.png"
            />
        ),
        ImageSize: 'w-full',
    },
    {
        top: 'Your CRM is a Rolodex',
        bottom: <>We don't even use phones, though we do have a fax number for legal and compliance reasons.</>,
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/rolodex_b1aee8688d.png"
            />
        ),
        ImageSize: 'w-[230px] -mt-4',
    },
]

export const CareersCards = [
    {
        top: 'You want a clearly-documented career progression framework',
        bottom: <>We believe shipping is much more important than ticking boxes.</>,
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/progression_framework_54f8111840.png"
            />
        ),
        ImageSize: 'w-full mt-6',
    },
    {
        top: 'You aspire to manage a large team',
        bottom: (
            <>
                Our{' '}
                <Link to="/teams" className="!text-red">
                    small teams
                </Link>{' '}
                operate like startups within the company.
            </>
        ),
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/mr_manager_0c0c42726d.png"
            />
        ),
        ImageSize: 'w-full',
    },
    {
        top: 'You want to be able to tell other people what to do',
        bottom: 'Anyone can propose an idea, but only the best ideas win.',
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage width={250} src="https://res.cloudinary.com/dmukukwp6/image/upload/bossy_c0c05d84a4.png" />
        ),
        ImageSize: 'w-full mt-4',
    },
    {
        top: 'You expect your manager to tell you what to do',
        bottom: "James and Tim provide context in weekly all-hands. But it's up to you to decide where your time is best spent.",
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/manager_puppets_f302d3888c.png"
            />
        ),
        ImageSize: 'w-full',
    },
    {
        top: 'The phrase "That\'s not my job" exists in your vocabulary',
        bottom: "We all wear a lot of hats, and we all pitch in wherever's needed.",
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/not_my_job_ea1ae1b79a.png"
            />
        ),
        ImageSize: 'w-full mt-6',
    },
    {
        top: 'You enjoy playing corporate politics',
        bottom: "We're low ego and nearly all communication is public.",
        color: '#DCE7D0',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/corporate_politics_a496a8fb10.png"
            />
        ),
        ImageSize: 'w-full',
    },
    {
        top: 'You like to have a detailed plan before starting a project',
        bottom: 'Our plans always turn out to be wrong anyways, which is why we ship first.',
        color: '#D9E1FC',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/project_plan_1c30c80b21.png"
            />
        ),
        ImageSize: 'w-full mt-4',
    },
    {
        top: '"Work you" and "home you" are different people',
        bottom: "We don't put on a corporate facade when we show up to work every day.",
        color: '#FDBAF2',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/bipolar_f4b7052bbf.png"
            />
        ),
        ImageSize: 'w-full mt-4',
    },
    {
        top: 'You require mockups before firing up your code editor',
        bottom: "Projects are developer-led. Design isn't a blocker to shipping.",
        color: '#FFD89E',
        Image: (
            <CloudinaryImage
                width={250}
                src="https://res.cloudinary.com/dmukukwp6/image/upload/planner_b7f28de94f.png"
            />
        ),
        ImageSize: 'w-full mt-4',
    },
]
