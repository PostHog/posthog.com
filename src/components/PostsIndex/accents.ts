/**
 * Per-page accent palettes. Full literal class strings (not composed) so
 * Tailwind's scanner sees every class; only project color tokens.
 */
export type Accent = 'red' | 'blue' | 'purple'

export const accents: Record<
    Accent,
    {
        /** The active tag pill. */
        pillActive: string
        /** The "+N more" trigger when the active tag is hidden in the overflow. */
        pillOverflowActive: string
        /** The empty state's "Clear filters" link. */
        clearFilters: string
        /** The featured post's annotation text and arrow. */
        annotation: string
    }
> = {
    red: {
        pillActive: 'border-red bg-red text-white',
        pillOverflowActive: 'border-red text-red',
        clearFilters: 'text-red dark:text-yellow',
        annotation: 'text-red-2-dark',
    },
    blue: {
        pillActive: 'border-blue bg-blue text-white',
        pillOverflowActive: 'border-blue text-blue',
        clearFilters: 'text-blue dark:text-blue-2',
        annotation: 'text-blue dark:text-blue-2',
    },
    purple: {
        pillActive: 'border-purple bg-purple text-white',
        pillOverflowActive: 'border-purple text-purple',
        clearFilters: 'text-purple dark:text-light-purple',
        annotation: 'text-purple dark:text-light-purple',
    },
}
