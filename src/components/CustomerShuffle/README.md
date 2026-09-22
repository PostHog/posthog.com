# CustomerShuffle

A two-column board of customer logos. Each column has a heading, and the two headings together make a
category pair — "Colorful logos" against "Sleek logos". A shuffle button moves to a different pair and
animates every logo to its new column.

The homepage has used this pattern for a long time. This component is that board, with the company list
and the category pairs supplied as props, so more than one page can use it.

## Usage

```tsx
import CustomerShuffle from 'components/CustomerShuffle'

<CustomerShuffle
    companies={['supabase', 'elevenlabs', 'airbus']}
    breakdowns={{ colorful: { col1: 'Colorful logos', col2: '"Sleek" logos' } }}
    attributes={{ colorful: ['supabase'] }}
    showPicker
/>
```

## Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `companies` | `string[]` | required | Customer slugs on the board. Slugs come from `useCustomers`. |
| `breakdowns` | `Record<string, { col1, col2 }>` | required | The two column headings for each category pair. |
| `attributes` | `Record<string, string[]>` | required | Slugs that go in column 1 for each pair. Everything else goes in column 2. |
| `defaultBreakdown` | `string` | first usable pair | The pair to show first. |
| `showPicker` | `boolean` | `false` | Show a chip per pair, so a reader can choose one instead of only shuffling. |
| `className` | `string` | `''` | Applied to the wrapper. |

A customer with a case study gets a link and a red dot. Everything else is plain.

## Two rules for category pairs

**1. Neither column can insult a real customer.** The board names companies that pay us. Both headings
must be friendly. "AI-pilled" against "AI-curious" is fine. "AI-pilled" against "Not AI-pilled" is not.

**2. Column 2 is a default, not a claim.** A slug lands in column 2 only because it is absent from
`attributes`. Absent means "we did not check", not "no". So a pair only works when column 2 reads well
for a company nobody has checked yet.

A pair with fewer than three companies in column 1 is hidden. This stops a half-filled category from
looking broken, and it lets you add a pair before you have the data to fill it.

## Where the data lives

`src/hooks/useCustomers.tsx` holds the customers. The homepage keeps its own company list and pairs in
`src/components/Home/Customers.tsx`, which also exports them for `components/Korean/KoreanHomeShared`.
