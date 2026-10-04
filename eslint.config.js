// ESLint flat config: JavaScript and TypeScript recommended rules, Astro components, and the rules of
// hooks. Formatting is Prettier's job (eslint-config-prettier turns off the rules that overlap).
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import astro from 'eslint-plugin-astro'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    globalIgnores(['dist/', '.astro/', '.cache/', '.vercel/', '.claude/', 'node_modules/', 'static/', 'contents/']),
    js.configs.recommended,
    tseslint.configs.recommended,
    astro.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: { 'react-hooks': reactHooks },
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        rules: {
            // Warnings, not errors: the previous ESLint 7 config did not have these rules, and existing
            // code breaks them in many places (about 160 conditional hook calls). Fix them over time;
            // new code should not add more.
            'react-hooks/rules-of-hooks': 'warn',
            '@typescript-eslint/no-unused-expressions': 'warn',
            'no-useless-assignment': 'warn',
            'preserve-caught-error': 'warn',
            // TypeScript reports undefined names; the base rule does not understand types or JSX globals.
            'no-undef': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['**/*.cjs'],
        rules: { '@typescript-eslint/no-require-imports': 'off' },
    },
    prettier,
])
