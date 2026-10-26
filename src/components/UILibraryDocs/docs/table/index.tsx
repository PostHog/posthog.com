import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Density from './Density'
import densitySource from '!!../../rawSourceLoader!./Density.tsx?raw'
import Interactive from './Interactive'
import interactiveSource from '!!../../rawSourceLoader!./Interactive.tsx?raw'
import Sortable from './Sortable'
import sortableSource from '!!../../rawSourceLoader!./Sortable.tsx?raw'
import StickyHeader from './StickyHeader'
import stickyHeaderSource from '!!../../rawSourceLoader!./StickyHeader.tsx?raw'
import Pricing from './Pricing'
import pricingSource from '!!../../rawSourceLoader!./Pricing.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'table',
    importPath: 'components/UI/Table',
    importNames: ['Table'],
    sourcePath: 'src/components/UI/Table',
    apiNote: 'Table is a site component. Its parts accept native table element props.',
    examples: [
        {
            id: 'basic',
            title: 'Basic table',
            description:
                'Use a caption and native header cells to describe the data. The default appearance is outlined.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'surfaces',
            title: 'Surfaces',
            description: 'Choose plain, outlined, or raised. Raised adds a translucent fill and a shadow.',
            Component: Surfaces,
            source: surfacesSource,
        },
        {
            id: 'density',
            title: 'Density and stripes',
            description: 'Compact rows use less vertical space. Stripes add a glass tint to alternate body rows.',
            Component: Density,
            source: densitySource,
        },
        {
            id: 'interactive',
            title: 'Interactive rows',
            description: 'Move the pointer over a row to see its tint. Put links or buttons in the cells for actions.',
            Component: Interactive,
            source: interactiveSource,
        },
        {
            id: 'sortable',
            title: 'Sortable headers',
            description: 'Click a header to sort. The caller keeps the sort state and orders the rows.',
            Component: Sortable,
            source: sortableSource,
        },
        {
            id: 'sticky-header',
            title: 'Sticky header',
            description: 'Set a maximum container height. The rows scroll below a header with a solid fill.',
            Component: StickyHeader,
            source: stickyHeaderSource,
        },
        {
            id: 'pricing',
            title: 'Numeric columns and footer',
            description: 'Align numbers at the end of each column. Cells use tabular numerals, so digits line up.',
            Component: Pricing,
            source: pricingSource,
        },
    ],
    notes: [
        'Root wraps a native table in a scroll container. The default appearance is outlined. Raised adds a translucent fill and a shadow.',
        'A sticky header has a solid fill in the color of the nearest color scheme. It does not use a blur, because a blur inside a glass window often does not show in Chrome.',
        'Root forwards its ref and native props to the table. Pass scroll styles and attributes through containerProps.',
        'Use Caption to name the table. Use scope="row" on row headers. Native colSpan and rowSpan are available.',
        'Sort shows two carets and sets aria-sort. Add onSort to make the header a button. The caller keeps the sort state and orders the data.',
        'On an end-aligned column, the carets go before the label. The label then lines up with the numbers below it.',
        'Interactive adds a hover tint. It does not make rows focusable or add click actions.',
        'A className on Row sets a row fill, for example a selected row. Stripes and the hover tint have no specificity, so the row fill wins.',
        'Cell padding, text size, borders, and vertical alignment use ! classes. They beat the global .prose and .article-content table rules. To change them, use ! too, for example className="!px-0".',
        'The caller supplies data, grouping, pagination, loading states, and number formats.',
        'This component does not replace OSTable yet.',
    ],
    props: [
        {
            component: 'Table.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'outlined'",
                    description:
                        'Sets the scroll container surface. Plain has no border or fill. Raised adds elevation.',
                },
                {
                    name: 'density',
                    type: "'compact' | 'default'",
                    defaultValue: "'default'",
                    description: 'Sets vertical cell padding.',
                },
                {
                    name: 'striped',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a tint to alternate body rows.',
                },
                {
                    name: 'interactive',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a tint on body row hover.',
                },
                {
                    name: 'stickyHeader',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Keeps the header at the top of the scroll container.',
                },
                {
                    name: 'containerProps',
                    type: 'HTMLAttributes<HTMLDivElement>',
                    description:
                        'Sets scroll container attributes, className, and style. Set its maximum height for vertical scroll.',
                },
            ],
        },
        {
            component: 'Table.Head',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'start'",
                    description: 'Sets text alignment.',
                },
                {
                    name: 'sort',
                    type: "'ascending' | 'descending' | 'none'",
                    description: 'Shows the sort carets and sets aria-sort. Omit it for a column that does not sort.',
                },
                {
                    name: 'onSort',
                    type: '() => void',
                    description: 'Makes the header label a button. Set the next sort state in this callback.',
                },
                {
                    name: 'scope',
                    type: 'string',
                    defaultValue: "'col'",
                    description: 'Identifies the cells that this header describes.',
                },
            ],
        },
        {
            component: 'Table.Cell',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'start'",
                    description: 'Sets text alignment.',
                },
            ],
        },
    ],
}
