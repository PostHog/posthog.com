# CustomerLogo

Renders one customer's logo. `customer.logo` comes in three shapes, and this component handles all
three so that no page has to:

| Shape | What renders |
| --- | --- |
| `undefined` | The customer's name as text |
| A React component | That component, with `className` |
| `{ light, dark }` | Two `<img>` tags, one hidden per color scheme |

## Usage

```tsx
import CustomerLogo from 'components/CustomerLogo'

<CustomerLogo customer={customer} />
<CustomerLogo customer={customer} className="h-6 w-auto object-contain fill-current" />
```

## Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `customer` | `Customer` | required | From `useCustomers`. |
| `className` | `string` | `h-8 w-auto max-w-[180px] object-contain fill-current` | Applied to the logo component or to both `<img>` tags. |

## Known duplication

`Pricing/Redesign/CustomerLogos.tsx`, `Products/Slides/CustomersSlide.tsx`, `Home/Test/Demos.tsx`,
`Korean/KoreanHomeShared`, and `pages/components/index.tsx` still have their own copy of this logic.
