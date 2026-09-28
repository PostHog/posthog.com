// Single source of truth for the catalogued "wild user" species.
// Copy is imported from the Figma field-guide booklet / the edited Google Doc.
// Section order matches the printed entry.

export interface SpeciesSection {
    label: string
    body: string
}

export interface Species {
    slug: string // base slug, matches image filenames
    route: string // page route opened as a window
    name: string
    latin: string
    heroImage?: string // transparent cutout used on the hero map (absent => not yet illustrated)
    plateI?: string // "Plate I" portrait (absent => placeholder box)
    plateII?: string // "Plate II" action illustration (absent => placeholder box)
    sections: SpeciesSection[]
    map: { top: number; left: number } // % position on the hero map
}

const img = (base: string, plate: 1 | 2) => `/images/field-guide/plates/${base}-plate-${plate}.png`

export const SPECIES: Species[] = [
    {
        slug: 'rage-clicker',
        route: '/field-guide/the-rage-clicker',
        name: 'The Rage-Clicker',
        latin: 'Furiosus checkoutus',
        heroImage: '/images/field-guide/rage-clicker.png',
        plateI: img('rage-clicker', 1),
        plateII: img('rage-clicker', 2),
        map: { top: 30, left: 15 },
        sections: [
            {
                label: 'Appearance',
                body: `Distinguished by rapid, repetitive tapping of the beak on a single point. Plumage darkens visibly toward the tail end of the encounter. Often accompanied by an audible exhale, inaudible to the scanner but inferable from typing cadence.`,
            },
            {
                label: 'Habitat',
                body: `Payment forms, "Submit" buttons, modal dialogs that have already been dismissed once. Rarely found in onboarding flows, almost always near the moment of intended conversion.`,
            },
            {
                label: 'Field notes',
                body: `The Rage-Clicker arrives at a payment form with clear intent. It attempts to proceed. Nothing happens. It attempts to proceed again. Nothing happens. The seventh attempt is indistinguishable from the first to a casual observer, but Replay Vision has been keeping count.`,
            },
            {
                label: 'Resolution',
                body: `Typically, abandonment. Occasionally, success, when the button finally responds and the user proceeds, visibly suspicious that something else will break. A small percentage convert anyway.`,
            },
            {
                label: 'Hazards observed',
                body: `Disabled submit button with no error state. JavaScript error in the form-validation library. Stripe webhook hanging. Sometimes a 2-second response time you have stopped noticing.`,
            },
            {
                label: 'If you spot one',
                body: `Rage clicks usually mean the button gave no response, not that the backend broke. The click registers, but nothing spins, nothing disables, and no error appears, so the user tries again. Throttle your network and hit Submit on your own checkout. If a second passes with nothing on screen, you have found what the Rage-Clicker found. A Scorer scanner rates every session 0 to 10 for frustration, so filter it to checkout, alert on the average, and send it to whoever owns the flow.`,
            },
        ],
    },
    {
        slug: 'refreshing-pilgrim',
        route: '/field-guide/the-refreshing-pilgrim',
        name: 'The Refreshing Pilgrim',
        latin: 'Reloadus hopefulus',
        heroImage: '/images/field-guide/refreshing-pilgrim.png',
        plateI: img('refreshing-pilgrim', 1),
        plateII: img('refreshing-pilgrim', 2),
        map: { top: 66, left: 25 },
        sections: [
            {
                label: 'Appearance',
                body: `Easily mistaken for any other user, until the right foot begins its small devotional motion toward the F5 key. The eyes carry an expression somewhere between patience and betrayal.`,
            },
            {
                label: 'Habitat',
                body: `Slow-loading dashboards, third-party widgets, anything behind a status page that has not yet updated.`,
            },
            {
                label: 'Field notes',
                body: `The Refreshing Pilgrim does not believe the page is broken. It believes the page is merely tired, and that another reload will rouse it. One Pilgrim hit reload 14 times on a single 504 in under a minute. Faith, it would seem, is a renewable resource.`,
            },
            {
                label: 'Resolution',
                body: `Either the page eventually loads, validating the Pilgrim's worldview, or it does not, at which point the Pilgrim abandons silently and without complaint. Rarely files a support ticket. Believes it must have been their internet, which puts the internet provider in a worse position than yourself.`,
            },
            {
                label: 'Hazards observed',
                body: `A backend timeout your team has stopped noticing. An over-eager loading spinner that resolves visually before the data arrives.`,
            },
            {
                label: 'If you spot one',
                body: `A user who reloads the same page four times thinks it is stuck rather than broken, and they are usually right. Behind it sits a slow endpoint, or a spinner that finishes before the data lands. They will not file a ticket, so nobody on your team hears about it. A Monitor scanner flags any session that reloaded one URL three or more times, and the reload timestamp points straight at the endpoint.`,
            },
        ],
    },
    {
        slug: 'tab-hopper',
        route: '/field-guide/the-tab-hopper',
        name: 'The Tab-Hopper',
        latin: 'Multitabus distractus',
        heroImage: '/images/field-guide/tab-hopper.png',
        plateI: img('tab-hopper', 1),
        plateII: img('tab-hopper', 2),
        map: { top: 22, left: 46 },
        sections: [
            {
                label: 'Appearance',
                body: `Integument difficult to identify. The Tab-Hopper is rarely viewed in full, only in glimpses, between other tabs. Often spotted with five open instances of your product.`,
            },
            {
                label: 'Habitat',
                body: `Multi-account setups. Anywhere comparison is required. The Tab-Hopper is also frequently observed in the wild on Slack, Linear, and three different documentation sites simultaneously.`,
            },
            {
                label: 'Field notes',
                body: `The Tab-Hopper arrives intending to complete a task. It opens a second tab to verify a detail. It opens a third tab to consult a doc. The third tab contains a link that leads to a fourth. By the time the fifth tab opens, the Tab-Hopper has forgotten why the first tab was opened, and is thinking about something completely different.`,
            },
            {
                label: 'Resolution',
                body: `The Tab-Hopper returns to the first tab three days later. Maybe even three weeks later. Sometimes The Hopper finishes the task. Other times, it opens a sixth tab and repeats the same process from the start. Many, many times.`,
            },
            {
                label: 'Hazards observed',
                body: `No single failure to blame. The product worked. The user has the attention span of a fruit fly on espresso, and your product is one of seven things asking for it.`,
            },
            {
                label: 'If you spot one',
                body: `Tab-switching is not a defect in your product, so do not try to fix the switching. The signal worth having is the task they started and left. Replay Vision trims idle time out of each recording and a tab switch is idle time, so the hop never appears on camera. The abandoned task does. Run a Monitor scanner for it, save those users as a cohort, and give them a reason to come back with an in-app nudge or an email.`,
            },
        ],
    },
    {
        slug: 'mid-form-fleer',
        route: '/field-guide/the-mid-form-fleer',
        name: 'The Mid-Form Fleer',
        latin: 'Abandonus formularis',
        heroImage: '/images/field-guide/mid-form-fleer.png',
        plateI: img('mid-form-fleer', 1),
        plateII: img('mid-form-fleer', 2),
        map: { top: 58, left: 49 },
        sections: [
            {
                label: 'Appearance',
                body: `Caught mid-flight, always. Wings spread, body angled away from the screen. Has typically completed 60–70% of a form before the decision to leave.`,
            },
            {
                label: 'Habitat',
                body: `Signup flows. Checkout forms. Anywhere a credit-card field appears later than expected. The Mid-Form Fleer has a marked preference for the second-to-last field of any multi-step form.`,
            },
            {
                label: 'Field notes',
                body: `The Mid-Form Fleer arrives in good faith. It completes name, email, and company. Then it encounters something it did not expect: a "How did you hear about us?" dropdown with no fitting option, a phone-number field marked required, a CAPTCHA. And, it's gone.`,
            },
            {
                label: 'Resolution',
                body: `Almost never returns to complete the original form. Occasionally returns to a different form on the same product, days later, as if the original encounter never happened. You probably won't even recognize it if it does.`,
            },
            {
                label: 'Hazards observed',
                body: `Required fields are perceived as intrusive. Unexpected friction at the conversion moment. A field-validation error that resets all prior entries. The discovery, mid-form, that a credit card will be required.`,
            },
            {
                label: 'If you spot one',
                body: `Form abandonment comes down to one field far more often than to the length of the form, and it tends to be the field nobody on the team wanted to add: a required phone number, a CAPTCHA, or a dropdown with no option that fits. Fill in your own signup and notice where you would hesitate. A Classifier scanner asked which field the user was on when they quit tags each abandoned session with the culprit, and sorting those tags by frequency ranks your worst offenders.`,
            },
        ],
    },
    {
        slug: 'pricing-page-loiterer',
        route: '/field-guide/the-pricing-page-loiterer',
        name: 'The Pricing-Page Loiterer',
        latin: 'Pricingus revisitus',
        heroImage: '/images/field-guide/pricing-page-loiterer.png',
        plateI: img('pricing-page-loiterer', 1),
        plateII: img('pricing-page-loiterer', 2),
        map: { top: 34, left: 72 },
        sections: [
            {
                label: 'Appearance',
                body: `A low, settled posture, belly to the ground. Often spotted from behind, head slightly tilted, scrolling slowly between plan tiers. Eyes fixed, looking for numbers. May have a calculator tab open in the periphery.`,
            },
            {
                label: 'Habitat',
                body: `Pricing page. Has been seen returning to the same pricing page across multiple devices and several months without ever signing up. Grazes the competitors' pricing pages in the same season.`,
            },
            {
                label: 'Field notes',
                body: `The Pricing-Page Loiterer is typically busy doing math. The math is not mathing, but it has not yet led to a strong "no" – only to "not yet." One Loiterer compared the pricing to three competitors in one session, left, and returned four days later to do it again.`,
            },
            {
                label: 'Resolution',
                body: `Either eventually converts, usually after a price change, a new tier, or a personal budget cycle, or it goes silent forever.`,
            },
            {
                label: 'Hazards observed',
                body: `Pricing that requires too much arithmetic. A feature comparison that does not answer the question they actually have. A "Contact us" button where they expected a price. A free tier whose limits are described in units the visitor does not understand.`,
            },
            {
                label: 'If you spot one',
                body: `Somebody who visits your pricing page four times without signing up did not get an answer to one specific question, and it is nearly always what this will cost at their size. Try working out your own bill from your pricing page in under a minute. A Classifier scanner asking which tier or feature the visitor kept returning to turns that into a cohort, and sales can open with the tier the Loiterer was stuck on instead of a cold check-in.`,
            },
        ],
    },
    {
        slug: 'tutorial-skipper',
        route: '/field-guide/the-tutorial-skipper',
        name: 'The Tutorial Skipper',
        latin: 'Skippus impatiens',
        heroImage: '/images/field-guide/tutorial-skipper.png',
        plateI: img('tutorial-skipper', 1),
        plateII: img('tutorial-skipper', 2),
        map: { top: 70, left: 84 },
        sections: [
            {
                label: 'Appearance',
                body: `Visible only briefly. If you blink too slowly you will not notice them, as the fins are moving too fast. Recognizable by the speed and decisiveness with which they dismiss any tutorial or tooltip placed in their path. Both eyes sit on the same side of the head, and both are trained on the Skip button.`,
            },
            {
                label: 'Habitat',
                body: `First-time onboarding flows. Welcome modals. Tooltip tours. The Tutorial Skipper has a particular affinity for any element labeled "Skip," "Maybe later," or the small X in the corner.`,
            },
            {
                label: 'Field notes',
                body: `The Tutorial Skipper has used many products and is confident this one will not be different. Thus, it believes it definitely does not need the tutorial. The naturalist has frequently seen the same Skipper return, eight minutes later, lost on the exact feature the tutorial was attempting to introduce.`,
            },
            {
                label: 'Resolution',
                body: `A handful of Skippers figure it out by clicking around. Most file a support ticket asking how to do the thing the tutorial would have explained.`,
            },
            {
                label: 'Hazards observed',
                body: `A tutorial that is too long. Tooltips that obscure the interface they're describing. A "Welcome" modal that is the only path into setup.`,
            },
            {
                label: 'If you spot one',
                body: `A high skip rate on onboarding tells you nothing by itself. What matters is whether the Skippers activate anyway, and plenty of them do. A Monitor scanner catches sessions that dismissed onboarding in under five seconds, so save them as a cohort and set it beside your activation numbers. If they activate, your onboarding is optional and you can cut it down. If they do not, you have found the people to win back and the feature to win them back with, since it is the one the tutorial was trying to show them.`,
            },
        ],
    },
]

// Catalogued in text but not yet illustrated. Placeholder plate boxes; "Specimen pending" on the map.
export const PENDING_SPECIES: Species[] = [
    {
        slug: 'modal-slammer',
        route: '/field-guide/the-modal-slammer',
        name: 'The Modal Slammer',
        latin: 'Closeus immediatus',
        heroImage: '/images/field-guide/modal-slammer.png',
        plateI: img('modal-slammer', 1),
        plateII: img('modal-slammer', 2),
        map: { top: 13, left: 33 },
        sections: [
            {
                label: 'Appearance',
                body: `The defining feature is reaction time. The Modal Slammer dismisses any modal in under 400 milliseconds, often before it has finished animating in.`,
            },
            {
                label: 'Habitat',
                body: `Anywhere your team has placed a modal in the user's path. Cookie banners. Feature announcements. Newsletter prompts especially.`,
            },
            {
                label: 'Field notes',
                body: `The Modal Slammer does not read the modal. Worse, it rarely even takes the modal into consideration. The naturalist has observed Slammers close, in succession, four overlays in a five-second window.`,
            },
            {
                label: 'Resolution',
                body: `The Slammer continues with their task, slightly more agitated. If the modal mattered, they would discover this later, often in a support ticket asking for the feature it had just announced.`,
            },
            {
                label: 'Hazards observed',
                body: `A modal placed at the worst moment in a flow. A re-onboarding message that fires on every login. A "We've updated our privacy policy" notice that distracts them from the task they wanted to complete.`,
            },
            {
                label: 'If you spot one',
                body: `A modal closed inside a second was never read, so the message is gone either way. The cost that lands is on the task it interrupted. Count the overlays a new user meets before their first real action in your product, because three is common. A Classifier scanner with freeform tags returns a ranked list of what people dismiss without reading. Read it as a list of things you made them close, and cut the one at the top.`,
            },
        ],
    },
    {
        slug: 'phantom-returner',
        route: '/field-guide/the-phantom-returner',
        name: 'The Phantom Returner',
        latin: 'Quartum revertus',
        heroImage: '/images/field-guide/phantom-returner.png',
        plateI: img('phantom-returner', 1),
        plateII: img('phantom-returner', 2),
        map: { top: 20, left: 61 },
        sections: [
            {
                label: 'Appearance',
                body: `Wing scales dulled and dusty from a long absence, expression carefully neutral. The Phantom Returner moves through your product like someone visiting a house they used to live in, recognizing the rooms but unsure where the furniture has been moved.`,
            },
            {
                label: 'Habitat',
                body: `Anywhere they used to be familiar, like settings pages renamed, navigation reorganized, features deprecated or relocated. The Returner gravitates toward whatever workflow they remembered most clearly, which is usually the one your team has changed most.`,
            },
            {
                label: 'Field notes',
                body: `The Phantom Returner has been away for ninety days or more and arrives confident the product looks the same as the morning they left. It does not. Within the first minute, they have encountered three features they cannot locate and one they cannot identify, prompting the small, dignified pause that is the species' signature.`,
            },
            {
                label: 'Resolution',
                body: `Some adapt and quietly resume their workflow, while others give up and assume the product has been ruined since they left. The most vocal minority will send long emails to support that begin with the words "I've been a customer since…"`,
            },
            {
                label: 'Hazards observed',
                body: `Major UI redesigns shipped without changelog visibility. Deprecated features removed without redirects. An empty state where their previous data used to be.`,
            },
            {
                label: 'If you spot one',
                body: `After ninety days away, the product moved and the user's memory did not. Settings got renamed, navigation got reorganized, and the feature they used most now lives somewhere else. Try finding your way around your own product using last year's menu names. A Summarizer scanner reading sessions from long-absent users writes down what each one came to do and where they got stuck, and a weekly digest to Slack gives you a standing list of what your dormant customers can no longer find.`,
            },
        ],
    },
    {
        slug: 'dead-end-wanderer',
        route: '/field-guide/the-dead-end-wanderer',
        name: 'The Dead-End Wanderer',
        latin: 'Quattuor-zero-quattuor vagus',
        heroImage: '/images/field-guide/dead-end-wanderer.png',
        plateI: img('dead-end-wanderer', 1),
        plateII: img('dead-end-wanderer', 2),
        map: { top: 54, left: 80 },
        sections: [
            {
                label: 'Appearance',
                body: `Slightly disoriented. Coat unremarkable, posture defeated. Often arrives at your 404 page via a Google result for a feature you deprecated two years ago.`,
            },
            {
                label: 'Habitat',
                body: `Broken links. Deprecated routes. Email campaigns pointing to staging URLs. Documentation pages that no longer exist but still rank.`,
            },
            {
                label: 'Field notes',
                body: `The Dead-End Wanderer was following a link in good faith. The link led here, and now the Wanderer does not know what to do. It reads the 404 page slowly, in case it contains useful information. It does not.`,
            },
            {
                label: 'Resolution',
                body: `Some return to the home page, while others try the search bar. Most get frustrated and close the tab. The naturalist has rarely detected a Dead-End Wanderer reaching its intended destination.`,
            },
            {
                label: 'Hazards observed',
                body: `Outdated marketing copy. Renamed feature URLs without redirects. Email links pointing to environments that no longer exist.`,
            },
            {
                label: 'If you spot one',
                body: `Your analytics can count 404s. What they cannot tell you is where the person meant to go, which is the only part you can act on. A good share of broken paths lead back to your own old emails and outdated docs, and those you control. Search your site and your campaigns for links to routes you deprecated. A Classifier scanner asking what the user was trying to reach tags each dead end with its intended destination, and the ranked tags are your most broken paths.`,
            },
        ],
    },
    {
        slug: 'console-opener',
        route: '/field-guide/the-console-opener',
        name: 'The Console-Opener',
        latin: 'Devtoolus curiosus',
        heroImage: '/images/field-guide/console-opener.png',
        plateI: img('console-opener', 1),
        plateII: img('console-opener', 2),
        map: { top: 50, left: 63 },
        sections: [
            {
                label: 'Appearance',
                body: `Indistinguishable from a normal user at first glance, until the moment the keyboard shortcut is pressed. From that point on the skin mottles and darkens, and the eyes acquire focus.`,
            },
            {
                label: 'Habitat',
                body: `Landing pages of B2B SaaS products. Comparison pages. Documentation that mentions architecture. The Console-Opener has also been observed, less commonly, on the marketing site of their own employer.`,
            },
            {
                label: 'Field notes',
                body: `The Console-Opener is rarely a casual visitor. The naturalist treats every one as a person of interest as it might be a potential buyer evaluating the product stack. However, it could also be a spy marketer from a competing company. Only the most committed minority go on to file thoughtful bug reports about console errors they noticed.`,
            },
            {
                label: 'Resolution',
                body: `Highly variable. Enthusiastic visitors could become power users, but spy marketers only screenshot your bundle and leave. A few file a polite issue noting that an API key is being leaked in a client-side request.`,
            },
            {
                label: 'Hazards observed',
                body: `Console errors visible to the public. API keys logged in client-side network requests. A 401 returning from an endpoint you forgot was live.`,
            },
            {
                label: 'If you spot one',
                body: `Someone opening devtools on a marketing page is either evaluating you seriously or has found something you would rather they had not. Open your own landing page console and read it the way a stranger would, watching for leaked keys and 401s from endpoints you forgot were live. Devtools sit outside the page, so the recording never shows them opening. The session's raw events still reach the model, exceptions included. Run a Monitor scanner for sessions that threw a visible error and kept probing instead of leaving.`,
            },
        ],
    },
]

export const ALL_SPECIES: Species[] = [...SPECIES, ...PENDING_SPECIES]

export const SPECIES_BY_SLUG: Record<string, Species> = Object.fromEntries(ALL_SPECIES.map((s) => [s.slug, s]))
