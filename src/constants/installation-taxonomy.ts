import { getLogo } from './logos'

/** External docs link used by FastAPI + TanStack Start in wizard UI */
export const WIZARD_GITHUB_REPO_URL = 'https://github.com/PostHog/wizard'

/**
 * Single source of truth for install taxonomy (grouping, popularity, wizard coverage).
 * Used by Installation.tsx, docs wizard tab, and product Getting Started AI install block.
 */
export type InstallItem = {
    slug: string
    name: string
    librarySlug: string
    popular?: boolean
    /** Included in wizard “Frameworks and languages” lists */
    wizard?: boolean
    /** Sort order in wizard lists (matches legacy wizard.mdx ordering) */
    wizardOrder?: number
    /** Override display name in wizard contexts only */
    wizardLabel?: string
    /** `getLogo` key when it differs from librarySlug-based resolution */
    wizardLogoKey?: string
    /** Wizard lists the stack but install is not available yet */
    status?: 'wip'
    /** Full URL when not `/docs/libraries/{librarySlug}` */
    wizardDocsUrl?: string
}

export type InstallCategory = {
    id: string
    title: string
    splitPopular?: boolean
    items: InstallItem[]
}

export const TAXONOMY: InstallCategory[] = [
    {
        id: 'web',
        title: 'Web frameworks',
        splitPopular: true,
        items: [
            { slug: 'web', name: 'JavaScript (web)', librarySlug: 'js', popular: true },
            {
                slug: 'nextjs',
                name: 'Next.js',
                librarySlug: 'next-js',
                popular: true,
                wizard: true,
                wizardOrder: 8,
            },
            {
                slug: 'react',
                name: 'React',
                librarySlug: 'react',
                popular: true,
                wizard: true,
                wizardOrder: 12,
            },
            { slug: 'angular', name: 'Angular', librarySlug: 'angular', wizard: true, wizardOrder: 2 },
            { slug: 'astro', name: 'Astro', librarySlug: 'astro', wizard: true, wizardOrder: 3 },
            { slug: 'docusaurus', name: 'Docusaurus', librarySlug: 'docusaurus' },
            { slug: 'gatsby', name: 'Gatsby', librarySlug: 'gatsby' },
            {
                slug: 'nuxt',
                name: 'Nuxt.js',
                librarySlug: 'nuxt-js',
                wizard: true,
                wizardOrder: 9,
                wizardLabel: 'Nuxt',
            },
            {
                slug: 'react-router',
                name: 'React Router',
                librarySlug: 'react-router',
                wizard: true,
                wizardOrder: 15,
            },
            { slug: 'remix', name: 'Remix', librarySlug: 'remix' },
            {
                slug: 'svelte',
                name: 'Svelte / SvelteKit',
                librarySlug: 'svelte',
                wizard: true,
                wizardOrder: 16,
                wizardLabel: 'SvelteKit',
            },
            {
                slug: 'tanstack-start',
                name: 'TanStack Start',
                librarySlug: 'tanstack-start',
                wizard: true,
                wizardOrder: 18,
                wizardDocsUrl: WIZARD_GITHUB_REPO_URL,
                wizardLogoKey: 'tanstack',
            },
            {
                slug: 'vue',
                name: 'Vue.js',
                librarySlug: 'vue-js',
                wizard: true,
                wizardOrder: 19,
                wizardLabel: 'Vue',
            },
        ],
    },
    {
        id: 'mobile',
        title: 'Mobile',
        items: [
            {
                slug: 'android',
                name: 'Android (Kotlin)',
                librarySlug: 'android',
                popular: true,
                wizard: true,
                wizardOrder: 1,
            },
            {
                slug: 'ios',
                name: 'iOS (Swift)',
                librarySlug: 'ios',
                wizard: true,
                wizardOrder: 17,
                wizardLabel: 'Swift (iOS/macOS)',
            },
            {
                slug: 'react-native',
                name: 'React Native',
                librarySlug: 'react-native',
                popular: true,
                wizard: true,
                wizardOrder: 11,
                wizardLogoKey: 'reactNative',
            },
            {
                slug: 'flutter',
                name: 'Flutter',
                librarySlug: 'flutter',
                wizard: true,
                wizardOrder: 21,
                status: 'wip',
            },
            {
                slug: 'kmp',
                name: 'Kotlin Multiplatform',
                librarySlug: 'kmp',
                wizard: true,
                wizardOrder: 25,
            },
        ],
    },
    {
        id: 'backend-languages',
        title: 'Backend languages',
        splitPopular: true,
        items: [
            { slug: 'nodejs', name: 'Node.js', librarySlug: 'node', popular: true },
            {
                slug: 'python',
                name: 'Python',
                librarySlug: 'python',
                popular: true,
                wizard: true,
                wizardOrder: 10,
            },
            {
                slug: 'ruby',
                name: 'Ruby',
                librarySlug: 'ruby',
                popular: true,
                wizard: true,
                wizardOrder: 13,
            },
            {
                slug: 'elixir',
                name: 'Elixir',
                librarySlug: 'elixir',
                wizard: true,
                wizardOrder: 20,
                status: 'wip',
            },
            {
                slug: 'go',
                name: 'Go',
                librarySlug: 'go',
                wizard: true,
                wizardOrder: 22,
                status: 'wip',
            },
            {
                slug: 'java',
                name: 'Java',
                librarySlug: 'java',
                wizard: true,
                wizardOrder: 23,
                status: 'wip',
            },
            { slug: 'php', name: 'PHP', librarySlug: 'php' },
            {
                slug: 'rust',
                name: 'Rust',
                librarySlug: 'rust',
                wizard: true,
                wizardOrder: 24,
                status: 'wip',
            },
        ],
    },
    {
        id: 'backend-frameworks',
        title: 'Backend frameworks',
        items: [
            {
                slug: 'django',
                name: 'Django',
                librarySlug: 'django',
                popular: true,
                wizard: true,
                wizardOrder: 4,
            },
            {
                slug: 'fastapi',
                name: 'FastAPI',
                librarySlug: 'python',
                popular: true,
                wizard: true,
                wizardOrder: 5,
                wizardDocsUrl: WIZARD_GITHUB_REPO_URL,
                wizardLogoKey: 'python',
            },
            {
                slug: 'rails',
                name: 'Ruby on Rails',
                librarySlug: 'ruby-on-rails',
                popular: true,
                wizard: true,
                wizardOrder: 14,
                wizardLogoKey: 'rails',
            },
            {
                slug: 'flask',
                name: 'Flask',
                librarySlug: 'flask',
                wizard: true,
                wizardOrder: 6,
            },
            {
                slug: 'laravel',
                name: 'Laravel',
                librarySlug: 'laravel',
                wizard: true,
                wizardOrder: 7,
            },
            { slug: 'phoenix', name: 'Phoenix', librarySlug: 'phoenix' },
        ],
    },
    {
        id: 'no-code',
        title: 'No-code, CMS & e-commerce',
        items: [
            { slug: 'shopify', name: 'Shopify', librarySlug: 'shopify', popular: true },
            { slug: 'webflow', name: 'Webflow', librarySlug: 'webflow', popular: true },
            { slug: 'wordpress', name: 'WordPress', librarySlug: 'wordpress', popular: true },
            { slug: 'bubble', name: 'Bubble', librarySlug: 'bubble' },
            { slug: 'framer', name: 'Framer', librarySlug: 'framer' },
            { slug: 'retool', name: 'Retool', librarySlug: 'retool' },
            { slug: 'woocommerce', name: 'WooCommerce', librarySlug: 'woocommerce' },
        ],
    },
    {
        id: 'data-tools',
        title: 'Data tools & integrations',
        items: [
            { slug: 'gtm', name: 'Google Tag Manager', librarySlug: 'google-tag-manager', popular: true },
            { slug: 'segment', name: 'Segment', librarySlug: 'segment', popular: true },
            { slug: 'slack', name: 'Slack', librarySlug: 'slack', popular: true },
            { slug: 'rudderstack', name: 'RudderStack', librarySlug: 'rudderstack' },
        ],
    },
]

/** Maps `/docs/libraries/{slug}` slugs to `LOGOS` keys when they differ */
const LIBRARY_SLUG_TO_LOGO_KEY: Record<string, string> = {
    'next-js': 'nextjs',
    'nuxt-js': 'nuxt',
    'vue-js': 'vue',
    'react-native': 'reactNative',
    'ruby-on-rails': 'rails',
    'react-router': 'reactRouter',
    'tanstack-start': 'tanstack',
}

export function resolveWizardLogoKey(item: InstallItem): string {
    if (item.wizardLogoKey) return item.wizardLogoKey
    return LIBRARY_SLUG_TO_LOGO_KEY[item.librarySlug] ?? item.librarySlug
}

export function resolveWizardDocsUrl(item: InstallItem): string {
    if (item.wizardDocsUrl) return item.wizardDocsUrl
    return `/docs/libraries/${item.librarySlug}`
}

export type WizardFrameworkRow = {
    slug: string
    label: string
    url: string
    image?: string
    badge?: string
    external: boolean
}

/**
 * Wizard “Frameworks and languages” rows for docs + product UI (sorted like legacy wizard.mdx).
 */
export function getWizardFrameworkRows(): WizardFrameworkRow[] {
    const items: InstallItem[] = []
    for (const cat of TAXONOMY) {
        for (const item of cat.items) {
            if (item.wizard) items.push(item)
        }
    }
    items.sort((a, b) => (a.wizardOrder ?? 0) - (b.wizardOrder ?? 0))

    return items.map((item) => {
        const url = resolveWizardDocsUrl(item)
        const logoKey = resolveWizardLogoKey(item)
        return {
            slug: item.slug,
            label: item.wizardLabel ?? item.name,
            url,
            image: getLogo(logoKey),
            badge: item.status === 'wip' ? 'Coming soon' : undefined,
            external: url.startsWith('http'),
        }
    })
}
