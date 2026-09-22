import React from 'react'
import OSButton from 'components/OSButton'
import CustomerShuffle from 'components/CustomerShuffle'

export const COL1 = [
    'ycombinator',
    'airbus',
    'ukgovt',
    'nationaldesignstudio',
    'trust',
    'railway',
    'startengine',
    'researchgate',
    'heygen',
]

export const COL2 = [
    'supabase',
    'mistralai',
    'fireworksai',
    'elevenlabs',
    'exa',
    'convex',
    'hasura',
    'raycast',
    'clerk',
    'resend',
    'greptile',
    'wisprflow',
    'paper',
    'posthog',
]

export const companyBreakdowns = {
    colorful: { col1: 'Colorful logos', col2: '"Sleek" logos' },
    hardware: { col1: 'Hardware companies', col2: 'Not hardware companies' },
    planes: { col1: 'Builds planes', col2: "Doesn't build planes (yet)" },
    caseStudy: { col1: 'Companies with PostHog case studies', col2: 'Companies who should do case studies' },
    easyToYell: { col1: 'Names you can yell easily', col2: 'Names that require breath control' },
    goodBandName: { col1: 'Good band names', col2: 'Could be mistaken for pharmaceuticals' },
    explainable: {
        col1: 'Companies you can explain to your parents',
        col2: 'Companies your parents will never understand',
    },
    shortNames: { col1: 'Names with 7 letters or fewer', col2: 'Names you can easily mistype' },
    realWords: { col1: 'Real words', col2: 'Not real words' },
    american: { col1: 'Founded in America', col2: 'Not founded in America' },
    pokemon: { col1: 'Could be a Pokémon', col2: 'Could be a Bond Villain' },
    arr: { col1: 'Measured in ARR', col2: 'Measured in GDP' },
    devTool: { col1: 'Trendy devtool', col2: 'Trendy, but not a devtool' },
    usesPostHog: { col1: 'Uses PostHog', col2: 'Also uses PostHog' },
}

export const companyAttributes: Record<string, string[]> = {
    colorful: [
        'ycombinator',
        'convex',
        'trust',
        'supabase',
        'startengine',
        'mistralai',
        'fireworksai',
        'raycast',
        'heygen',
        'posthog',
    ],
    hardware: ['airbus', 'ukgovt', 'posthog'],
    planes: ['airbus', 'ukgovt'],
    caseStudy: ['ycombinator', 'elevenlabs', 'supabase', 'hasura', 'researchgate', 'exa', 'posthog'],
    easyToYell: [
        'airbus',
        'trust',
        'convex',
        'clerk',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'posthog',
        'wisprflow',
        'paper',
        'ukgovt',
        'railway',
        'fireworksai',
    ],
    goodBandName: [
        'elevenlabs',
        'railway',
        'convex',
        'trust',
        'startengine',
        'raycast',
        'resend',
        'clerk',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'paper',
        'posthog',
        'fireworksai',
    ],
    explainable: [
        'ycombinator',
        'airbus',
        'railway',
        'startengine',
        'researchgate',
        'exa',
        'nationaldesignstudio',
        'ukgovt',
        'wisprflow',
    ],
    shortNames: [
        'airbus',
        'trust',
        'railway',
        'convex',
        'clerk',
        'hasura',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'wisprflow',
        'ukgovt',
        'paper',
        'posthog',
    ],
    realWords: [
        'airbus',
        'convex',
        'trust',
        'railway',
        'clerk',
        'elevenlabs',
        'startengine',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'paper',
        'fireworksai',
    ],
    american: [
        'ycombinator',
        'convex',
        'trust',
        'supabase',
        'hasura',
        'clerk',
        'startengine',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'nationaldesignstudio',
        'wisprflow',
        'greptile',
        'paper',
        'posthog',
        'railway',
        'fireworksai',
    ],
    pokemon: ['convex', 'supabase', 'hasura', 'mistralai', 'raycast', 'resend', 'exa', 'heygen', 'paper', 'greptile'],
    arr: [
        'ycombinator',
        'airbus',
        'elevenlabs',
        'trust',
        'railway',
        'clerk',
        'convex',
        'supabase',
        'hasura',
        'startengine',
        'mistralai',
        'raycast',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'wisprflow',
        'greptile',
        'paper',
        'posthog',
        'fireworksai',
    ],
    devTool: [
        'ycombinator',
        'elevenlabs',
        'convex',
        'supabase',
        'hasura',
        'mistralai',
        'fireworksai',
        'raycast',
        'clerk',
        'resend',
        'exa',
        'greptile',
        'paper',
        'posthog',
        'railway',
    ],
    usesPostHog: ['ycombinator', 'airbus', 'trust', 'supabase', 'hasura', 'researchgate', 'heygen', 'posthog'],
}

export const Customers = ({ tableClassName = '' }: { tableClassName?: string }) => {
    return (
        <div id="customers">
            <h2>Social proof</h2>
            <p>Yes they actually use us, no it's not just some random engineer who tried us out 2+ years ago.</p>
            <CustomerShuffle
                companies={[...COL1, ...COL2]}
                breakdowns={companyBreakdowns}
                attributes={companyAttributes}
                defaultBreakdown="colorful"
                className={tableClassName}
            />
            <OSButton asLink to="/customers" variant="secondary" size="md" className="mt-4" state={{ newWindow: true }}>
                Open Customers
            </OSButton>
        </div>
    )
}

export default Customers
