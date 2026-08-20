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
                body: `Distinguished by rapid, repetitive paw motion on a single point. Plumage darkens visibly toward the tail end of the encounter. Often accompanied by an audible exhale (inaudible to the scanner, but inferable from typing cadence).`,
            },
            {
                label: 'Habitat',
                body: `Payment forms, "Submit" buttons, modal dialogs that have already been dismissed once. Rarely found in onboarding flows; almost always near the moment of intended conversion.`,
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
                label: 'Conservation status',
                body: `Vulnerable. Without intervention, will not return.`,
            },
            {
                label: 'If you spot one',
                body: `Rage clicks are the textbook frustration signal, so score them. A Scorer scanner rating each session 0 to 10 for visible frustration, from rapid repeated clicks on one control to retries that go nowhere, turns "users seem annoyed" into a number you can sort by. Filter it to your checkout and payment sessions, put a threshold alert on the average score, and route it to whoever owns that flow; when the average climbs, something on the path to purchase has broken, and the reasoning behind the worst-scoring sessions will show you where.`,
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
                body: `Either the page eventually loads, validating the Pilgrim's worldview, or it does not, at which point the Pilgrim abandons silently and without complaint. Rarely files a support ticket. Believes it must have been their internet, which puts the internet provider in a worse position than you.`,
            },
            {
                label: 'Hazards observed',
                body: `A backend timeout your team has stopped noticing. An over-eager loading spinner that resolves visually before the data arrives.`,
            },
            {
                label: 'Conservation status',
                body: `Exhausted. Might abandon the page any time now.`,
            },
            {
                label: 'If you spot one',
                body: `Ask a Monitor scanner whether the user reloaded the same URL three or more times in quick succession. When the verdict is yes, open the reasoning; its citations drop you on the exact reload, nearly always a slow endpoint, a hung request, or a status page lagging behind reality. The Pilgrim will never complain, so the citation is the closest thing to a bug report you are going to get.`,
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
                body: `Power-user workflows. Multi-account setups. Anywhere comparison is required. The Tab-Hopper is also frequently observed in the wild on Slack, Linear, and three different documentation sites simultaneously.`,
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
                body: `No single failure to blame. The product worked. The user has the attention budget of a fruit fly on espresso, and your product is one of seven things asking for it.`,
            },
            {
                label: 'Conservation status',
                body: `Common. Possibly thriving. Hard to catch and measure.`,
            },
            {
                label: 'If you spot one',
                body: `The catch with the Tab-Hopper is that Replay Vision trims the idle stretches out of each recording before it looks, so the moment the user wanders off to another tab is the moment the video skips. You will not see the hop itself.

What you can see is what it leaves behind, a task started and never finished. Run a Monitor scanner for "arrived to do something and left it incomplete," then save the verdict-yes users as a cohort. Whether the same people come back to try again is a question you answer with that cohort, not the video.`,
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
                label: 'Conservation status',
                body: `Endangered, if you count signups or payments. Thriving, if you don't.`,
            },
            {
                label: 'If you spot one',
                body: `A verdict won't help here; you want the field name. A Classifier scanner asked "Which form field was the user on when they gave up?" tags each abandoned session with the exact culprit, so turn on freeform tags, since you cannot predict every field name in advance. Sort the tags by frequency and you have a ranked list of the fields breaking your funnel, worst offender first. Usually it is the one nobody wanted to add.`,
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
                body: `Distinctive perched posture. Often spotted from behind, head slightly tilted, scrolling slowly between plan tiers. Eyes fixed, looking for numbers. May have a calculator tab open in the periphery.`,
            },
            {
                label: 'Habitat',
                body: `Pricing page. Has been seen returning to the same pricing page across multiple devices and several months without ever signing up. Migrates between competitors' pricing pages in the same season.`,
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
                label: 'Conservation status',
                body: `Cautious. Easily startled by aggressive sales follow-up.`,
            },
            {
                label: 'If you spot one',
                body: `First narrow to sessions that touched /pricing, then run a Classifier scanner asking "Which plan, tier, or feature did this visitor keep returning to?" The tags tell you what your buyers are weighing. Save the users behind a given tag as a cohort and hand it to sales, and the follow-up arrives already knowing which tier the Loiterer was stuck on. That beats a cold "just checking in."`,
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
                body: `Visible only briefly. If you blink too slowly, you will not notice them, as their paws are moving too fast. Recognizable by the speed and decisiveness with which they dismiss any tutorial or tooltip placed in their path. Distinguishing feature: their eyes only detect a "Skip" button.`,
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
                label: 'Conservation status',
                body: `Common to abundant. Adapts faster than your onboarding does.`,
            },
            {
                label: 'If you spot one',
                body: `A Monitor scanner catches the moment the user dismisses onboarding in under five seconds without engaging a single step. Save the yes-users as a cohort and set it beside your activation numbers.

If the Skippers activate anyway, your onboarding is optional and you can safely shorten it. If they don't, you have found both the people to win back and the feature to do it with, since it is the one the tutorial was trying to show them.`,
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
                label: 'Conservation status',
                body: `Abundant. Reflexive. Cannot be reasoned with.`,
            },
            {
                label: 'If you spot one',
                body: `A Classifier scanner with freeform tags, asked "Which modal, popup, or overlay did this user dismiss without reading?", returns a ranked list of the interruptions your users bounce off. Read it as a list of things you made them close. The one at the top is the one to cut first.`,
            },
        ],
    },
    {
        slug: 'phantom-returner',
        route: '/field-guide/the-phantom-returner',
        name: 'The Phantom Returner',
        latin: 'Quartum revertus',
        map: { top: 20, left: 61 },
        sections: [
            {
                label: 'Appearance',
                body: `Plumage slightly dusty from a long absence, expression carefully neutral. The Phantom Returner moves through your product like someone visiting a house they used to live in, recognizing the rooms but unsure where the furniture has been moved.`,
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
                label: 'Conservation status',
                body: `Recurrent but unpredictable. Easily lost.`,
            },
            {
                label: 'If you spot one',
                body: `This one rewards a Summarizer scanner over a verdict or a tag. Filter to sessions from users returning after a long absence, and for each one it writes what they set out to do and where they got stuck, since intent and friction points are part of what a summary returns.

Schedule a weekday digest of those summaries to Slack. Every Monday you get a short brief on what your long-dormant customers came looking for and could no longer find.`,
            },
        ],
    },
    {
        slug: 'dead-end-wanderer',
        route: '/field-guide/the-dead-end-wanderer',
        name: 'The Dead-End Wanderer',
        latin: 'Quattuor-zero-quattuor vagus',
        map: { top: 54, left: 80 },
        sections: [
            {
                label: 'Appearance',
                body: `Slightly disoriented. Plumage normal, posture defeated. Often arrives at your 404 page via a Google result for a feature you deprecated two years ago.`,
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
                label: 'Conservation status',
                body: `Vulnerable. Mostly silent. Easily neglected.`,
            },
            {
                label: 'If you spot one',
                body: `You can count the 404s themselves in analytics; what that misses is where the Wanderer meant to go. A Classifier scanner asking "What was the user trying to reach when they landed on the 404?" tags each dead end with its intended destination. The ranked tags are your most-broken paths, and a surprising share trace back to your own old emails and outdated docs, which is the good news, since those you control.`,
            },
        ],
    },
    {
        slug: 'console-opener',
        route: '/field-guide/the-console-opener',
        name: 'The Console-Opener',
        latin: 'Devtoolus curiosus',
        map: { top: 50, left: 63 },
        sections: [
            {
                label: 'Appearance',
                body: `Indistinguishable from a normal user at first glance, until the moment the keyboard shortcut is pressed. From that point on, plumage darkens noticeably and the eyes acquire focus.`,
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
                label: 'Conservation status',
                body: `Rare but consequential.`,
            },
            {
                label: 'If you spot one',
                body: `Like the Tab-Hopper, this one hides from the recording. The developer tools live outside the page, so the video never shows them opening. The session's raw events reach the model too, though, exceptions included, so the errors the Console-Opener came to read are on the record even when the console is not.

Run a Monitor scanner for sessions that threw a visible error and then kept probing instead of leaving. A yes is usually one of two people. Either a technical evaluator taking you seriously, or a bug that reached the public before you did.`,
            },
        ],
    },
]

export const ALL_SPECIES: Species[] = [...SPECIES, ...PENDING_SPECIES]

export const SPECIES_BY_SLUG: Record<string, Species> = Object.fromEntries(ALL_SPECIES.map((s) => [s.slug, s]))
