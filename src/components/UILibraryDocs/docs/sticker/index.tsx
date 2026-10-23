import type { ComponentDoc } from '../../types'
import Inline from './Inline'
import inlineSource from '!!../../rawSourceLoader!./Inline.tsx?raw'
import Custom from './Custom'
import customSource from '!!../../rawSourceLoader!./Custom.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'sticker',
    importPath: 'components/UI/Sticker',
    importNames: ['Sticker'],
    sourcePath: 'src/components/UI/Sticker',
    apiNote: 'Sticker accepts span element props and forwards its ref.',
    examples: [
        {
            id: 'inline',
            title: 'Inline illustrations',
            description: 'Sizes follow the surrounding text. The baseline offset keeps the art beside the words.',
            Component: Inline,
            source: inlineSource,
            replay: true,
        },
        {
            id: 'custom',
            title: 'Emoji and icons',
            description: 'Custom content gets a white outline and a soft shadow.',
            Component: Custom,
            source: customSource,
            replay: true,
        },
    ],
    notes: [
        'Replaces: desktop and ReplayVision InlineIcon, MCPLeaderboard StickerHeading, and Code IconPop. Pass the illustration through sticker. Place the heading text beside Sticker.',
        'Import named art directly from components/Stickers/Stickers. Sticker does not import the 747 KB collection or the name-based wrapper. Production tree shaking can remove unused exports; check the page bundle before you assume a size reduction.',
        'Use children for an emoji, icon, or transparent image. The outline filter follows its visible shape. Existing sticker art already has an outline and shadow.',
        'The default sticker is decorative. Set label only when the art adds meaning that the surrounding text does not state.',
        'Pop-in uses a CSS view timeline. Browsers without this feature show the final art. Reduced motion removes the animation. The art stays visible during server rendering.',
        'Scroll motion follows the entry range and can reverse when you scroll back. It does not use an observer or remember the first entry.',
        'Use className to change dimensions or the baseline offset. Tilt changes the art without changing the text layout.',
    ],
    props: [
        {
            component: 'Sticker',
            rows: [
                {
                    name: 'sticker',
                    type: 'ComponentType<{ className?: string }>',
                    description: 'The illustration component. Takes priority over children.',
                },
                { name: 'children', type: 'ReactNode', description: 'An emoji, icon, or image.' },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the box to 1, 1.25, or 1.75 times the text size.',
                },
                { name: 'tilt', type: 'number', defaultValue: '0', description: 'Sets the rotation in degrees.' },
                {
                    name: 'popIn',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a scroll entrance where view timelines work.',
                },
                {
                    name: 'outline',
                    type: 'boolean',
                    defaultValue: '!sticker',
                    description: 'Adds the die-cut filter. Turn it off for art with an existing outline.',
                },
                {
                    name: 'label',
                    type: 'string',
                    description: 'Adds an accessible image name. Omit it for decorative art.',
                },
            ],
        },
    ],
}
