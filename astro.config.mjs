import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import dataLayer from './src/data-layer/integration'
import devApi from './src/lib/devApi'
import pageIsland from './src/islands/integration'
import mdx from './src/lib/mdx/integration.mjs'
import seoOutputs from './src/integrations/seoOutputs'

const root = path.dirname(fileURLToPath(import.meta.url))
const src = (...parts) => path.join(root, 'src', ...parts)

// Build-time code (the data layer, integrations) reads process.env, so load the .env files into it.
// Variables that are already set (Vercel, CI) win: loadEnvFile never overrides them.
const mode = process.env.NODE_ENV === 'production' || process.argv.includes('build') ? 'production' : 'development'
for (const file of [`.env.${mode}.local`, `.env.${mode}`]) {
    if (fs.existsSync(path.join(root, file))) process.loadEnvFile(path.join(root, file))
}

// The posthog/posthog clone that provides docs/published, docs/onboarding, and agent skill files.
export const POSTHOG_REPO_DIR = path.join(root, '.cache', 'posthog-main-repo')
const posthogDocs = path.join(POSTHOG_REPO_DIR, 'docs')

// Import roots. tsconfig `baseUrl: ./src` mirrors these for types.
const alias = {
    '~': src(),
    // Query results written by the data layer (see src/data-layer/queries).
    '@data': path.join(root, '.cache', 'data-layer', 'queries'),
    lib: src('lib'),
    types: src('types'),
    images: src('images'),
    components: src('components'),
    constants: src('constants'),
    logic: src('logic'),
    hooks: src('hooks'),
    docs: posthogDocs,
    onboarding: path.join(posthogDocs, 'onboarding'),
    'scenes/onboarding/shared/OnboardingDocsContentWrapper': src('components', 'Docs', 'OnboardingContentWrapper.tsx'),
}

// Bundled into the server build instead of loaded from node_modules. These CommonJS packages export
// `default` through `exports.__esModule`, and Node hands a default import the whole exports object
// (webpack and Vite's bundler unwrap it). The prismjs language files need the `Prism` global that
// CodeBlock defines before importing them. scripts/astro-migration/check-cjs-defaults.mjs lists them.
const SSR_BUNDLED = [
    'prism-react-renderer',
    'prismjs',
    'rc-slider',
    // rc-slider's ES build imports rc-util without file extensions, which Node cannot resolve.
    'rc-util',
    'react-country-flag',
    'react-medium-image-zoom',
    'react-tsparticles',
]

export default defineConfig({
    site: 'https://posthog.com',
    trailingSlash: 'never',
    publicDir: './static',
    // Pages prerendered in parallel (Astro's default is 1). 4 cut prerender time by about a minute;
    // 8 and 16 were no faster and used more memory. See ASTRO_MIGRATION.md, step 35.
    build: { format: 'directory', concurrency: 4 },
    prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
    devToolbar: { enabled: false },
    integrations: [
        dataLayer(),
        mdx({
            roots: [path.join(root, 'contents'), POSTHOG_REPO_DIR],
            bareImportRoots: [posthogDocs, path.join(root, 'contents', 'docs')],
            aliases: Object.keys(alias),
        }),
        react(),
        pageIsland(),
        devApi(),
        seoOutputs(),
    ],
    vite: {
        resolve: { alias },
        // `ssr` is the dev server's environment; `prerender` builds the static pages.
        ssr: { noExternal: SSR_BUNDLED },
        environments: { prerender: { resolve: { noExternal: SSR_BUNDLED } } },
    },
})
