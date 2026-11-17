import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import ProseBoundary from './ProseBoundary'
import proseBoundarySource from '!!../../rawSourceLoader!./ProseBoundary.tsx?raw'
import Scale from './Scale'
import scaleSource from '!!../../rawSourceLoader!./Scale.tsx?raw'
import Headings from './Headings'
import headingsSource from '!!../../rawSourceLoader!./Headings.tsx?raw'
import TextStyles from './TextStyles'
import textStylesSource from '!!../../rawSourceLoader!./TextStyles.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'typography',
    imports: [{ path: 'constants', names: ['getProseClasses'] }],
    sourcePaths: ['src/constants/index.ts', 'src/styles/global.css', 'tailwind.config.js'],
    examples: [
        {
            id: 'prose',
            title: 'Prose and not-prose',
            description: (
                <>
                    Prose styles long-form content by element. ReaderView, Viewer, Editor, and Explorer wrap their
                    content in <Snippet.Inline>{'getProseClasses(size)'}</Snippet.Inline>, and the typography plugin
                    then styles every plain heading, paragraph, list, link, code, and table inside it. Everywhere else,
                    classes set the text. When you put UI inside prose, such as a card or a demo, wrap it in{' '}
                    <Snippet.Inline>{'not-prose'}</Snippet.Inline> and size its text with the classes in the next
                    section.
                </>
            ),
            Component: ProseBoundary,
            source: proseBoundarySource,
            prose: true,
        },
        {
            id: 'scale',
            title: 'UI text sizes',
            description: (
                <>
                    Choose the size from the job of the text, not from how large you want it. Each row names one job and
                    the components that use it. When a component sets the text, such as Card.Title or Field.Description,
                    use the component and do not add a size class. Each size sets its own line height, shown after the
                    size. Use only these sizes. The 11, 13, and 15 steps are project tokens that fill gaps in the
                    Tailwind scale, so write <Snippet.Inline>{'text-13'}</Snippet.Inline>, not{' '}
                    <Snippet.Inline>{'text-[13px]'}</Snippet.Inline>. Older code outside the UI library still uses the
                    arbitrary values. Use the tokens in new code.
                </>
            ),
            Component: Scale,
            source: scaleSource,
        },
        {
            id: 'headings',
            title: 'Headings outside prose',
            description: (
                <>
                    Outside prose, a heading has no size of its own. Tailwind's base styles give it the size of the text
                    around it, as the last row shows. Always give it a size class from the table above. Choose the level
                    from the page outline and the size from the job. On reader pages, global.css makes every h4 18px,
                    and a size class does not change it, so use h2 or h3 in UI.
                </>
            ),
            Component: Headings,
            source: headingsSource,
        },
        {
            id: 'text',
            title: 'Color and weight',
            description: 'Three colors and two weights cover all UI text. Body text uses the default weight.',
            Component: TextStyles,
            source: textStylesSource,
        },
    ],
    notes: [
        <>
            <Snippet.Inline>{'not-prose'}</Snippet.Inline> turns prose off for an element and for everything inside it.
            Prose cannot be turned on again inside it.
        </>,
        'Some styles still reach a not-prose block. global.css makes every heading bold and gives every p a bottom margin. Text inherits the line height of the prose around it, unless a class sets one. On prose pages, every h4 is 18px and every table keeps its prose borders.',
        <>
            Add a <Snippet.Inline>{'leading-*'}</Snippet.Inline> class only to a single-line control with a fixed
            height, such as a button or a menu item. Text that can wrap keeps the line height of its size.
        </>,
        <>
            RoundHog has no 600 face, so <Snippet.Inline>{'font-semibold'}</Snippet.Inline> and{' '}
            <Snippet.Inline>{'font-bold'}</Snippet.Inline> look the same today. Still use the weight that the table
            names, so the text is correct if the font gets a 600 face.
        </>,
        <>
            <Snippet.Inline>{'PROSE_CORE'}</Snippet.Inline> holds the shared prose modifiers: link style, line height,
            heading tracking, and the h1 size. The default size is <Snippet.Inline>{'prose-sm'}</Snippet.Inline>, and
            global.css sets its body text to 15px. Change these in one place, not in each page.
        </>,
        <>
            Use <Snippet.Inline>{'text-3xl'}</Snippet.Inline> and larger only on marketing pages. No component uses
            them.
        </>,
        <>
            Text uses the site font, RoundHog, from <Snippet.Inline>{'body'}</Snippet.Inline>. Do not set a font on UI
            text. Use <Snippet.Inline>{'font-code'}</Snippet.Inline> for code.
        </>,
        'Give each page one h1. Choose heading levels from the page outline and never skip a level. Write headings, labels, and buttons in sentence case.',
        <>
            Use <Snippet.Inline>{'tabular-nums'}</Snippet.Inline> for numbers in tables and counters.
        </>,
    ],
}
