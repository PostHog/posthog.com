// org members are private, can't pull this in the frontend without a gh token

export const ignoreContributors = new Set([
    'timgl',
    'mariusandra',
    'yakkomajuri',
    'macobo',
    'jamesefhawkins',
    'posthog-bot',
    'dependabot',
    'dependabot-preview[bot]',
    'paolodamico',
    'Twixes',
    'EDsCODE',
    'fuziontech',
    'dependabot[bot]',
    'posthog-contributions-bot[bot]',
])

export const mvpWinners: Record<string, number> = {
    samcaspus: 1,
    oshura3: 1,
}
