import type { ComponentDoc } from '../../types'
import Tones from './Tones'
import ContentOnly from './ContentOnly'
import contentOnlySource from '!!../../rawSourceLoader!./ContentOnly.tsx?raw'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import WithoutIcon from './WithoutIcon'
import withouticonSource from '!!../../rawSourceLoader!./WithoutIcon.tsx?raw'
import WithAction from './WithAction'
import withactionSource from '!!../../rawSourceLoader!./WithAction.tsx?raw'
import Legacy from './Legacy'
import legacySource from '!!../../rawSourceLoader!./Legacy.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'note',
    importPath: 'components/UI/Note',
    importNames: ['Note'],
    sourcePath: 'src/components/UI/Note',
    apiNote:
        'Note is a site component, not a Base UI component. Root, Title, Content, and Action accept div element props. Icon accepts span element props.',
    examples: [
        {
            id: 'tones',
            title: 'All tones',
            description: 'Each tone has a default icon.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'content-only',
            title: 'Without a title',
            description: 'Omit the title for a compact notice. The icon is optional.',
            Component: ContentOnly,
            source: contentOnlySource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Use small padding in compact content.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'withouticon',
            title: 'Without an icon',
            description: 'Omit Note.Icon to show only the title and content.',
            Component: WithoutIcon,
            source: withouticonSource,
        },
        {
            id: 'withaction',
            title: 'With an action',
            description: 'The action moves below the body in narrow containers.',
            Component: WithAction,
            source: withactionSource,
        },
        {
            id: 'legacy',
            title: 'Legacy type and custom icons',
            description:
                'type maps the old CalloutBox types to tones. Pass an icon as children to replace the default icon.',
            Component: Legacy,
            source: legacySource,
        },
    ],
    notes: [
        'Use Note for context in docs and handbook pages.',
        'CalloutBox types map as follows: action → warning, fyi → neutral, caution → error. An explicit tone takes priority.',
        'Put the legacy title in Note.Title. Put prose in Note.Content. Existing CalloutBox uses remain unchanged.',
        'Pass an icon element as the children of Note.Icon to replace the default icon. Omit Note.Icon to remove the icon.',
        'Note, Banner, and Toast share one tone icon map in toneIcons.ts. Neutral and info use IconInfo. Success uses IconCheckCircle. Warning and error use IconWarning. Brand uses IconSparkles.',
        'Icons are decorative. State the meaning in the title or body. Notes do not announce themselves as alerts.',
        'Place Icon, Title, Content, and Action directly inside Root. Fragments are supported. Use one of each part.',
        'The action sits beside the body at container widths of 448px or more. It moves below the body in narrower containers. Use a small button, so that it fits on the text line.',
        'Omit Title to remove the title strip. Content and the optional icon share one compact row.',
        'Small size uses 13px text and less padding. Medium size uses 14px text. Both sizes use a 20px line height.',
    ],
    props: [
        {
            component: 'Note.Root',
            rows: [
                {
                    name: 'tone',
                    type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'info'",
                    description: 'Sets the title strip tint, title color, and icon color.',
                },
                {
                    name: 'type',
                    type: "'action' | 'fyi' | 'caution'",
                    description: 'Maps a legacy CalloutBox type to a tone.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md'",
                    defaultValue: "'md'",
                    description: 'Sets the padding and text size.',
                },
                { name: 'children', type: 'ReactNode', description: 'The note parts.' },
            ],
        },
        {
            component: 'Note.Icon',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: 'Tone icon',
                    description: 'Replaces the default icon. Omit this part to remove the icon.',
                },
            ],
        },
        { component: 'Note.Title', rows: [{ name: 'children', type: 'ReactNode', description: 'The visible title.' }] },
        {
            component: 'Note.Content',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description:
                        'The prose content. The first and last child have no outer margin, so a list or a code block also fits.',
                },
            ],
        },
        {
            component: 'Note.Action',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'A Button or ButtonLink beside the body in wide containers.',
                },
            ],
        },
    ],
}
