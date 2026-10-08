import React from 'react'
import SEO from 'components/seo'
import WhyPostHogViewer from 'components/WhyPostHog'

export default function Moat(): JSX.Element {
    return (
        <>
            <SEO
                title="Why people like us"
                description="We always try to do the right thing: transparent, usage-based pricing, a public codebase and roadmap, and a team that ships fast and listens to customers."
                image="/images/og/default.png"
            />
            <WhyPostHogViewer>
                <h1>Why people like us</h1>
                <p>TL;DR: We always try to do the right thing.</p>

                <h2>Pricing</h2>
                <p>
                    We're builder-first, not sales-first. We offer usage-based pricing because nobody likes long sales
                    cycles or a pricing page that literally contains no pricing. When you grow, we grow. You can get
                    started without talking to anyone. We have generous monthly free tiers for each of our products and
                    you can set billing limits so you never get an unexpected bill.
                </p>

                <h2>Transparency</h2>
                <p>
                    We like to be treated like humans and you probably do, too. We intentionally don't use big fluffy
                    words that don't mean anything. Instead of telling you what to think, we just tell you plainly what
                    we can offer you. We'll even tell you reasons why we might <em>not</em> be a fit for you – so you
                    can decide for yourself.
                </p>
                <p>Our codebase is public and so is our roadmap. You can vote on what we build next.</p>

                <h2>Speed</h2>
                <p>
                    We ship quickly – it's how we've grown from a single product into dozens in a matter of a few years.
                    We're always listening to customers. You'll find us all across X, in our community forums, and in
                    GitHub issues. Without our customers, we don't have a business. They're our #1 priority.
                </p>
            </WhyPostHogViewer>
        </>
    )
}
