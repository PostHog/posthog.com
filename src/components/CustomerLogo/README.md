# CustomerLogo

Renders one customer's logo from `useCustomers`: the SVG component, the light and dark `<img>` pair, or the name if
there is no logo.

## Usage

```tsx
import CustomerLogo from 'components/CustomerLogo'

<CustomerLogo customer={customer} />
<CustomerLogo customer={customer} className="h-6 max-w-40" />
```

## Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `customer` | `Customer` | required | From `useCustomers`. |
| `className` | `string` | `h-8 max-w-44` | Size classes. `w-auto object-contain fill-current` is always applied. |

## Known duplication

`Pricing/Redesign/CustomerLogos.tsx`, `Products/Slides/CustomersSlide.tsx`, `Home/Test/Demos.tsx`,
`Korean/KoreanHomeShared`, and `pages/components/index.tsx` still have their own copy of this logic.
