export const componentCategories = [
    'Foundations',
    'Actions',
    'Inputs',
    'Overlays',
    'Navigation',
    'Disclosure',
    'Feedback',
    'Display',
] as const

export const designCategories = ['Text effects', 'Showcase'] as const

export const docCategories = [...componentCategories, ...designCategories] as const

export const docSections = [
    {
        name: 'Components',
        description: 'Accessible building blocks for forms, menus, overlays, and data.',
        categories: componentCategories,
    },
    {
        name: 'Design',
        description:
            'Visual pieces for front-facing pages: text accents, stickers, carousels, galleries, and motion. Use them to present information in a way that fits the PostHog brand.',
        categories: designCategories,
    },
] as const

export type DocCategory = (typeof docCategories)[number]

export type CatalogEntry = {
    slug: string
    name: string
    description: string
    category: DocCategory
}

export const catalog: CatalogEntry[] = [
    {
        slug: 'typography',
        name: 'Typography',
        description: 'The type roles, fonts, and rules for all text.',
        category: 'Foundations',
    },
    {
        slug: 'foundations',
        name: 'Fields and motion',
        description: 'How fields sit on see-through windows, and how components animate.',
        category: 'Foundations',
    },
    {
        slug: 'card',
        name: 'Card and section',
        description: 'Cards are the default container. Title and status bars, inset wells, and the rare section.',
        category: 'Foundations',
    },
    {
        slug: 'button',
        name: 'Button',
        description: 'Flat and raised buttons, icon buttons, and groups.',
        category: 'Actions',
    },
    {
        slug: 'floating-button',
        name: 'FloatingButton',
        description: 'A liquid glass button that floats over images, video, and content.',
        category: 'Actions',
    },
    { slug: 'button-link', name: 'ButtonLink', description: 'A link that looks like a button.', category: 'Actions' },
    {
        slug: 'toggle',
        name: 'Toggle',
        description: 'Buttons that stay pressed, alone or in a group.',
        category: 'Actions',
    },
    {
        slug: 'toolbar',
        name: 'Toolbar',
        description: 'A row of controls with arrow-key navigation.',
        category: 'Actions',
    },
    {
        slug: 'field',
        name: 'Field and Input',
        description: 'Labels, descriptions, and validation for inputs.',
        category: 'Inputs',
    },
    {
        slug: 'textarea',
        name: 'Textarea',
        description: 'A multi-line text input that can grow with its content.',
        category: 'Inputs',
    },
    {
        slug: 'form',
        name: 'Form and Fieldset',
        description: 'Group fields, validate them, and submit their values.',
        category: 'Inputs',
    },
    {
        slug: 'checkbox',
        name: 'Checkbox',
        description: 'Checked, unchecked, and indeterminate, alone or in a group.',
        category: 'Inputs',
    },
    { slug: 'radio', name: 'Radio', description: 'One choice from a set.', category: 'Inputs' },
    { slug: 'switch', name: 'Switch', description: 'An on/off control for settings.', category: 'Inputs' },
    { slug: 'slider', name: 'Slider', description: 'Pick a value or a range by dragging.', category: 'Inputs' },
    { slug: 'select', name: 'Select', description: 'Pick one option from a list.', category: 'Inputs' },
    {
        slug: 'combobox',
        name: 'Combobox',
        description: 'A select that filters as you type, with one or many values.',
        category: 'Inputs',
    },
    { slug: 'autocomplete', name: 'Autocomplete', description: 'Free text with suggestions.', category: 'Inputs' },
    {
        slug: 'number-field',
        name: 'NumberField',
        description: 'A number input with step arrows and a scrub area.',
        category: 'Inputs',
    },
    { slug: 'otp-field', name: 'OTPField', description: 'One box per character of a code.', category: 'Inputs' },
    { slug: 'dialog', name: 'Dialog', description: 'A modal window on window glass.', category: 'Overlays' },
    {
        slug: 'alert-dialog',
        name: 'AlertDialog',
        description: 'A dialog that needs an answer before it closes.',
        category: 'Overlays',
    },
    { slug: 'drawer', name: 'Drawer', description: 'A panel that slides in from an edge.', category: 'Overlays' },
    {
        slug: 'popover',
        name: 'Popover',
        description: 'Interactive content anchored to a trigger.',
        category: 'Overlays',
    },
    { slug: 'tooltip', name: 'Tooltip', description: 'Short hints on hover and focus.', category: 'Overlays' },
    {
        slug: 'preview-card',
        name: 'PreviewCard',
        description: 'A card that previews a link on hover.',
        category: 'Overlays',
    },
    {
        slug: 'menu',
        name: 'Menu',
        description: 'Actions, checkboxes, radios, and submenus in a dropdown.',
        category: 'Overlays',
    },
    {
        slug: 'context-menu',
        name: 'ContextMenu',
        description: 'A menu that opens on right-click or long press.',
        category: 'Overlays',
    },
    { slug: 'toast', name: 'Toast', description: 'Stacked notifications with actions.', category: 'Overlays' },
    { slug: 'menubar', name: 'Menubar', description: 'A row of menus, like an app menu bar.', category: 'Navigation' },
    {
        slug: 'navigation-menu',
        name: 'NavigationMenu',
        description: 'Site navigation with links and dropdown panels.',
        category: 'Navigation',
    },
    { slug: 'tabs', name: 'Tabs', description: 'Switch between panels of content.', category: 'Navigation' },
    {
        slug: 'accordion',
        name: 'Accordion',
        description: 'A set of sections that open and close.',
        category: 'Disclosure',
    },
    {
        slug: 'collapsible',
        name: 'Collapsible',
        description: 'One panel that opens and closes.',
        category: 'Disclosure',
    },
    { slug: 'avatar', name: 'Avatar', description: 'An image with a fallback, alone or stacked.', category: 'Display' },
    {
        slug: 'chip',
        name: 'Chip',
        description: 'A small label with an optional image, icon, or remove button.',
        category: 'Display',
    },
    {
        slug: 'chart',
        name: 'Charts',
        description: 'Line, bar, pie, and sparkline charts in the site colors.',
        category: 'Display',
    },
    {
        slug: 'progress',
        name: 'Progress and Meter',
        description: 'Show a task that runs, or a fixed amount.',
        category: 'Display',
    },
    { slug: 'separator', name: 'Separator', description: 'A horizontal or vertical line.', category: 'Display' },
    {
        slug: 'scroll-area',
        name: 'ScrollArea',
        description: 'A scroll container with custom scrollbars.',
        category: 'Display',
    },
    {
        slug: 'copy-button',
        name: 'CopyButton',
        description: 'A button that copies text and confirms it.',
        category: 'Actions',
    },
    {
        slug: 'choicebox',
        name: 'Choicebox',
        description: 'Large selectable cards for one or many choices.',
        category: 'Inputs',
    },
    {
        slug: 'search-input',
        name: 'SearchInput',
        description: 'A search field with an icon, a clear button, and a shortcut hint.',
        category: 'Inputs',
    },
    {
        slug: 'pagination',
        name: 'Pagination',
        description: 'Move between pages of results.',
        category: 'Navigation',
    },
    {
        slug: 'breadcrumbs',
        name: 'Breadcrumbs',
        description: 'Show where a page sits in the site.',
        category: 'Navigation',
    },
    {
        slug: 'note',
        name: 'Note',
        description: 'A callout for tips, warnings, and errors.',
        category: 'Feedback',
    },
    {
        slug: 'banner',
        name: 'Banner',
        description: 'A full-width notice at the top of a page or window.',
        category: 'Feedback',
    },
    {
        slug: 'spinner',
        name: 'Spinner',
        description: 'Shows that something loads.',
        category: 'Feedback',
    },
    {
        slug: 'skeleton',
        name: 'Skeleton',
        description: 'A placeholder in the shape of content that loads.',
        category: 'Feedback',
    },
    {
        slug: 'empty-state',
        name: 'EmptyState',
        description: 'What to show when a list or search has no results.',
        category: 'Feedback',
    },
    {
        slug: 'badge',
        name: 'Badge',
        description: 'A short label for a status, a plan, or a category.',
        category: 'Display',
    },
    {
        slug: 'kbd',
        name: 'Kbd',
        description: 'Keyboard keys and shortcuts.',
        category: 'Display',
    },
    {
        slug: 'snippet',
        name: 'Snippet',
        description: 'Code in a sentence, or a command with a copy button.',
        category: 'Display',
    },
    {
        slug: 'table',
        name: 'Table',
        description: 'Rows and columns of data.',
        category: 'Display',
    },
    {
        slug: 'relative-time',
        name: 'RelativeTime',
        description: 'A time like 3 days ago, with the exact date on hover.',
        category: 'Display',
    },
    {
        slug: 'split-button',
        name: 'SplitButton',
        description: 'A main action with a menu of related actions.',
        category: 'Actions',
    },
    {
        slug: 'code-block',
        name: 'CodeBlock',
        description: 'Highlighted code with a file name, a copy button, and language tabs.',
        category: 'Display',
    },
    {
        slug: 'video',
        name: 'Video',
        description: 'A product video with light and dark sources.',
        category: 'Display',
    },
    {
        slug: 'middle-truncate',
        name: 'MiddleTruncate',
        description: 'Long text that keeps its start and end visible.',
        category: 'Display',
    },
    {
        slug: 'rough-annotation',
        name: 'RoughAnnotation',
        description: 'Hand-drawn underlines, circles, boxes, and highlights that draw in.',
        category: 'Text effects',
    },
    {
        slug: 'emphasis',
        name: 'Emphasis',
        description: 'A tinted pill behind a key word in a heading.',
        category: 'Text effects',
    },
    {
        slug: 'gradient-text',
        name: 'GradientText',
        description: 'Text filled with a slow, moving brand gradient.',
        category: 'Text effects',
    },
    {
        slug: 'rolling-text',
        name: 'RollingText',
        description: 'A word that rolls through a list of options.',
        category: 'Text effects',
    },
    {
        slug: 'carousel',
        name: 'Carousel',
        description: 'Slides that scroll and snap, with arrows and dots.',
        category: 'Showcase',
    },
    {
        slug: 'gallery',
        name: 'Gallery',
        description: 'A grid of images that open in a lightbox.',
        category: 'Showcase',
    },
    {
        slug: 'marquee',
        name: 'Marquee',
        description: 'A row of logos or items that scrolls without end.',
        category: 'Showcase',
    },
    {
        slug: 'feature-tabs',
        name: 'FeatureTabs',
        description: 'Tabs that play through features with a progress bar.',
        category: 'Showcase',
    },
]

export const libraryRootUrl = '/components/ui'

export const docUrl = (slug: string): string => `${libraryRootUrl}/${slug}`

export function catalogEntry(slug: string): CatalogEntry {
    const entry = catalog.find((candidate) => candidate.slug === slug)
    if (!entry) {
        throw new Error(`No UI library catalog entry for "${slug}"`)
    }
    return entry
}

export const entriesIn = (category: DocCategory): CatalogEntry[] =>
    catalog.filter((entry) => entry.category === category)

export const filledCategories = (categories: readonly DocCategory[]): DocCategory[] =>
    categories.filter((category) => entriesIn(category).length > 0)

export const libraryNav = [
    { name: 'Overview', url: libraryRootUrl },
    ...filledCategories(docCategories).flatMap((category) => [
        { name: category },
        ...entriesIn(category).map((entry) => ({ name: entry.name, url: docUrl(entry.slug) })),
    ]),
]
